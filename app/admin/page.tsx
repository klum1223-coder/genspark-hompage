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
  career: string[]
  message: string
  photo?: string
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
  backgroundType: 'gradient' | 'image' | 'video'
  backgroundImage?: string
  backgroundVideo?: string
}

interface AboutContent {
  vision: string
  mission: string
  history: string[]
  beliefs: string[]
}

interface Ministry {
  id: string
  title: string
  icon: string
  description: string
  detailContent: string
  image?: string
}

interface MinistryGallery {
  id: string
  title: string
  category: string
  description: string
  image: string
  date: string
}

interface NewsItem {
  id: string
  title: string
  category: string
  date: string
  excerpt: string
  content: string
}

interface PrayerRequest {
  id: string
  category: string
  title: string
  content: string
  date: string
  isPublic: boolean
}

interface Sermon {
  id: string
  title: string
  pastor: string
  date: string
  verse: string
  youtubeUrl: string
  description: string
}

interface SiteStyles {
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  textColor: string
  fontSize: string
  sectionSpacing: string
  borderRadius: string
  customCSS: string
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
    phone: '010-8986-3965',
    fax: '043-231-3530',
    email: 'klum3@naver.com',
    address: '충북 청주시 흥덕구 봉명로219번길 24',
    addressDetail: '2층'
  })

  // 담임목사 정보
  const [pastorInfo, setPastorInfo] = useState<PastorInfo>({
    name: '김선우 목사',
    education: [
      '호서대학교 신학과 졸업 (B.A.)',
      '서울신학대학교 대학원 목회학 석사 (M.Div.)'
    ],
    career: [
      '희망도서관 청주지부장',
      '글쓰기 운동본부 충북지역장'
    ],
    message: '하나님의 말씀으로 세워지고, 사랑으로 하나 되며, 복음으로 세상을 섬기는 교회를 꿈꿉니다.',
    photo: '/pastor-photo.jpg'
  })

  // 예배 시간
  const [sundayWorship, setSundayWorship] = useState<WorshipTime[]>([
    { name: '주일 예배', time: '오전 10:45', description: '주일 메인 예배' },
    { name: '성장이 있는 소모임', time: '오후 1:00', description: '소그룹 모임' }
  ])

  const [weekdayWorship, setWeekdayWorship] = useState<WorshipTime[]>([
    { name: '새벽 예배', time: '오전 06:30', description: '하루를 주님께 드리는 시간' }
  ])

  // 팝업 배너
  const [popupData, setPopupData] = useState<PopupData>({
    enabled: false,
    title: '환영합니다',
    content: '주성성결교회에 오신 것을 환영합니다.',
    linkText: '더 알아보기',
    linkUrl: '/about'
  })

  // 히어로 섹션 (메인 배너)
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: '하나님의 사랑으로\n함께하는 공동체',
    subtitle: '예수 그리스도의 복음으로 세워진',
    description: '생명과 소망이 넘치는 교회',
    backgroundType: 'gradient'
  })

  // 교회 소개 페이지 내용
  const [aboutContent, setAboutContent] = useState<AboutContent>({
    vision: '우리 교회는 예수 그리스도의 복음을 전하고,\n하나님의 사랑을 실천하며, 지역사회를 섬기는\n건강한 신앙 공동체를 추구합니다.',
    mission: '말씀 중심의 예배, 사랑의 교제, 세상을 향한 선교',
    history: [
      '2020년 교회 설립 및 첫 예배',
      '2021년 청년부 및 주일학교 개설',
      '2022년 새 예배당 입당',
      '2023년 지역사회 봉사 시작',
      '2024년 온라인 예배 시스템 구축'
    ],
    beliefs: [
      '성경의 영감과 무오성',
      '삼위일체 하나님',
      '예수 그리스도의 대속과 부활',
      '성령의 내주와 사역',
      '교회는 그리스도의 몸',
      '예수 그리스도의 재림'
    ]
  })

  // 교회 사역
  const [ministries, setMinistries] = useState<Ministry[]>([
    {
      id: '1',
      title: '기도 사역',
      icon: '🙏',
      description: '영적 성장과 기도의 힘',
      detailContent: '매주 정기적인 기도 모임을 통해 개인과 교회, 지역사회를 위해 기도합니다.'
    },
    {
      id: '2',
      title: '문해력 사역',
      icon: '📖',
      description: '성경과 말씀 이해력 향상',
      detailContent: '성경 읽기와 이해를 돕는 프로그램을 운영하여 말씀 위에 굳게 서는 신앙인을 양육합니다.'
    },
    {
      id: '3',
      title: '글쓰기 사역',
      icon: '✍️',
      description: '신앙 고백과 콘텐츠 창작',
      detailContent: '기독교 콘텐츠 생산을 위한 리더를 키우며, 글쓰기를 통한 신앙 나눔을 실천합니다.'
    }
  ])

  // 교회 사역 갤러리 (탭 페이지용)
  const [ministryGallery, setMinistryGallery] = useState<MinistryGallery[]>([])

  // 교회 소식
  const [newsItems, setNewsItems] = useState<NewsItem[]>([
    {
      id: '1',
      title: '주성성결교회에 오신 것을 환영합니다',
      category: '공지',
      date: new Date().toISOString().split('T')[0],
      excerpt: '하나님의 사랑으로 함께하는 공동체',
      content: '주성성결교회에 오신 것을 진심으로 환영합니다. 우리는 하나님의 말씀으로 세워지고 사랑으로 하나 되는 교회입니다.'
    }
  ])

  // 기도 요청
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([
    {
      id: '1',
      category: '개인',
      title: '교회를 위한 기도',
      content: '교회가 하나님의 말씀 위에 굳게 서고, 사랑으로 하나 되기를 기도합니다.',
      date: new Date().toISOString().split('T')[0],
      isPublic: true
    }
  ])

  // 설교
  const [sermons, setSermons] = useState<Sermon[]>([
    {
      id: '1',
      title: '환영 설교',
      pastor: '김선우 목사',
      date: new Date().toISOString().split('T')[0],
      verse: '요한복음 3:16',
      youtubeUrl: '',
      description: '하나님의 사랑에 대한 설교입니다.'
    }
  ])

  // 사이트 스타일
  const [siteStyles, setSiteStyles] = useState<SiteStyles>({
    primaryColor: '#8B4513',
    secondaryColor: '#F5E6D3',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    fontSize: '16',
    sectionSpacing: '80',
    borderRadius: '8',
    customCSS: ''
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

    // 교회 소개 내용 로드
    const savedAbout = localStorage.getItem('about_content')
    if (savedAbout) {
      setAboutContent(JSON.parse(savedAbout))
    }

    // 교회 사역 로드
    const savedMinistries = localStorage.getItem('ministries')
    if (savedMinistries) {
      setMinistries(JSON.parse(savedMinistries))
    }

    // 교회 사역 갤러리 로드
    const savedMinistryGallery = localStorage.getItem('ministry_gallery')
    if (savedMinistryGallery) {
      setMinistryGallery(JSON.parse(savedMinistryGallery))
    }

    // 교회 소식 로드
    const savedNews = localStorage.getItem('news_items')
    if (savedNews) {
      setNewsItems(JSON.parse(savedNews))
    }

    // 기도 요청 로드
    const savedPrayers = localStorage.getItem('prayer_requests')
    if (savedPrayers) {
      setPrayerRequests(JSON.parse(savedPrayers))
    }

    // 설교 로드
    const savedSermons = localStorage.getItem('sermons')
    if (savedSermons) {
      setSermons(JSON.parse(savedSermons))
    }

    // 사이트 스타일 로드
    const savedStyles = localStorage.getItem('site_styles')
    if (savedStyles) {
      setSiteStyles(JSON.parse(savedStyles))
      applyStyles(JSON.parse(savedStyles))
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
    // 저장 후 다른 탭/창에 변경사항 알림
    window.dispatchEvent(new Event('storage'))
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const saveChurchInfo = () => {
    localStorage.setItem('church_info', JSON.stringify(churchInfo))
    console.log('Saved church info:', churchInfo)
    showSaveMessage()
  }

  const savePastorInfo = () => {
    localStorage.setItem('pastor_info', JSON.stringify(pastorInfo))
    console.log('Saved pastor info:', pastorInfo)
    showSaveMessage()
  }

  const saveWorshipTimes = () => {
    const worshipData = {
      sunday: sundayWorship,
      weekday: weekdayWorship
    }
    localStorage.setItem('worship_times', JSON.stringify(worshipData))
    console.log('Saved worship times:', worshipData)
    showSaveMessage()
  }

  const savePopupData = () => {
    localStorage.setItem('popup_data', JSON.stringify(popupData))
    console.log('Saved popup data:', popupData)
    showSaveMessage()
  }

  const saveHeroContent = () => {
    localStorage.setItem('hero_content', JSON.stringify(heroContent))
    console.log('Saved hero content:', heroContent)
    showSaveMessage()
  }

  const saveAboutContent = () => {
    localStorage.setItem('about_content', JSON.stringify(aboutContent))
    console.log('Saved about content:', aboutContent)
    showSaveMessage()
  }

  const saveMinistries = () => {
    localStorage.setItem('ministries', JSON.stringify(ministries))
    console.log('Saved ministries:', ministries)
    showSaveMessage()
  }

  const saveMinistryGallery = () => {
    localStorage.setItem('ministry_gallery', JSON.stringify(ministryGallery))
    console.log('Saved ministry gallery:', ministryGallery)
    showSaveMessage()
  }

  const addMinistryGalleryItem = () => {
    const newItem: MinistryGallery = {
      id: Date.now().toString(),
      title: '새 사역',
      category: '예배',
      description: '',
      image: '',
      date: new Date().toISOString().split('T')[0]
    }
    setMinistryGallery([...ministryGallery, newItem])
  }

  const deleteMinistryGalleryItem = (id: string) => {
    setMinistryGallery(ministryGallery.filter(item => item.id !== id))
  }

  const saveNewsItems = () => {
    localStorage.setItem('news_items', JSON.stringify(newsItems))
    console.log('Saved news items:', newsItems)
    showSaveMessage()
  }

  const savePrayerRequests = () => {
    localStorage.setItem('prayer_requests', JSON.stringify(prayerRequests))
    console.log('Saved prayer requests:', prayerRequests)
    showSaveMessage()
  }

  const saveSermons = () => {
    localStorage.setItem('sermons', JSON.stringify(sermons))
    console.log('Saved sermons:', sermons)
    showSaveMessage()
  }

  const addSermon = () => {
    const newSermon: Sermon = {
      id: Date.now().toString(),
      title: '새 설교',
      pastor: '김선우 목사',
      date: new Date().toISOString().split('T')[0],
      verse: '',
      youtubeUrl: '',
      description: ''
    }
    setSermons([newSermon, ...sermons])
  }

  const deleteSermon = (id: string) => {
    setSermons(sermons.filter(s => s.id !== id))
  }

  const saveSiteStyles = () => {
    localStorage.setItem('site_styles', JSON.stringify(siteStyles))
    applyStyles(siteStyles)
    showSaveMessage()
  }

  const applyStyles = (styles: SiteStyles) => {
    const root = document.documentElement
    root.style.setProperty('--primary-color', styles.primaryColor)
    root.style.setProperty('--secondary-color', styles.secondaryColor)
    root.style.setProperty('--bg-color', styles.backgroundColor)
    root.style.setProperty('--text-color', styles.textColor)
    root.style.setProperty('--font-size', styles.fontSize + 'px')
    root.style.setProperty('--section-spacing', styles.sectionSpacing + 'px')
    root.style.setProperty('--border-radius', styles.borderRadius + 'px')
    
    // 커스텀 CSS 적용
    let styleElement = document.getElementById('custom-css')
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = 'custom-css'
      document.head.appendChild(styleElement)
    }
    styleElement.textContent = styles.customCSS
  }

  const resetStyles = () => {
    const defaultStyles: SiteStyles = {
      primaryColor: '#8B4513',
      secondaryColor: '#F5E6D3',
      backgroundColor: '#FFFFFF',
      textColor: '#1F2937',
      fontSize: '16',
      sectionSpacing: '80',
      borderRadius: '8',
      customCSS: ''
    }
    setSiteStyles(defaultStyles)
    applyStyles(defaultStyles)
  }

  const addMinistry = () => {
    const newMinistry: Ministry = {
      id: Date.now().toString(),
      title: '새 사역',
      icon: '⭐',
      description: '사역 설명',
      detailContent: '상세 내용을 입력하세요'
    }
    setMinistries([...ministries, newMinistry])
  }

  const deleteMinistry = (id: string) => {
    setMinistries(ministries.filter(m => m.id !== id))
  }

  const addNewsItem = () => {
    const newNews: NewsItem = {
      id: Date.now().toString(),
      title: '새 소식',
      category: '공지',
      date: new Date().toISOString().split('T')[0],
      excerpt: '간단한 설명',
      content: '상세 내용을 입력하세요'
    }
    setNewsItems([newNews, ...newsItems])
  }

  const deleteNewsItem = (id: string) => {
    setNewsItems(newsItems.filter(n => n.id !== id))
  }

  const addPrayerRequest = () => {
    const newPrayer: PrayerRequest = {
      id: Date.now().toString(),
      category: '개인',
      title: '새 기도 제목',
      content: '기도 내용을 입력하세요',
      date: new Date().toISOString().split('T')[0],
      isPublic: true
    }
    setPrayerRequests([newPrayer, ...prayerRequests])
  }

  const deletePrayerRequest = (id: string) => {
    setPrayerRequests(prayerRequests.filter(p => p.id !== id))
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
              <h1 className="text-2xl font-bold text-primary">📝 관리자 페이지</h1>
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
          <div className="flex space-x-4 overflow-x-auto">
            {[
              { id: 'church-info', label: '🏛️ 교회정보' },
              { id: 'pastor', label: '👨‍🏫 담임목사' },
              { id: 'worship', label: '⛪ 예배시간' },
              { id: 'about', label: '📖 교회소개' },
              { id: 'ministry', label: '🎯 교회사역' },
              { id: 'ministry-gallery', label: '📸 사역갤러리' },
              { id: 'sermon', label: '🎤 설교관리' },
              { id: 'news', label: '📰 교회소식' },
              { id: 'prayer', label: '🙏 기도요청' },
              { id: 'popup', label: '📢 팝업배너' },
              { id: 'hero', label: '🎨 메인배너' },
              { id: 'styles', label: '🎨 스타일' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${
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
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium"
                >
                  💾 저장하기
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
                  경력 (줄바꿈으로 구분)
                </label>
                <textarea
                  value={pastorInfo.career?.join('\n') || ''}
                  onChange={(e) => setPastorInfo({
                    ...pastorInfo,
                    career: e.target.value.split('\n').filter(line => line.trim())
                  })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="예: 희망도서관 청주지부장"
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
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium"
                >
                  💾 저장하기
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
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium"
                >
                  💾 저장하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 교회 소개 페이지 */}
        {activeTab === 'about' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">교회 소개 페이지 내용</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  비전 (Vision)
                </label>
                <textarea
                  value={aboutContent.vision}
                  onChange={(e) => setAboutContent({...aboutContent, vision: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="교회의 비전을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  사명 (Mission)
                </label>
                <textarea
                  value={aboutContent.mission}
                  onChange={(e) => setAboutContent({...aboutContent, mission: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="교회의 사명을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  교회 연혁 (한 줄씩 입력)
                </label>
                <textarea
                  value={aboutContent.history.join('\n')}
                  onChange={(e) => setAboutContent({
                    ...aboutContent,
                    history: e.target.value.split('\n').filter(line => line.trim())
                  })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="2020년 교회 설립&#10;2021년 청년부 개설"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  우리의 믿음 (한 줄씩 입력)
                </label>
                <textarea
                  value={aboutContent.beliefs.join('\n')}
                  onChange={(e) => setAboutContent({
                    ...aboutContent,
                    beliefs: e.target.value.split('\n').filter(line => line.trim())
                  })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="성경의 영감과 무오성&#10;삼위일체 하나님"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={saveAboutContent}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium"
                >
                  💾 저장하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 교회 사역 */}
        {activeTab === 'ministry' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">교회 사역 관리</h2>
              <button
                onClick={addMinistry}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                ➕ 사역 추가
              </button>
            </div>
            
            <div className="space-y-4">
              {ministries.map((ministry, index) => (
                <div key={ministry.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        사역 제목
                      </label>
                      <input
                        type="text"
                        value={ministry.title}
                        onChange={(e) => {
                          const updated = [...ministries]
                          updated[index].title = e.target.value
                          setMinistries(updated)
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        아이콘 (이모지)
                      </label>
                      <input
                        type="text"
                        value={ministry.icon}
                        onChange={(e) => {
                          const updated = [...ministries]
                          updated[index].icon = e.target.value
                          setMinistries(updated)
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="🙏"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        간단한 설명
                      </label>
                      <input
                        type="text"
                        value={ministry.description}
                        onChange={(e) => {
                          const updated = [...ministries]
                          updated[index].description = e.target.value
                          setMinistries(updated)
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        사역 이미지 URL (선택사항)
                      </label>
                      <input
                        type="url"
                        value={ministry.image || ''}
                        onChange={(e) => {
                          const updated = [...ministries]
                          updated[index].image = e.target.value
                          setMinistries(updated)
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="https://example.com/image.jpg"
                      />
                      {ministry.image && (
                        <div className="mt-2">
                          <img 
                            src={ministry.image} 
                            alt={ministry.title}
                            className="w-32 h-32 object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        상세 내용 (또는 블로그 URL)
                      </label>
                      <textarea
                        value={ministry.detailContent}
                        onChange={(e) => {
                          const updated = [...ministries]
                          updated[index].detailContent = e.target.value
                          setMinistries(updated)
                        }}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="상세 내용을 입력하거나 블로그 URL을 입력하세요"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => deleteMinistry(ministry.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      🗑️ 삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={saveMinistries}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium"
              >
                💾 저장하기
              </button>
            </div>
          </div>
        )}

        {/* 사역 갤러리 (탭 페이지용) */}
        {activeTab === 'ministry-gallery' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">사역 갤러리 관리</h2>
                <p className="text-sm text-gray-600">교회사역 탭 페이지에 표시될 사역 활동 사진을 관리합니다</p>
              </div>
              <button
                onClick={addMinistryGalleryItem}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                ➕ 사역 추가
              </button>
            </div>
            
            <div className="space-y-6">
              {ministryGallery.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg mb-2">등록된 사역이 없습니다.</p>
                  <p className="text-sm">➕ 사역 추가 버튼을 눌러 새 사역을 등록해주세요.</p>
                </div>
              ) : (
                ministryGallery.map((item, index) => (
                  <div key={item.id} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          사역 제목 *
                        </label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...ministryGallery]
                            updated[index].title = e.target.value
                            setMinistryGallery(updated)
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="예: 2024 성탄절 예배"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          카테고리 *
                        </label>
                        <select
                          value={item.category}
                          onChange={(e) => {
                            const updated = [...ministryGallery]
                            updated[index].category = e.target.value
                            setMinistryGallery(updated)
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="예배">예배</option>
                          <option value="교육">교육</option>
                          <option value="선교">선교</option>
                          <option value="친교">친교</option>
                          <option value="기타">기타</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          날짜 *
                        </label>
                        <input
                          type="date"
                          value={item.date}
                          onChange={(e) => {
                            const updated = [...ministryGallery]
                            updated[index].date = e.target.value
                            setMinistryGallery(updated)
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          사진 URL *
                        </label>
                        <input
                          type="url"
                          value={item.image}
                          onChange={(e) => {
                            const updated = [...ministryGallery]
                            updated[index].image = e.target.value
                            setMinistryGallery(updated)
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="https://example.com/image.jpg"
                        />
                        {item.image && (
                          <div className="mt-3">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-full max-w-md h-48 object-cover rounded-lg shadow-md"
                              onError={(e) => {
                                e.currentTarget.src = ''
                                e.currentTarget.alt = '이미지 로드 실패'
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          설명
                        </label>
                        <textarea
                          value={item.description}
                          onChange={(e) => {
                            const updated = [...ministryGallery]
                            updated[index].description = e.target.value
                            setMinistryGallery(updated)
                          }}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="사역 활동에 대한 간단한 설명을 입력하세요"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => deleteMinistryGalleryItem(item.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        🗑️ 삭제
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={saveMinistryGallery}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium"
              >
                💾 저장하기
              </button>
            </div>
          </div>
        )}

        {/* 설교 관리 */}
        {activeTab === 'sermon' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">설교 관리</h2>
              <button
                onClick={addSermon}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                ➕ 설교 추가
              </button>
            </div>
            
            <div className="space-y-4">
              {sermons.map((sermon, index) => (
                <div key={sermon.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        설교 제목
                      </label>
                      <input
                        type="text"
                        value={sermon.title}
                        onChange={(e) => {
                          const updated = [...sermons]
                          updated[index].title = e.target.value
                          setSermons(updated)
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          설교자
                        </label>
                        <input
                          type="text"
                          value={sermon.pastor}
                          onChange={(e) => {
                            const updated = [...sermons]
                            updated[index].pastor = e.target.value
                            setSermons(updated)
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          날짜
                        </label>
                        <input
                          type="date"
                          value={sermon.date}
                          onChange={(e) => {
                            const updated = [...sermons]
                            updated[index].date = e.target.value
                            setSermons(updated)
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        본문 말씀
                      </label>
                      <input
                        type="text"
                        value={sermon.verse}
                        onChange={(e) => {
                          const updated = [...sermons]
                          updated[index].verse = e.target.value
                          setSermons(updated)
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="예: 요한복음 3:16"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        유튜브 URL
                      </label>
                      <input
                        type="url"
                        value={sermon.youtubeUrl}
                        onChange={(e) => {
                          const updated = [...sermons]
                          updated[index].youtubeUrl = e.target.value
                          setSermons(updated)
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        설교 설명
                      </label>
                      <textarea
                        value={sermon.description}
                        onChange={(e) => {
                          const updated = [...sermons]
                          updated[index].description = e.target.value
                          setSermons(updated)
                        }}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="설교에 대한 간단한 설명을 입력하세요"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => deleteSermon(sermon.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      🗑️ 삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={saveSermons}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium"
              >
                💾 저장하기
              </button>
            </div>

            {/* 안내 */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-900 mb-2">💡 유튜브 URL 입력 방법</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>1. 유튜브에서 설교 영상을 업로드합니다</li>
                <li>2. 영상 URL을 복사합니다 (예: https://www.youtube.com/watch?v=VIDEO_ID)</li>
                <li>3. 위의 "유튜브 URL" 칸에 붙여넣습니다</li>
                <li>4. 저장하면 메인 페이지의 "최근 설교" 섹션에 영상이 표시됩니다</li>
              </ul>
            </div>
          </div>
        )}

        {/* 교회 소식 */}
        {activeTab === 'news' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">교회 소식 관리</h2>
              <button
                onClick={addNewsItem}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                ➕ 소식 추가
              </button>
            </div>
            
            <div className="space-y-4">
              {newsItems.map((news, index) => (
                <div key={news.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        제목
                      </label>
                      <input
                        type="text"
                        value={news.title}
                        onChange={(e) => {
                          const updated = [...newsItems]
                          updated[index].title = e.target.value
                          setNewsItems(updated)
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          카테고리
                        </label>
                        <select
                          value={news.category}
                          onChange={(e) => {
                            const updated = [...newsItems]
                            updated[index].category = e.target.value
                            setNewsItems(updated)
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="공지">공지</option>
                          <option value="행사">행사</option>
                          <option value="예배">예배</option>
                          <option value="모집">모집</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          날짜
                        </label>
                        <input
                          type="date"
                          value={news.date}
                          onChange={(e) => {
                            const updated = [...newsItems]
                            updated[index].date = e.target.value
                            setNewsItems(updated)
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        간단한 설명
                      </label>
                      <input
                        type="text"
                        value={news.excerpt}
                        onChange={(e) => {
                          const updated = [...newsItems]
                          updated[index].excerpt = e.target.value
                          setNewsItems(updated)
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        상세 내용
                      </label>
                      <textarea
                        value={news.content}
                        onChange={(e) => {
                          const updated = [...newsItems]
                          updated[index].content = e.target.value
                          setNewsItems(updated)
                        }}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => deleteNewsItem(news.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      🗑️ 삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={saveNewsItems}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium"
              >
                💾 저장하기
              </button>
            </div>
          </div>
        )}

        {/* 기도 요청 */}
        {activeTab === 'prayer' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">기도 요청 관리</h2>
              <button
                onClick={addPrayerRequest}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                ➕ 기도 제목 추가
              </button>
            </div>
            
            <div className="space-y-4">
              {prayerRequests.map((prayer, index) => (
                <div key={prayer.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        제목
                      </label>
                      <input
                        type="text"
                        value={prayer.title}
                        onChange={(e) => {
                          const updated = [...prayerRequests]
                          updated[index].title = e.target.value
                          setPrayerRequests(updated)
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          카테고리
                        </label>
                        <select
                          value={prayer.category}
                          onChange={(e) => {
                            const updated = [...prayerRequests]
                            updated[index].category = e.target.value
                            setPrayerRequests(updated)
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="개인">개인</option>
                          <option value="교회">교회</option>
                          <option value="선교">선교</option>
                          <option value="가정">가정</option>
                          <option value="건강">건강</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          날짜
                        </label>
                        <input
                          type="date"
                          value={prayer.date}
                          onChange={(e) => {
                            const updated = [...prayerRequests]
                            updated[index].date = e.target.value
                            setPrayerRequests(updated)
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        기도 내용
                      </label>
                      <textarea
                        value={prayer.content}
                        onChange={(e) => {
                          const updated = [...prayerRequests]
                          updated[index].content = e.target.value
                          setPrayerRequests(updated)
                        }}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={prayer.isPublic}
                          onChange={(e) => {
                            const updated = [...prayerRequests]
                            updated[index].isPublic = e.target.checked
                            setPrayerRequests(updated)
                          }}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">공개 (체크하면 홈페이지에 표시됩니다)</span>
                      </label>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => deletePrayerRequest(prayer.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      🗑️ 삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={savePrayerRequests}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium"
              >
                💾 저장하기
              </button>
            </div>
          </div>
        )}

        {/* 팝업 배너 */}
        {activeTab === 'popup' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">팝업 배너 관리</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <input
                  type="checkbox"
                  id="popup-enabled"
                  checked={popupData.enabled}
                  onChange={(e) => setPopupData({...popupData, enabled: e.target.checked})}
                  className="w-5 h-5 text-primary rounded"
                />
                <label htmlFor="popup-enabled" className="text-sm font-medium text-gray-700">
                  ✅ 팝업 활성화 (체크하면 홈페이지 시작 시 팝업이 표시됩니다)
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
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium"
                >
                  💾 저장하기
                </button>
              </div>

              {/* 미리보기 */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4">👀 미리보기</h3>
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

              {/* 배경 설정 */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">🖼️ 배경 설정</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    배경 타입
                  </label>
                  <select
                    value={heroContent.backgroundType}
                    onChange={(e) => setHeroContent({...heroContent, backgroundType: e.target.value as 'gradient' | 'image' | 'video'})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  >
                    <option value="gradient">그라데이션 (기본)</option>
                    <option value="image">이미지</option>
                    <option value="video">비디오</option>
                  </select>
                </div>

                {heroContent.backgroundType === 'image' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      배경 이미지 URL
                    </label>
                    <input
                      type="text"
                      value={heroContent.backgroundImage || ''}
                      onChange={(e) => setHeroContent({...heroContent, backgroundImage: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      placeholder="https://example.com/image.jpg"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      💡 이미지 URL을 입력하세요. 추천 크기: 1920x1080px 이상
                    </p>
                  </div>
                )}

                {heroContent.backgroundType === 'video' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      배경 비디오 URL
                    </label>
                    <input
                      type="text"
                      value={heroContent.backgroundVideo || ''}
                      onChange={(e) => setHeroContent({...heroContent, backgroundVideo: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      placeholder="https://example.com/video.mp4"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      💡 MP4 비디오 URL을 입력하세요. 자동 재생/반복됩니다.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={saveHeroContent}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium"
                >
                  💾 저장하기
                </button>
              </div>

              {/* 미리보기 */}
              <div className="mt-8 relative overflow-hidden rounded-lg" style={{ minHeight: '400px' }}>
                {/* 배경 레이어 */}
                {heroContent.backgroundType === 'gradient' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light"></div>
                )}
                
                {heroContent.backgroundType === 'image' && heroContent.backgroundImage && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${heroContent.backgroundImage})` }}
                  ></div>
                )}
                
                {heroContent.backgroundType === 'video' && heroContent.backgroundVideo && (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src={heroContent.backgroundVideo} type="video/mp4" />
                  </video>
                )}

                {/* 오버레이 */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* 콘텐츠 */}
                <div className="relative z-10 p-12 text-center text-white flex flex-col justify-center items-center" style={{ minHeight: '400px' }}>
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

        {/* 스타일 & 레이아웃 */}
        {activeTab === 'styles' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">🎨 스타일 & 레이아웃 커스터마이징</h2>
            
            <div className="space-y-8">
              {/* 색상 설정 */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">색상 설정</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      주 색상 (Primary)
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={siteStyles.primaryColor}
                        onChange={(e) => setSiteStyles({...siteStyles, primaryColor: e.target.value})}
                        className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={siteStyles.primaryColor}
                        onChange={(e) => setSiteStyles({...siteStyles, primaryColor: e.target.value})}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="#8B4513"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      보조 색상 (Secondary)
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={siteStyles.secondaryColor}
                        onChange={(e) => setSiteStyles({...siteStyles, secondaryColor: e.target.value})}
                        className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={siteStyles.secondaryColor}
                        onChange={(e) => setSiteStyles({...siteStyles, secondaryColor: e.target.value})}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="#F5E6D3"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      배경 색상
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={siteStyles.backgroundColor}
                        onChange={(e) => setSiteStyles({...siteStyles, backgroundColor: e.target.value})}
                        className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={siteStyles.backgroundColor}
                        onChange={(e) => setSiteStyles({...siteStyles, backgroundColor: e.target.value})}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="#FFFFFF"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      텍스트 색상
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={siteStyles.textColor}
                        onChange={(e) => setSiteStyles({...siteStyles, textColor: e.target.value})}
                        className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={siteStyles.textColor}
                        onChange={(e) => setSiteStyles({...siteStyles, textColor: e.target.value})}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="#1F2937"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 레이아웃 설정 */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">레이아웃 설정</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      기본 폰트 크기: {siteStyles.fontSize}px
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="20"
                      value={siteStyles.fontSize}
                      onChange={(e) => setSiteStyles({...siteStyles, fontSize: e.target.value})}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>작게 (12px)</span>
                      <span>보통 (16px)</span>
                      <span>크게 (20px)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      섹션 간격: {siteStyles.sectionSpacing}px
                    </label>
                    <input
                      type="range"
                      min="40"
                      max="120"
                      step="10"
                      value={siteStyles.sectionSpacing}
                      onChange={(e) => setSiteStyles({...siteStyles, sectionSpacing: e.target.value})}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>좁게 (40px)</span>
                      <span>보통 (80px)</span>
                      <span>넓게 (120px)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      모서리 둥글기: {siteStyles.borderRadius}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="24"
                      step="2"
                      value={siteStyles.borderRadius}
                      onChange={(e) => setSiteStyles({...siteStyles, borderRadius: e.target.value})}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>각지게 (0px)</span>
                      <span>보통 (8px)</span>
                      <span>둥글게 (24px)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 커스텀 CSS */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">고급: 커스텀 CSS</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CSS 코드 (고급 사용자용)
                  </label>
                  <textarea
                    value={siteStyles.customCSS}
                    onChange={(e) => setSiteStyles({...siteStyles, customCSS: e.target.value})}
                    rows={8}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                    placeholder="/* 예시:&#10;.section-padding {&#10;  padding: 100px 0;&#10;}&#10;&#10;.card {&#10;  box-shadow: 0 4px 12px rgba(0,0,0,0.1);&#10;} */"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    💡 CSS를 아시는 경우 직접 스타일을 추가할 수 있습니다
                  </p>
                </div>
              </div>

              {/* 미리보기 */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">👀 미리보기</h3>
                <div 
                  className="p-8 rounded-lg border-2"
                  style={{
                    backgroundColor: siteStyles.backgroundColor,
                    color: siteStyles.textColor,
                    fontSize: siteStyles.fontSize + 'px'
                  }}
                >
                  <div 
                    className="p-6 rounded-lg text-white mb-4"
                    style={{
                      backgroundColor: siteStyles.primaryColor,
                      borderRadius: siteStyles.borderRadius + 'px'
                    }}
                  >
                    <h3 className="text-2xl font-bold mb-2">주 색상 미리보기</h3>
                    <p>이것은 주 색상을 사용한 예시입니다</p>
                  </div>
                  <div 
                    className="p-6 rounded-lg mb-4"
                    style={{
                      backgroundColor: siteStyles.secondaryColor,
                      color: siteStyles.textColor,
                      borderRadius: siteStyles.borderRadius + 'px'
                    }}
                  >
                    <h3 className="text-xl font-bold mb-2">보조 색상 미리보기</h3>
                    <p>이것은 보조 색상을 사용한 예시입니다</p>
                  </div>
                  <p>기본 텍스트 크기와 색상 미리보기</p>
                </div>
              </div>

              {/* 버튼들 */}
              <div className="flex justify-between items-center">
                <button
                  onClick={resetStyles}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  🔄 기본값으로 초기화
                </button>
                <button
                  onClick={saveSiteStyles}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium"
                >
                  💾 저장 및 적용
                </button>
              </div>

              {/* 안내 메시지 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-2">💡 사용 팁</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 색상은 색상 선택기 또는 HEX 코드로 입력할 수 있습니다</li>
                  <li>• 변경 후 "저장 및 적용" 버튼을 눌러야 홈페이지에 반영됩니다</li>
                  <li>• 미리보기에서 변경사항을 먼저 확인하세요</li>
                  <li>• 마음에 들지 않으면 "기본값으로 초기화"를 눌러 원래대로 돌아갈 수 있습니다</li>
                </ul>
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
            <li>• <strong>10개의 탭</strong>에서 홈페이지의 모든 내용을 수정할 수 있습니다</li>
            <li>• 각 항목을 수정한 후 반드시 <strong>💾 저장하기 버튼</strong>을 클릭하세요</li>
            <li>• 저장하면 홈페이지에 <strong>즉시 반영</strong>됩니다 (새로고침 필요)</li>
            <li>• <strong>🎨 스타일 탭</strong>에서 색상, 폰트, 간격 등을 직접 조절할 수 있습니다</li>
            <li>• 교회 소식, 사역, 기도 요청은 <strong>추가/수정/삭제</strong>가 모두 가능합니다</li>
            <li>• 모든 데이터는 브라우저에 저장되므로 <strong>정기적으로 백업</strong>하세요</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
