import './globals.css';
import { Montserrat } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ClerkProvider } from '@clerk/nextjs';
import Providers from '@/components/Providers';
import { cn, constructMetadata } from '@/lib/utils';

// const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body className={cn('antialiased grainy', montserrat.className)}>
            {children}
            <Toaster />
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
