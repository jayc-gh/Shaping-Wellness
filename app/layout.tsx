import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/navbar/navbar';
import FooterB from '@/components/footer/bottom-footer/footerB';
import ConditionalFooter from '@/components/footer/top-footer/conditionalFooter';

const figtree = Figtree({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Shaping Wellness Foundation',
  description: 'Shaping wellness foundation',
  icons: {
    icon: [{ url: '/logo.svg', type: 'image/svg+xml', sizes: 'any' }],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={figtree.className}>
      <body className={`antialiased flex flex-col h-screen text-[#2f2f2f]`}>
        <nav>
          <NavBar />
        </nav>
        <div className="flex flex-col flex-1 items-center">{children}</div>
        <footer className="flex flex-col bg-[linear-gradient(180deg,_#D9764E_0%,_#DD6D5C_100%)] py-[2.5rem] gap-[1.875rem] px-[1.5625rem] lg:py-0 lg:px-[6.75rem] lg:gap-0">
          <ConditionalFooter />
          <FooterB />
        </footer>
      </body>
    </html>
  );
}
