import { type Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { TanStackQueryProvider } from '@/global/providers';
import { PrefetcOrderItems, PrefetcProducts } from '@/services/prefetch';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Navbar } from '@/components/global/navbar/Navbar';
import { Toaster } from 'sonner';
import { Suspense } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'E-Commerce',
  description: 'Buy your favourite products',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // prefetch products
  const client = new QueryClient();
  await PrefetcProducts(client);
  await PrefetcOrderItems(client);

  return (
    <Suspense>
      <ClerkProvider>
        <html suppressHydrationWarning lang="en">
          <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <TanStackQueryProvider>
              <HydrationBoundary state={dehydrate(client)}>
                <header className="w-full flex justify-between">
                  <Navbar />
                </header>
                {children}
                <Toaster />
              </HydrationBoundary>
            </TanStackQueryProvider>
          </body>
        </html>
      </ClerkProvider>
    </Suspense>
  );
}
