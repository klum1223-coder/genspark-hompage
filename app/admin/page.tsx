'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface ChurchInfo {
  name: string
  englishName: string
  phone: string
  fax: string
  email: string
  address: string
  addressDetail: string
}

interface PastorInfo {
  name: string
  education: string[]
  message: string
}

interface WorshipTime {
  name: string
  time: string
  description: string
}

interface PopupData {
  enabled: boolean
  title: string
  content: string
  linkText: string
  linkUrl: string
}

interface HeroContent {
  title: string
  subtitle: string
  description: string
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('church-info')
  const [message, setMessage] = useState('')
  const [saveSuccess, setSaveSuccess] = useState(false)

  // 교회 기본 정보
  const [churchInfo, setChurchInfo] = useState<ChurchInfo>({
    name: '주성성결교회',
    englishName: 'Joosung Holiness Church',
    phone: '02-1234-5678',
    fax: '02-1234-5679',
    email: 'klum3@naver.com',
    address: '서울시 강남구 테헤란로 123',
    addressDetail: '주성빌딩 2층'
  })

  // 담임목사 정보
  const [pastorInfo, setPastorInfo] = useState<PastorInfo>({
    name: '김선우 목사',
    education: [
      '호서대학교 신학과 졸업 (B.A.)',
      '서울신학대학교 대학원 목회학 석사 (M.Div.)'
    ],
    message: '하나님의 말씀으로 세워지고, 사랑으로 하나 되며, 복음으로 세상을 섬기는 교회를 꿈꿉니다.'
  })

  // 예배 시간
  const [sundayWorship, setSundayWorship] = useState<WorshipTime[]>([
    { name: '1부 예배', time: '오전 09:00', description: '장년 예배' },
    { name: '2부 예배', time: '오전 11:00', description: '대예배' },
    { name: '찬양예배', time: '오후 14:00', description: '청년 찬양 예배' }
  ])

  const [weekdayWorship, setWeekdayWorship] = useState<WorshipTime[]>([
    { name: '수요 예배', time: '매주 수요일 오후 07:30', description: '말씀과 기도로 함께하는 시간' },
    { name: '새벽 기도회', time: '매일 새벽 오전 05:30', description: '하루를 주님께 드리는 시간' },
    { name: '금요 기도회', time: '매주 금요일 오후 07:30', description: '성령 충만의 시간' }
  ])

  // 팝업 배너
  const [popupData, setPopupData] = useState<PopupData>({
    enabled: true,
    title: '2024 신년 부흥회',
    content: '새해를 맞이하여 은혜로운 부흥회를 개최합니다.\n\n📅 일시: 2024년 1월 15일(월) ~ 17일(수)\n⏰ 시간: 매일 저녁 7시 30분\n📍 장소: 본 교회 대예배실',
    linkText: '자세히 보기',
    linkUrl: '/news'
  })

