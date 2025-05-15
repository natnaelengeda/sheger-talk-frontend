import { Metadata } from "next";

export const meta: Metadata = {
  metadataBase: new URL('https://sheger.talk.et'),
  icons: {
    icon: 'logo.png',
  },
  // themeColor: "#0F4C81",
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
  creator: 'Sheger Talk',
  authors: [
    {
      name: 'Sheger Talk',
      url: 'https://natnaelengeda.tech'
    }
  ],
  publisher: "Sheger Talk",
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