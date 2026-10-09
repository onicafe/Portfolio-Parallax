import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
  weight: ['100', '400', '700', '900']
});

export const metadata: Metadata = {
  title: 'Portfolio Parallax',
  description: 'Interactive scroll experience',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${archivo.variable} font-sans bg-black text-white antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
