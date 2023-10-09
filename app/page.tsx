import { Button } from '@/components/ui/button';
import { UserButton, auth } from '@clerk/nextjs';
import Link from 'next/link';
import { ArrowRight, LogIn } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
// import { checkSubscription } from '@/lib/subscription';
// import SubscriptionButton from '@/components/SubscriptionButton';
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import previewImg from '@/public/preview.jpg';

export default async function Home() {
  const { userId } = auth();
  const isAuth = !!userId;
  // const isPro = await checkSubscription();
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }

  return (
    <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-400 to-yellow-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 lg:text-5xl md:text-4xl text-3xl font-semibold">
              Chat with any PDF
            </h1>
            <UserButton afterSignOutUrl="/" />
          </div>

          <div className="flex mt-2">
            {isAuth && firstChat && (
              <Link href={`/chat/${firstChat.id}`}>
                <Button>
                  Go to Chats <ArrowRight className="ml-2" />
                </Button>
              </Link>
            )}
          </div>

          <p className="max-w-xl mt-1 md:text-lg text-base text-slate-600">
            Join millions of students, researchers and professinals to instantly
            answer questions and understand research with AI
          </p>

          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <div>
                <Link href="/sign-in">
                  <Button>
                    Get Started!
                    <LogIn className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                  <div className="mt-8 flow-root">
                    <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                      <Image
                        src={previewImg}
                        alt="product preview"
                        width={1364}
                        height={866}
                        quality={100}
                        className="rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