  // 히어로 섹션 (메인 배너)
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: '하나님의 사랑으로\n함께하는 공동체',
    subtitle: '예수 그리스도의 복음으로 세워진',
    description: '생명과 소망이 넘치는 교회'
  })

  const ADMIN_PASSWORD = 'joosung2025'

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadAllData()
    }
  }, [])

  const loadAllData = () => {
    // 교회 정보 로드
    const savedChurchInfo = localStorage.getItem('church_info')
    if (savedChurchInfo) {
      setChurchInfo(JSON.parse(savedChurchInfo))
    }

    // 담임목사 정보 로드
    const savedPastorInfo = localStorage.getItem('pastor_info')
    if (savedPastorInfo) {
      setPastorInfo(JSON.parse(savedPastorInfo))
    }

    // 예배 시간 로드
    const savedWorshipTimes = localStorage.getItem('worship_times')
    if (savedWorshipTimes) {
      const times = JSON.parse(savedWorshipTimes)
      if (times.sunday) setSundayWorship(times.sunday)
      if (times.weekday) setWeekdayWorship(times.weekday)
    }

    // 팝업 데이터 로드
    const savedPopup = localStorage.getItem('popup_data')
    if (savedPopup) {
      setPopupData(JSON.parse(savedPopup))
    }

    // 히어로 콘텐츠 로드
    const savedHero = localStorage.getItem('hero_content')
    if (savedHero) {
      setHeroContent(JSON.parse(savedHero))
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
      setMessage('로그인 성공!')
      loadAllData()
    } else {
      setMessage('비밀번호가 올바르지 않습니다.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
    setPassword('')
  }

  const showSaveMessage = () => {
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const saveChurchInfo = () => {
    localStorage.setItem('church_info', JSON.stringify(churchInfo))
    showSaveMessage()
  }

  const savePastorInfo = () => {
    localStorage.setItem('pastor_info', JSON.stringify(pastorInfo))
    showSaveMessage()
  }

  const saveWorshipTimes = () => {
    localStorage.setItem('worship_times', JSON.stringify({
      sunday: sundayWorship,
      weekday: weekdayWorship
    }))
    showSaveMessage()
  }

  const savePopupData = () => {
    localStorage.setItem('popup_data', JSON.stringify(popupData))
    showSaveMessage()
  }

  const saveHeroContent = () => {
    localStorage.setItem('hero_content', JSON.stringify(heroContent))
    showSaveMessage()
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
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">관리자 페이지</h1>
              {saveSuccess && (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full animate-fade-in">
                  ✓ 저장되었습니다!
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                target="_blank"
                className="text-sm text-gray-600 hover:text-primary"
              >
                🌐 사이트 보기
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'church-info', label: '🏛️ 교회 정보' },
              { id: 'pastor', label: '👨‍🏫 담임목사' },
              { id: 'worship', label: '⛪ 예배 시간' },
              { id: 'popup', label: '📢 팝업 배너' },
              { id: 'hero', label: '🎨 메인 배너' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 교회 기본 정보 */}
        {activeTab === 'church-info' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">교회 기본 정보</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    교회명 (한글)
                  </label>
                  <input
                    type="text"
                    value={churchInfo.name}
                    onChange={(e) => setChurchInfo({...churchInfo, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    교회명 (영문)
                  </label>
                  <input
                    type="text"
                    value={churchInfo.englishName}
                    onChange={(e) => setChurchInfo({...churchInfo, englishName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    대표 전화
                  </label>
                  <input
                    type="tel"
                    value={churchInfo.phone}
                    onChange={(e) => setChurchInfo({...churchInfo, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    팩스
                  </label>
                  <input
                    type="tel"
                    value={churchInfo.fax}
                    onChange={(e) => setChurchInfo({...churchInfo, fax: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이메일
                  </label>
                  <input
                    type="email"
                    value={churchInfo.email}
                    onChange={(e) => setChurchInfo({...churchInfo, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    주소
                  </label>
                  <input
                    type="text"
                    value={churchInfo.address}
                    onChange={(e) => setChurchInfo({...churchInfo, address: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    상세 주소
                  </label>
                  <input
                    type="text"
                    value={churchInfo.addressDetail}
                    onChange={(e) => setChurchInfo({...churchInfo, addressDetail: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={saveChurchInfo}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 담임목사 정보 */}
        {activeTab === 'pastor' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">담임목사 정보</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  담임목사 성함
                </label>
                <input
                  type="text"
                  value={pastorInfo.name}
                  onChange={(e) => setPastorInfo({...pastorInfo, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  학력 (줄바꿈으로 구분)
                </label>
                <textarea
                  value={pastorInfo.education.join('\n')}
                  onChange={(e) => setPastorInfo({
                    ...pastorInfo,
                    education: e.target.value.split('\n').filter(line => line.trim())
                  })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="예: 호서대학교 신학과 졸업 (B.A.)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  목회 철학 / 메시지
                </label>
                <textarea
                  value={pastorInfo.message}
                  onChange={(e) => setPastorInfo({...pastorInfo, message: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={savePastorInfo}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 예배 시간 */}
        {activeTab === 'worship' && (
          <div className="space-y-6">
            {/* 주일 예배 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">주일 예배</h2>
              
              <div className="space-y-4">
                {sundayWorship.map((worship, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="text"
                      value={worship.name}
                      onChange={(e) => {
                        const updated = [...sundayWorship]
                        updated[index].name = e.target.value
                        setSundayWorship(updated)
                      }}
                      placeholder="예배 이름"
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={worship.time}
                      onChange={(e) => {
                        const updated = [...sundayWorship]
                        updated[index].time = e.target.value
                        setSundayWorship(updated)
                      }}
                      placeholder="시간"
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={worship.description}
                      onChange={(e) => {
                        const updated = [...sundayWorship]
                        updated[index].description = e.target.value
                        setSundayWorship(updated)
                      }}
                      placeholder="설명"
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 주중 예배 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">주중 예배</h2>
              
              <div className="space-y-4">
                {weekdayWorship.map((worship, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="text"
                      value={worship.name}
                      onChange={(e) => {
                        const updated = [...weekdayWorship]
                        updated[index].name = e.target.value
                        setWeekdayWorship(updated)
                      }}
                      placeholder="예배 이름"
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={worship.time}
                      onChange={(e) => {
                        const updated = [...weekdayWorship]
                        updated[index].time = e.target.value
                        setWeekdayWorship(updated)
                      }}
                      placeholder="시간"
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={worship.description}
                      onChange={(e) => {
                        const updated = [...weekdayWorship]
                        updated[index].description = e.target.value
                        setWeekdayWorship(updated)
                      }}
                      placeholder="설명"
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={saveWorshipTimes}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 팝업 배너 */}
        {activeTab === 'popup' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">팝업 배너 관리</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="popup-enabled"
                  checked={popupData.enabled}
                  onChange={(e) => setPopupData({...popupData, enabled: e.target.checked})}
                  className="w-5 h-5 text-primary rounded"
                />
                <label htmlFor="popup-enabled" className="text-sm font-medium text-gray-700">
                  팝업 활성화 (체크하면 홈페이지 시작 시 팝업이 표시됩니다)
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  팝업 제목
                </label>
                <input
                  type="text"
                  value={popupData.title}
                  onChange={(e) => setPopupData({...popupData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="예: 2024 신년 부흥회"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  팝업 내용
                </label>
                <textarea
                  value={popupData.content}
                  onChange={(e) => setPopupData({...popupData, content: e.target.value})}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="팝업에 표시될 내용을 입력하세요"
                />
                <p className="mt-2 text-sm text-gray-500">💡 줄바꿈은 자동으로 적용됩니다</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    버튼 텍스트
                  </label>
                  <input
                    type="text"
                    value={popupData.linkText}
                    onChange={(e) => setPopupData({...popupData, linkText: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="예: 자세히 보기"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    버튼 링크 (선택사항)
                  </label>
                  <input
                    type="text"
                    value={popupData.linkUrl}
                    onChange={(e) => setPopupData({...popupData, linkUrl: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="/news 또는 https://..."
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={savePopupData}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
                >
                  저장
                </button>
              </div>

              {/* 미리보기 */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4">미리보기</h3>
                <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto">
                  <h2 className="text-2xl font-bold text-primary mb-4">{popupData.title}</h2>
                  <div className="text-gray-700 whitespace-pre-line mb-6">{popupData.content}</div>
                  {popupData.linkText && (
                    <button className="w-full bg-primary text-white py-2 rounded-lg">
                      {popupData.linkText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 메인 배너 (히어로 섹션) */}
        {activeTab === 'hero' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">메인 배너 (히어로 섹션)</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  메인 제목
                </label>
                <textarea
                  value={heroContent.title}
                  onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="예: 하나님의 사랑으로\n함께하는 공동체"
                />
                <p className="mt-2 text-sm text-gray-500">💡 줄바꿈(\n)을 입력하면 다음 줄로 이동합니다</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  부제목 (상단)
                </label>
                <input
                  type="text"
                  value={heroContent.subtitle}
                  onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="예: 예수 그리스도의 복음으로 세워진"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  설명 (하단)
                </label>
                <input
                  type="text"
                  value={heroContent.description}
                  onChange={(e) => setHeroContent({...heroContent, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="예: 생명과 소망이 넘치는 교회"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={saveHeroContent}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
                >
                  저장
                </button>
              </div>

              {/* 미리보기 */}
              <div className="mt-8 p-6 bg-gradient-to-br from-primary to-primary-light rounded-lg">
                <div className="text-center text-white">
                  <p className="text-lg mb-4">{heroContent.subtitle}</p>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 whitespace-pre-line">
                    {heroContent.title}
                  </h1>
                  <p className="text-xl">{heroContent.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 도움말 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-2">💡 사용 안내</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• 각 탭에서 정보를 수정하고 <strong>저장 버튼</strong>을 클릭하세요</li>
            <li>• 저장된 정보는 홈페이지에 <strong>즉시 반영</strong>됩니다</li>
            <li>• 팝업 배너는 체크박스로 활성화/비활성화할 수 있습니다</li>
            <li>• 브라우저를 새로고침하면 변경사항을 확인할 수 있습니다</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
