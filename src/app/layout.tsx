import { type Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { TanStackQueryProvider } from '@/global/providers';
import { PrefetcProducts } from '@/services/prefetch';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Navbar } from '@/components/global/navbar/Navbar';

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

  return (
    <ClerkProvider>
      <html suppressHydrationWarning lang="en">
        <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="w-full flex justify-between">
            <Navbar />
          </header>
          <TanStackQueryProvider>
            <HydrationBoundary state={dehydrate(client)}>{children}</HydrationBoundary>
          </TanStackQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
