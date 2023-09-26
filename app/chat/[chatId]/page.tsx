import ChatComponent from '@/components/ChatComponent';
import ChatSideBar from '@/components/ChatSideBar';
import PDFViewer from '@/components/PDFViewer';
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  params: {
    chatId: string;
  };
};

export default async function ChatPage({ params: { chatId } }: Props) {
  const { userId } = auth();
  if (!userId) {
    return redirect('/sign-in');
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect('/');
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect('/');
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  const isPro = await checkSubscription();

  return (
    <div className="flex h-screen">
      <div className="flex w-full h-full">
        {/* chat sidebar */}
        <div className="flex-[2] max-w-xs">
          <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
        </div>
        {/* pdf viewer */}
        <div className="max-h-screen p-4 oveflow-scroll flex-[4]">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ''} />
        </div>
        {/* chat component */}
        <div className="flex-[4] border-l-4 border-l-slate-200">
          <ChatComponent chatId={parseInt(chatId)} />
        </div>
      </div>
    </div>
  );
}
