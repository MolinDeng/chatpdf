import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Metadata } from 'next';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToAscii(inputString: string) {
  // remove non ascii characters
  const asciiString = inputString.replace(/[^\x00-\x7F]+/g, '');
  return asciiString;
}

export function constructMetadata({
  title = 'ChatPDF - the PDF AI for students',
  description = 'Talk to books, research papers, manuals, essays, legal contracts, whatever you have!',
  image = '/preview.png',
  icons = '/icon.png',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    // twitter: {
    //   card: 'summary_large_image',
    //   title,
    //   description,
    //   images: [image],
    //   creator: '@joshtriedcoding',
    // },
    icons,
    metadataBase: new URL('https://chatpdf-rosy.vercel.app/'),
    themeColor: '#FFF',
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    keywords: [
      'ChatPDF',
      'PDF',
      'AI',
      'students',
      'research',
      'books',
      'papers',
      'essays',
      'contracts',
      'manuals',
    ],
  };
}
