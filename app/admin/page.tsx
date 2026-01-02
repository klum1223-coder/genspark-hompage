'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('info')
  const [message, setMessage] = useState('')

  // 간단한 비밀번호 인증 (실제로는 서버 사이드 인증 필요)
  const ADMIN_PASSWORD = 'joosung2025'

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
      setMessage('로그인 성공!')
    } else {
      setMessage('비밀번호가 올바르지 않습니다.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
    setPassword('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-primary-light flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">관리자 페이지</h1>
            <p className="text-gray-600">주성성결교회</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="관리자 비밀번호를 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            
            {message && (
              <div className={`p-3 rounded-lg text-sm ${
                message.includes('성공') 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-red-50 text-red-700'
              }`}>
                {message}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-light transition-colors"
            >
              로그인
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-primary hover:underline">
              ← 홈페이지로 돌아가기
            </Link>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              💡 기본 비밀번호: <code className="bg-white px-2 py-1 rounded">joosung2025</code>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">관리자 페이지</h1>
              <p className="text-sm text-gray-600">주성성결교회</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="px-4 py-2 text-primary hover:bg-gray-100 rounded-lg transition-colors"
              >
                홈페이지 보기
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="container-custom">
          <div className="flex space-x-1">
            {[
              { id: 'info', label: '교회 정보' },
              { id: 'sermon', label: '설교 관리' },
              { id: 'news', label: '소식 관리' },
              { id: 'gallery', label: '사진 관리' },
              { id: 'settings', label: '설정' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-8">
        {activeTab === 'info' && <ChurchInfoTab />}
        {activeTab === 'sermon' && <SermonTab />}
        {activeTab === 'news' && <NewsTab />}
        {activeTab === 'gallery' && <GalleryTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>
    </div>
  )
}

// 교회 정보 탭
function ChurchInfoTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary mb-4">교회 기본 정보</h2>
        <div className="space-y-4">
          <InfoCard title="교회명" content="주성성결교회" />
          <InfoCard title="영문명" content="Joosung Holiness Church" />
          <InfoCard title="대표 전화" content="02-1234-5678" />
          <InfoCard title="이메일" content="info@joosungchurch.com" />
          <InfoCard title="주소" content="서울시 강남구 테헤란로 123" />
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-900">
            ℹ️ 교회 정보를 수정하려면 <code className="bg-white px-2 py-1 rounded">/lib/church-info.ts</code> 파일을 편집하세요.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary mb-4">소셜 미디어</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">유튜브</p>
              <a 
                href="https://www.youtube.com/@주성성결교회" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-red-600 hover:underline"
              >
                @주성성결교회
              </a>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">연동됨</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">네이버 블로그</p>
              <a 
                href="https://blog.naver.com/joosung0416" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-600 hover:underline"
              >
                joosung0416
              </a>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">연동됨</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary mb-4">예배 시간</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-3">주일 예배</h3>
            <div className="space-y-2">
              <p className="text-sm">1부 예배: <span className="font-medium">오전 09:00</span></p>
              <p className="text-sm">2부 예배: <span className="font-medium">오전 11:00</span></p>
              <p className="text-sm">찬양예배: <span className="font-medium">오후 14:00</span></p>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-3">평일 예배</h3>
            <div className="space-y-2">
              <p className="text-sm">수요예배: <span className="font-medium">오후 07:30</span></p>
              <p className="text-sm">새벽기도: <span className="font-medium">오전 05:30</span></p>
              <p className="text-sm">금요기도: <span className="font-medium">오후 07:30</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 설교 관리 탭
function SermonTab() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary">설교 관리</h2>
        <a
          href="https://www.youtube.com/@주성성결교회"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          유튜브에서 관리
        </a>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-lg">20251228 주일예배</h3>
              <p className="text-sm text-gray-600 mt-1">2024년 12월 28일</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">주일 설교</span>
                <span className="text-xs text-gray-500">조회수: 3회</span>
              </div>
            </div>
            <a 
              href="https://www.youtube.com/@주성성결교회"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 text-sm text-red-600 hover:underline"
            >
              보기
            </a>
          </div>
        </div>
        
        <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-lg">20251221 주일예배</h3>
              <p className="text-sm text-gray-600 mt-1">2024년 12월 21일</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">주일 설교</span>
                <span className="text-xs text-gray-500">조회수: 3회</span>
              </div>
            </div>
            <a 
              href="https://www.youtube.com/@주성성결교회"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 text-sm text-red-600 hover:underline"
            >
              보기
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <p className="text-sm text-yellow-900">
          💡 설교 영상은 유튜브 채널에서 직접 관리됩니다. 업로드한 영상이 자동으로 홈페이지에 표시됩니다.
        </p>
      </div>
    </div>
  )
}

// 소식 관리 탭
function NewsTab() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary">교회 소식 관리</h2>
        <a
          href="https://blog.naver.com/joosung0416"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          블로그에서 관리
        </a>
      </div>
      
      <div className="p-4 bg-green-50 rounded-lg">
        <p className="text-sm text-green-900">
          💡 교회 소식은 네이버 블로그에서 작성하시면 자동으로 홈페이지에 연동됩니다.
        </p>
      </div>
    </div>
  )
}

// 사진 관리 탭
function GalleryTab() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-primary mb-6">사진 앨범 관리</h2>
      
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-900 mb-2">
          💡 사진 업로드 방법:
        </p>
        <ol className="text-sm text-blue-900 space-y-1 ml-4 list-decimal">
          <li>블로그나 유튜브에 사진/영상 업로드</li>
          <li>관리자에게 이메일로 사진 전송</li>
          <li>Google Drive 링크 공유</li>
        </ol>
      </div>
    </div>
  )
}

// 설정 탭
function SettingsTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary mb-4">파일 위치 안내</h2>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-sm font-medium text-gray-900">교회 기본 정보</p>
            <code className="text-xs text-gray-600">/lib/church-info.ts</code>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-sm font-medium text-gray-900">메인 페이지</p>
            <code className="text-xs text-gray-600">/app/page.tsx</code>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-sm font-medium text-gray-900">교회 소개</p>
            <code className="text-xs text-gray-600">/app/about/page.tsx</code>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-sm font-medium text-gray-900">팝업 내용</p>
            <code className="text-xs text-gray-600">/lib/popup-data.ts</code>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary mb-4">비밀번호 변경</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700 mb-2">현재 비밀번호: <code className="bg-white px-2 py-1 rounded">joosung2025</code></p>
          <p className="text-xs text-gray-600">
            비밀번호를 변경하려면 <code>/app/admin/page.tsx</code> 파일에서 <code>ADMIN_PASSWORD</code> 값을 수정하세요.
          </p>
        </div>
      </div>
    </div>
  )
}

// 정보 카드 컴포넌트
function InfoCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="p-4 border rounded-lg">
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className="font-medium text-gray-900">{content}</p>
    </div>
  )
}
