# 주성성결교회 홈페이지 - 수정된 파일 전체 코드

## 📋 목차
1. [프로젝트 구조](#프로젝트-구조)
2. [수정된 파일 목록](#수정된-파일-목록)
3. [전체 코드](#전체-코드)

---

## 프로젝트 구조

```
/home/user/webapp/
├── app/
│   ├── layout.tsx                    # ✅ 수정: AdminFloatingButton 추가
│   ├── page.tsx                      # 메인 페이지
│   ├── about/page.tsx                # ✅ 수정: 오시는 길 섹션 추가
│   ├── gallery/page.tsx              # ✅ 수정: 제목 "교회 사역"으로 변경
│   ├── sermon/page.tsx               # 설교 페이지 (실시간 예배 버튼 포함)
│   ├── live/page.tsx                 # 실시간 예배 페이지
│   ├── ministry/page.tsx             # 교회 사역 소개 페이지
│   ├── news/page.tsx                 # 교회 소식 페이지
│   ├── prayer/page.tsx               # 기도 요청 페이지
│   ├── register/page.tsx             # 온라인 등록 페이지
│   ├── contact/page.tsx              # 오시는 길 페이지
│   └── admin/page.tsx                # 관리자 페이지
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx                # ✅ 수정: 네비게이션 7개로 축소
│   │   └── Footer.tsx                # 푸터
│   └── shared/
│       ├── AdminFloatingButton.tsx   # ✅ 신규: 관리자 플로팅 버튼
│       ├── Hero.tsx                  # 히어로 섹션
│       └── PopupModal.tsx            # 팝업 모달
│
├── lib/
│   ├── church-info.ts                # 교회 정보
│   ├── youtube-api.ts                # YouTube API 연동
│   └── sanity/                       # Sanity CMS 설정
│
└── types/
    └── sanity.ts                     # Sanity 타입 정의
```

---

## 수정된 파일 목록

### ✅ 수정된 파일 (5개)
1. **`components/layout/Header.tsx`** - 네비게이션 메뉴 7개로 축소
2. **`components/shared/AdminFloatingButton.tsx`** - 관리자 플로팅 버튼 (신규)
3. **`app/layout.tsx`** - AdminFloatingButton 추가
4. **`app/about/page.tsx`** - 오시는 길 섹션 추가
5. **`app/gallery/page.tsx`** - 페이지 제목 변경

### 📄 주요 기능
- **네비게이션 간소화**: 10개 → 7개 탭
- **관리자 빠른 접속**: 플로팅 버튼 + 비밀번호 인증
- **오시는 길 통합**: 교회 소개 페이지에 포함
- **페이지 명칭 변경**: "활동 사진" → "교회 사역"

---

## 전체 코드

### 1. components/layout/Header.tsx
```tsx
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: '홈', href: '/' },
  { name: '교회 소개', href: '/about' },
  { name: '설교', href: '/sermon' },
  { name: '교회 사역', href: '/gallery' },
  { name: '교회 소식', href: '/news' },
  { name: '기도 요청', href: '/prayer' },
  { name: '온라인 등록', href: '/register' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 페이지 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 text-primary hover:text-primary-light transition-colors"
          >
            <div className="text-2xl">✝️</div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold">주성성결교회</div>
              <div className="text-xs text-gray-600">Joosung Holiness Church</div>
            </div>
            <div className="sm:hidden">
              <div className="text-lg font-bold">주성성결교회</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-beige hover:text-primary'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-beige focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="메뉴 열기"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-1 border-t border-gray-200">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-beige hover:text-primary'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </header>
  )
}
```

---

### 2. components/shared/AdminFloatingButton.tsx (신규)
```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminFloatingButton() {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const ADMIN_PASSWORD = 'joosung2025'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      router.push('/admin')
      setShowPasswordModal(false)
      setPassword('')
      setError('')
    } else {
      setError('비밀번호가 올바르지 않습니다.')
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setShowPasswordModal(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary hover:bg-primary-light text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="관리자 페이지"
        title="관리자 페이지"
      >
        <svg 
          className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
          />
        </svg>
      </button>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">관리자 인증</h3>
              <p className="text-gray-600">비밀번호를 입력하세요</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  placeholder="비밀번호"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                  </p>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false)
                    setPassword('')
                    setError('')
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium"
                >
                  로그인
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                관리자 권한이 필요합니다<br />
                문의: 02-1234-5678
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
```

---

### 3. app/layout.tsx
```tsx
import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AdminFloatingButton from '@/components/shared/AdminFloatingButton'

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
```

---

### 4. app/about/page.tsx
```tsx
export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-beige py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            교회 소개
          </h1>
          <p className="text-lg text-gray-600">
            하나님의 사랑으로 세워진 공동체를 소개합니다
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">비전과 사명</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-center mb-8">
                우리 교회는 예수 그리스도의 복음을 전하고,<br />
                하나님의 사랑을 실천하며, 지역사회를 섬기는<br />
                건강한 신앙 공동체를 추구합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🙏</div>
                <h3 className="text-xl font-bold text-primary mb-3">예배</h3>
                <p className="text-gray-600">
                  하나님을 경배하고<br />
                  말씀으로 양육받는<br />
                  예배 공동체
                </p>
              </div>

              <div className="text-center p-6">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-xl font-bold text-primary mb-3">교제</h3>
                <p className="text-gray-600">
                  서로 사랑하고<br />
                  함께 성장하는<br />
                  교제의 공동체
                </p>
              </div>

              <div className="text-center p-6">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-bold text-primary mb-3">선교</h3>
                <p className="text-gray-600">
                  복음을 전하고<br />
                  세상을 섬기는<br />
                  선교 공동체
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">교회 연혁</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            </div>

            <div className="space-y-8">
              {[
                { year: '2020', event: '교회 창립 및 초대 담임목사 부임' },
                { year: '2021', event: '신축 예배당 건축 시작' },
                { year: '2022', event: '새 예배당 입당 예배' },
                { year: '2023', event: '선교센터 개관 및 지역 봉사 시작' },
                { year: '2024', event: '창립 5주년 감사예배' },
              ].map((item) => (
                <div key={item.year} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    {item.year}
                  </div>
                  <div className="flex-1 pt-5">
                    <p className="text-lg text-gray-700">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pastor Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">담임목사 소개</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            </div>

            <div className="card p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-4xl">
                    👤
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    김은혜 목사
                  </h3>
                  <p className="text-gray-600 mb-4">담임목사 / Senior Pastor</p>
                  
                  <div className="space-y-2 text-gray-700">
                    <p>장로회신학대학교 신학과 졸업 (B.A.)</p>
                    <p>장로회신학대학원 목회학 석사 (M.Div.)</p>
                    <p>풀러신학교 선교학 박사 (D.Min.)</p>
                  </div>

                  <div className="mt-6 p-4 bg-beige rounded-md">
                    <p className="text-sm text-gray-700 italic">
                      &ldquo;하나님의 말씀으로 세워지고, 사랑으로 하나 되며,
                      <br />
                      복음으로 세상을 섬기는 교회를 꿈꿉니다.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beliefs Section */}
      <section className="section-padding bg-beige">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">우리의 믿음</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                '성경은 하나님의 영감으로 기록된 오류 없는 말씀입니다',
                '삼위일체 하나님을 믿습니다',
                '예수 그리스도의 대속의 죽음과 부활을 믿습니다',
                '성령의 내주하심과 사역을 믿습니다',
                '교회는 그리스도의 몸이며 성도의 공동체입니다',
                '예수 그리스도의 재림과 최후의 심판을 믿습니다',
              ].map((belief, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm">
                    ✓
                  </div>
                  <p className="text-gray-700">{belief}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">오시는 길</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">📍</div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">주소</h4>
                    <p className="text-gray-700">서울시 강남구 테헤란로 123</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">📞</div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">전화</h4>
                    <p className="text-gray-700">02-1234-5678</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">✉️</div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">이메일</h4>
                    <p className="text-gray-700">info@joosungchurch.com</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-primary mb-3">대중교통 이용</h4>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-semibold">🚇 지하철:</span> 2호선 역삼역 3번 출구 (도보 5분)</p>
                  <p><span className="font-semibold">🚌 버스:</span> 146, 241, 401, 4319</p>
                </div>
                <h4 className="font-bold text-primary mb-3 mt-6">주차 안내</h4>
                <p className="text-gray-700">교회 지하 주차장 이용 가능 (예배 시간 무료)</p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <p>지도는 실제 배포 시 Google Maps 또는 Kakao Map으로 연동됩니다</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
```

---

### 5. app/gallery/page.tsx (일부)
```tsx
// 페이지 제목 섹션만 표시
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            교회 사역
          </h1>
          <p className="text-lg md:text-xl text-gray-100 animate-fade-in-delay">
            함께한 소중한 순간들을 나눕니다
          </p>
        </div>
      </section>
```

---

## 📊 변경 통계

- **수정된 파일**: 5개
- **신규 파일**: 1개 (AdminFloatingButton.tsx)
- **삭제된 코드 라인**: ~15줄
- **추가된 코드 라인**: ~200줄
- **Git 커밋**: 2개
  - `cf6d4ca`: 네비게이션 메뉴 간소화 및 관리자 플로팅 버튼 추가
  - `5b24136`: 갤러리 페이지 metadata 에러 수정

---

## 🔑 주요 기능

### 1. 네비게이션 간소화
- 이전: 10개 탭
- 현재: 7개 탭
- 제거: "오시는 길", "실시간 예배", "교회 사역"
- 통합: "오시는 길" → 교회 소개 페이지

### 2. 관리자 플로팅 버튼
- 위치: 우측 하단 고정
- 기능: 비밀번호 인증 → 관리자 페이지 이동
- 비밀번호: `joosung2025`
- 애니메이션: 호버 시 회전 효과

### 3. 페이지 명칭 변경
- "활동 사진" → "교회 사역"

---

## 🚀 배포 방법

1. **Git 클론**
   ```bash
   git clone <repository-url>
   cd webapp
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **환경 변수 설정**
   ```bash
   cp .env.example .env.local
   # .env.local 파일 편집
   ```

4. **개발 서버 실행**
   ```bash
   npm run dev
   ```

5. **프로덕션 빌드**
   ```bash
   npm run build
   npm start
   ```

---

## 📞 문의

- **교회 전화**: 02-1234-5678
- **이메일**: info@joosungchurch.com
- **주소**: 서울시 강남구 테헤란로 123

---

**최종 업데이트**: 2026-01-02  
**버전**: 1.1.0  
**작성자**: GenSpark AI Assistant
