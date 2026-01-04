import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AdminFloatingButton from '@/components/shared/AdminFloatingButton'
import StyleLoader from '@/components/StyleLoader'
import StructuredData from '@/components/StructuredData'

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://joosungchurch.com'),
  title: {
    default: '주성성결교회 - Joosung Holiness Church',
    template: '%s | 주성성결교회'
  },
  description: '하나님의 사랑으로 함께하는 공동체 - 충북 청주시 흥덕구에 위치한 주성성결교회에 오신 것을 환영합니다',
  keywords: [
    '주성성결교회',
    '성결교회',
    '청주 교회',
    '흥덕구 교회',
    '봉명동 교회',
    '교회',
    '예배',
    '설교',
    '주일예배',
    '새벽예배',
    '교회 소식',
    '기독교',
    '복음',
    '신앙',
    '찬양'
  ],
  authors: [{ name: '주성성결교회' }],
  creator: '주성성결교회',
  publisher: '주성성결교회',
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
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://joosungchurch.com',
    siteName: '주성성결교회',
    title: '주성성결교회 - Joosung Holiness Church',
    description: '하나님의 사랑으로 함께하는 공동체 - 주성성결교회에 오신 것을 환영합니다',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '주성성결교회',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '주성성결교회 - Joosung Holiness Church',
    description: '하나님의 사랑으로 함께하는 공동체',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
    other: {
      'naver-site-verification': 'your-naver-verification-code',
    },
  },
  alternates: {
    canonical: 'https://joosungchurch.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={notoSansKr.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8B4513" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="font-sans antialiased">
        <StructuredData />
        <StyleLoader />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <AdminFloatingButton />
      </body>
    </html>
  )
}
