import '../index.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'Ahmad Raza — Software Engineer',
  description: 'Portfolio of Ahmad Raza, a Software Engineer specializing in React, Next.js, Java, and AI/ML.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
