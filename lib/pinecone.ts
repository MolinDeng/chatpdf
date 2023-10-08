import { downloadFromS3 } from '@/lib/aws-s3-server';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import {
  Document,
  RecursiveCharacterTextSplitter,
} from '@pinecone-database/doc-splitter';
import { Pinecone, PineconeRecord } from '@pinecone-database/pinecone';

import { getEmbeddings } from './openai';
import { convertToAscii } from '@/lib/utils';
import md5 from 'md5';

export const getPineconeClient = () => {
  return new Pinecone({
    environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
};

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function loadS3IntoPinecone(fileKey: string) {
  // 1. obtain the pdf -> downlaod and read from pdf
  // TODO can use S3Loader from langchain https://js.langchain.com/docs/modules/data_connection/document_loaders/integrations/web_loaders/s3
  const file_name = await downloadFromS3(fileKey);
  if (!file_name) {
    throw new Error('could not download from s3');
  }
  // loading pdf into memory
  try {
    const loader = new PDFLoader(file_name);
    const pages = (await loader.load()) as PDFPage[];

    // 2. split and segment each page into smaller documents
    const documents = await Promise.all(pages.map(prepareDocument));

    // 3. Creating embeddings and Vectorization for these smaller documents
    const vectors = await Promise.all(documents.flat().map(vectorization));

    // 4. upload to pinecone
    const client = getPineconeClient();
    const pineconeIndex = client.index(process.env.PINECONE_INDEX_NAME!);
    const namespace = pineconeIndex.namespace(convertToAscii(fileKey));

    // 5. inserting vectors into pinecone'
    await namespace.upsert(vectors);
  } catch (error) {
    console.log('error loading s3 into pinecone', error);
    throw error;
  }

  // return documents[0];
}

async function vectorization(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);
    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log('error embedding document', error);
    throw error;
  }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes));
};
// TODO To be investigated
async function prepareDocument(page: PDFPage) {
  let { pageContent, metadata } = page;
  // pageContent = pageContent.replace(/\n/g, '');
  // split the docs
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1024,
    chunkOverlap: 20,
    separators: ['\n', ' ', '.', ',', '!', '?', ';', ':'],
  });
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: pageContent, //truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
}
