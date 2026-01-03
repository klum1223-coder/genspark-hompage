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
  const [isEditing, setIsEditing] = useState(false)
  const [churchInfo, setChurchInfo] = useState({
    name: '주성성결교회',
    englishName: 'Joosung Holiness Church',
    phone: '02-1234-5678',
    email: 'info@joosungchurch.com',
    address: '서울시 강남구 테헤란로 123',
    tagline: '하나님의 사랑으로 함께하는 공동체',
  })
  const [saveMessage, setSaveMessage] = useState('')

  // 로컬스토리지에서 정보 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('church_info')
    if (saved) {
      setChurchInfo(JSON.parse(saved))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('church_info', JSON.stringify(churchInfo))
    setIsEditing(false)
    setSaveMessage('✅ 저장되었습니다!')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleCancel = () => {
    const saved = localStorage.getItem('church_info')
    if (saved) {
      setChurchInfo(JSON.parse(saved))
    }
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary">교회 기본 정보</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
            >
              수정하기
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                저장
              </button>
            </div>
          )}
        </div>

        {saveMessage && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
            {saveMessage}
          </div>
        )}

        <div className="space-y-4">
          <EditableField
            label="교회명"
            value={churchInfo.name}
            isEditing={isEditing}
            onChange={(value) => setChurchInfo({ ...churchInfo, name: value })}
          />
          <EditableField
            label="영문명"
            value={churchInfo.englishName}
            isEditing={isEditing}
            onChange={(value) => setChurchInfo({ ...churchInfo, englishName: value })}
          />
          <EditableField
            label="슬로건"
            value={churchInfo.tagline}
            isEditing={isEditing}
            onChange={(value) => setChurchInfo({ ...churchInfo, tagline: value })}
          />
          <EditableField
            label="대표 전화"
            value={churchInfo.phone}
            isEditing={isEditing}
            onChange={(value) => setChurchInfo({ ...churchInfo, phone: value })}
          />
          <EditableField
            label="이메일"
            value={churchInfo.email}
            isEditing={isEditing}
            onChange={(value) => setChurchInfo({ ...churchInfo, email: value })}
          />
          <EditableField
            label="주소"
            value={churchInfo.address}
            isEditing={isEditing}
            onChange={(value) => setChurchInfo({ ...churchInfo, address: value })}
          />
        </div>

        {!isEditing && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900">
              ℹ️ 수정한 정보는 브라우저에 저장됩니다. 실제 파일을 수정하려면{' '}
              <code className="bg-white px-2 py-1 rounded">/lib/church-info.ts</code> 파일을 편집하세요.
            </p>
          </div>
        )}
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

      <WorshipTimesSection />
    </div>
  )
}

// 예배 시간 섹션
function WorshipTimesSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [worshipTimes, setWorshipTimes] = useState({
    sunday: [
      { name: '1부 예배', time: '오전 09:00' },
      { name: '2부 예배', time: '오전 11:00' },
      { name: '찬양예배', time: '오후 14:00' },
    ],
    weekday: [
      { name: '수요예배', time: '오후 07:30' },
      { name: '새벽기도', time: '오전 05:30' },
      { name: '금요기도', time: '오후 07:30' },
    ],
  })
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('worship_times')
    if (saved) {
      setWorshipTimes(JSON.parse(saved))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('worship_times', JSON.stringify(worshipTimes))
    setIsEditing(false)
    setSaveMessage('✅ 저장되었습니다!')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleCancel = () => {
    const saved = localStorage.getItem('worship_times')
    if (saved) {
      setWorshipTimes(JSON.parse(saved))
    }
    setIsEditing(false)
  }

  const updateTime = (type: 'sunday' | 'weekday', index: number, field: 'name' | 'time', value: string) => {
    const newTimes = { ...worshipTimes }
    newTimes[type][index][field] = value
    setWorshipTimes(newTimes)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-primary">예배 시간</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
          >
            수정하기
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              저장
            </button>
          </div>
        )}
      </div>

      {saveMessage && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
          {saveMessage}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-bold text-lg mb-3">주일 예배</h3>
          <div className="space-y-3">
            {worshipTimes.sunday.map((item, index) => (
              <div key={index}>
                {isEditing ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateTime('sunday', index, 'name', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded text-sm"
                      placeholder="예배명"
                    />
                    <input
                      type="text"
                      value={item.time}
                      onChange={(e) => updateTime('sunday', index, 'time', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded text-sm"
                      placeholder="시간"
                    />
                  </div>
                ) : (
                  <p className="text-sm">
                    {item.name}: <span className="font-medium">{item.time}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-bold text-lg mb-3">평일 예배</h3>
          <div className="space-y-3">
            {worshipTimes.weekday.map((item, index) => (
              <div key={index}>
                {isEditing ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateTime('weekday', index, 'name', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded text-sm"
                      placeholder="예배명"
                    />
                    <input
                      type="text"
                      value={item.time}
                      onChange={(e) => updateTime('weekday', index, 'time', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded text-sm"
                      placeholder="시간"
                    />
                  </div>
                ) : (
                  <p className="text-sm">
                    {item.name}: <span className="font-medium">{item.time}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// 편집 가능한 필드 컴포넌트
function EditableField({
  label,
  value,
  isEditing,
  onChange,
}: {
  label: string
  value: string
  isEditing: boolean
  onChange: (value: string) => void
}) {
  return (
    <div className="p-4 border rounded-lg">
      <p className="text-sm text-gray-600 mb-2">{label}</p>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      ) : (
        <p className="font-medium text-gray-900">{value}</p>
      )}
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
