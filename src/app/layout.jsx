import '../index.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const siteUrl = 'https://ahmadraza-dev.netlify.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ahmad Raza — Full-Stack Software Engineer & AI Developer',
    template: '%s | Ahmad Raza'
  },
  description: 'Official portfolio of Ahmad Raza. Full-Stack Software Engineer & AI Developer specializing in Next.js, Node.js, Python, AWS Cloud, and Autonomous AI LLM Agents.',
  keywords: [
    'Ahmad Raza',
    'Ahmad Raza Software Engineer',
    'Ahmad Raza Portfolio',
    'Ahmad Raza Developer',
    'Ahmad Raza Lahore',
    'AhmadR-11',
    'Full Stack Engineer Pakistan',
    'AI Software Engineer',
    'Next.js Developer Portfolio'
  ],
  authors: [{ name: 'Ahmad Raza', url: 'https://github.com/AhmadR-11/' }],
  creator: 'Ahmad Raza',
  publisher: 'Ahmad Raza',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Ahmad Raza — Full-Stack Software Engineer & AI Developer',
    description: 'Official portfolio of Ahmad Raza. Full-Stack Engineer, AI Systems Developer, & Cloud Architect.',
    url: siteUrl,
    siteName: 'Ahmad Raza Portfolio',
    images: [
      {
        url: '/profile.png',
        width: 800,
        height: 800,
        alt: 'Ahmad Raza — Full-Stack Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmad Raza — Full-Stack Software Engineer',
    description: 'Official portfolio of Ahmad Raza. Crafting high-performance SaaS platforms, autonomous AI agents, and cloud automation.',
    images: ['/profile.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '-Ay7aNA17tyX3kznSULxv17vJVmN99ff40t7QXgyjQY',
  },
};

export default function RootLayout({ children }) {
  // JSON-LD Structured Data Schema for Google Knowledge Panel & Search
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ahmad Raza',
    url: siteUrl,
    image: `${siteUrl}/profile.png`,
    jobTitle: 'Full-Stack Software Engineer & AI Systems Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Software Engineering & AI Solutions',
    },
    sameAs: [
      'https://github.com/AhmadR-11/',
      'http://linkedin.com/in/ahmad-raza-53482b316/',
      'https://www.instagram.com/ahmzie_e/'
    ],
    knowsAbout: [
      'Full-Stack Web Development',
      'Next.js & React',
      'Node.js & Express',
      'Python & FastAPI',
      'Autonomous AI Agents & RAG',
      'AWS Cloud Infrastructure & DevOps',
      'PostgreSQL & MongoDB'
    ],
    description: 'Full-Stack Software Engineer specializing in scalable web applications, microservices, and AI integrations.',
  };

  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
