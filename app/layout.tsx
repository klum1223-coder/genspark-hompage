import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AdminFloatingButton from '@/components/shared/AdminFloatingButton'
import StyleLoader from '@/components/StyleLoader'

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '주성성결교회 - Joosung Holiness Church',
  description: '하나님의 사랑으로 함께하는 공동체 - 주성성결교회에 오신 것을 환영합니다',
  keywords: ['주성성결교회', '성결교회', '교회', '예배', '설교', '교회 소식', '주일예배'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={notoSansKr.variable}>
      <body className="font-sans antialiased">
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
