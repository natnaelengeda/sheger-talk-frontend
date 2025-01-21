import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // metadataBase: new URL('https://shegertalk.vercel.app/'),
  icons: {
    icon: 'logo.png',
  },
  title: "Sheger Talk",
  description: "Sheger Talk - Chat with your favourite stranger",
  applicationName: 'Next.js',
  keywords: [
    'Sheger Talk',
    'Chat',
    'Stranger',
    'Friend',
    'Search Online',
    'Talk Online',

  ],
  creator: 'Natnael Engeda',
  authors: [
    {
      name: 'Natnael Engeda',
      url: 'https://natnaelengeda.tech'
    }
  ],
  publisher: "Natnael Engeda",
  openGraph: {
    title: "Sheger Talk",
    description: "Sheger Talk - Chat with your favourite stranger",
    url: 'https://shegertalk.vercel.app/',
    siteName: "Sheger Talk",
    images: [
      {
        url: "/seo-image.jpg",
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  twitter: {
    card: "summary_large_image",
    title: "Sheger Talk",
    description: "Sheger Talk - Chat with your favourite stranger",
    site: "@ShegerTalk",
    images: ['/seo-image.jpg'],
    creator: "@natnaelengeda",
  },
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
    other: {
      me: ['nattynengeda@gmail.com', 'https://natnaelengeda.tech']
    }
  },
  appleWebApp: {
    title: "Sheger Talk",
    statusBarStyle: 'black-translucent',
    startupImage: [
      'logo.png'
    ]
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
