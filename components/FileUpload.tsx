'use client';
import React from 'react';
import axios from 'axios';
import { uploadToS3 } from '@/lib/aws-s3';
import { useMutation } from '@tanstack/react-query';
import { Inbox, Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

// https://github.com/aws/aws-sdk-js-v3/issues/4126

const FileUpload = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [uploading, setUploading] = React.useState(false);
  // Unlike queries, mutations are typically used to create/update/delete data or perform server side-effects.
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post('/api/create-chat', {
        file_key,
        file_name,
      });
      return response.data;
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        // bigger than 10mb!
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'File too large! File size should be less than 10MB',
          variant: 'destructive',
        });
        return;
      }
      try {
        setUploading(true);
        const data = await uploadToS3(file);
        if (!data?.file_key || !data.file_name) {
          toast({
            title: 'Uh oh! Something went wrong.',
            description: 'TODO', // TODO
            variant: 'destructive',
          });
          return;
        }

        mutate(data, {
          onSuccess: ({ chat_id }) => {
            toast({
              title: 'Success!',
              description: 'Chat created!',
            });
            router.push(`/chat/${chat_id}`);
          },
          onError: (err) => {
            toast({
              title: 'Uh oh! Something went wrong.',
              description: 'Error creating chat',
              variant: 'destructive',
            });
            console.error(err);
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col',
        })}
      >
        <input {...getInputProps()} />
        {uploading || isLoading ? (
          <>
            {/* loading state */}
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">
              Spilling Tea to GPT...
            </p>
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
