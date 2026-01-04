'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Hero from '@/components/shared/Hero'
import PopupModal from '@/components/ui/PopupModal'

interface Ministry {
  id: string
  title: string
  icon: string
  description: string
  detailContent: string
}

interface NewsItem {
  id: string
  title: string
  category: string
  date: string
  excerpt: string
  content: string
}

interface WorshipTime {
  name: string
  time: string
  description: string
}

interface ChurchInfo {
  name: string
  englishName: string
  phone: string
  fax: string
  email: string
  address: string
  addressDetail: string
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

export default function Home() {
  const [ministries, setMinistries] = useState<Ministry[]>([
    { id: '1', title: '기도 사역', icon: '🙏', description: '영적 성장과 기도의 힘', detailContent: '' },
    { id: '2', title: '문해력 사역', icon: '📖', description: '성경과 말씀 이해력 향상', detailContent: '' },
    { id: '3', title: '글쓰기 사역', icon: '✍️', description: '신앙 고백과 콘텐츠 창작', detailContent: '' },
  ])
  
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [sermons, setSermons] = useState<Sermon[]>([])
  const [churchInfo, setChurchInfo] = useState<ChurchInfo>({
    name: '주성성결교회',
    englishName: 'Joosung Holiness Church',
    phone: '010-8986-3965',
    fax: '02-1234-5679',
    email: 'klum3@naver.com',
    address: '충북 청주시 흥덕구 봉명로219번길 24',
    addressDetail: '2층'
  })
  
  const [sundayWorship, setSundayWorship] = useState<WorshipTime[]>([
    { name: '주일 예배', time: '오전 10:45', description: '주일 메인 예배' },
    { name: '성장이 있는 소모임', time: '오후 1:00', description: '소그룹 모임' }
  ])
  
  const [weekdayWorship, setWeekdayWorship] = useState<WorshipTime[]>([
    { name: '새벽 예배', time: '오전 06:30', description: '하루를 주님께 드리는 시간' }
  ])

  useEffect(() => {
    // localStorage에서 데이터 로드
    const loadData = () => {
      const savedMinistries = localStorage.getItem('ministries')
      if (savedMinistries) {
        setMinistries(JSON.parse(savedMinistries))
      }

      const savedNews = localStorage.getItem('news_items')
      if (savedNews) {
        setNewsItems(JSON.parse(savedNews))
      }

      const savedSermons = localStorage.getItem('sermons')
      if (savedSermons) {
        setSermons(JSON.parse(savedSermons))
      }

      const savedChurchInfo = localStorage.getItem('church_info')
      if (savedChurchInfo) {
        setChurchInfo(JSON.parse(savedChurchInfo))
      }

      const savedWorshipTimes = localStorage.getItem('worship_times')
      if (savedWorshipTimes) {
        const times = JSON.parse(savedWorshipTimes)
        if (times.sunday) setSundayWorship(times.sunday)
        if (times.weekday) setWeekdayWorship(times.weekday)
      }
    }

    loadData()
  }, [])

  // 유튜브 URL에서 비디오 ID 추출
  const getYoutubeVideoId = (url: string) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const recentAlbums: any[] = []

  return (
    <>
      <PopupModal />
      
      {/* Hero Section - Full Screen */}
      <Hero />

      {/* Worship Times Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              예배 시간
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 주일 예배 */}
            {sundayWorship.filter(worship => worship.time && worship.time.trim() !== '').map((worship, index) => (
              <div key={index} className="card p-6 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-3">
                  {index === 0 ? '⛪' : '👥'}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{worship.name}</h3>
                <p className="font-medium text-gray-600">{worship.time}</p>
              </div>
            ))}

            {/* 새벽 예배 */}
            {weekdayWorship.filter(worship => worship.time && worship.time.trim() !== '').map((worship, index) => (
              <div key={`weekday-${index}`} className="card p-6 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-3">
                  {worship.name.includes('새벽') ? '🌅' : '🕯️'}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{worship.name}</h3>
                <p className="font-medium text-gray-600">{worship.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Sermons Section */}
      <section className="section-padding bg-beige">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                최근 설교
              </h2>
              <p className="text-gray-600">주일 설교 말씀을 나눕니다</p>
            </div>
            <Link 
              href="/sermon"
              className="hidden sm:inline-flex items-center space-x-2 text-primary hover:text-primary-light transition-colors font-medium"
            >
              <span>전체보기</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {sermons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sermons.slice(0, 3).map((sermon) => {
                const videoId = getYoutubeVideoId(sermon.youtubeUrl)
                return (
                  <article key={sermon.id} className="card overflow-hidden group h-full">
                    {videoId ? (
                      <div className="relative aspect-video">
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={sermon.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="relative h-48 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                          <div className="text-center">
                            <div className="text-5xl mb-2">🎤</div>
                            <div className="text-sm font-medium">설교</div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <span className="text-xs text-gray-500">
                        {new Date(sermon.date).toLocaleDateString('ko-KR')}
                      </span>
                      <h3 className="text-lg font-bold text-primary mt-2 mb-2 line-clamp-2">
                        {sermon.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">본문: {sermon.verse}</p>
                      <p className="text-sm text-gray-500">{sermon.pastor}</p>
                      {sermon.description && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{sermon.description}</p>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">설교 데이터가 없습니다.</p>
              <p className="text-sm mt-2">관리자 페이지에서 설교를 추가해주세요.</p>
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Link href="/sermon" className="btn-primary">
              설교 전체보기
            </Link>
          </div>
        </div>
      </section>

      {/* Ministries Preview Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                교회 사역
              </h2>
              <p className="text-gray-600">우리는 기독교 콘텐츠 생산을 하는 리더를 키웁니다</p>
            </div>
            <Link 
              href="/ministry"
              className="hidden sm:inline-flex items-center space-x-2 text-primary hover:text-primary-light transition-colors font-medium"
            >
              <span>전체보기</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {ministries.slice(0, 3).map((ministry) => (
              <Link 
                key={ministry.id}
                href="/ministry"
                className="card p-8 text-center hover:scale-105 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {ministry.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-primary-light transition-colors">
                  {ministry.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {ministry.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link href="/ministry" className="btn-primary">
              사역 전체보기
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Photos Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                최근 활동
              </h2>
              <p className="text-gray-600">함께한 소중한 순간들</p>
            </div>
            <Link 
              href="/gallery"
              className="hidden sm:inline-flex items-center space-x-2 text-primary hover:text-primary-light transition-colors font-medium"
            >
              <span>전체보기</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {recentAlbums.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentAlbums.map((album) => (
                <Link href={`/gallery`} key={album._id}>
                  <div className="card overflow-hidden group cursor-pointer aspect-square">
                    <div className="relative h-full bg-gradient-to-br from-beige to-beige-dark">
                      <div className="absolute inset-0 flex items-center justify-center text-primary/20 text-5xl group-hover:scale-110 transition-transform duration-300">
                        📷
                      </div>
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/80 transition-colors duration-300 flex items-center justify-center">
                        <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                          <p className="text-sm font-medium line-clamp-2">{album.title}</p>
                          <p className="text-xs mt-1">
                            {new Date(album.date).toLocaleDateString('ko-KR')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">앨범 데이터가 없습니다.</p>
              <p className="text-sm mt-2">관리자 페이지에서 앨범을 추가해주세요.</p>
            </div>
          )}

          <div className="text-center mt-8">
            <Link href="/gallery" className="btn-primary">
              갤러리 전체보기
            </Link>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                주요 공지사항
              </h2>
              <p className="text-gray-200">교회의 중요한 소식을 전합니다</p>
            </div>
            <Link 
              href="/news"
              className="hidden sm:inline-flex items-center space-x-2 text-white hover:text-beige transition-colors font-medium"
            >
              <span>전체보기</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {newsItems.filter(n => n.isPublic !== false).length > 0 ? (
            <div className="space-y-4">
              {newsItems.filter(n => n.isPublic !== false).slice(0, 3).map((news) => (
                <Link href={`/news`} key={news.id}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                            {news.category}
                          </span>
                          <span className="text-sm text-gray-200">
                            {new Date(news.date).toLocaleDateString('ko-KR')}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold group-hover:text-beige transition-colors line-clamp-2">
                          {news.title}
                        </h3>
                        {news.excerpt && (
                          <p className="text-sm text-gray-200 mt-2 line-clamp-2">
                            {news.excerpt}
                          </p>
                        )}
                      </div>
                      <svg 
                        className="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-white/70">
              <p className="text-lg">공지사항이 없습니다.</p>
              <p className="text-sm mt-2">관리자 페이지에서 공지사항을 추가해주세요.</p>
            </div>
          )}

          <div className="text-center mt-8">
            <Link href="/news" className="inline-block px-8 py-3 bg-white text-primary rounded-md hover:bg-beige transition-colors font-medium">
              공지사항 전체보기
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="section-padding bg-beige">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              처음 오시나요?
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              우리 교회는 모든 분들을 환영합니다.<br />
              궁금하신 점이 있으시면 언제든지 문의해주세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                📍 오시는 길
              </Link>
              <Link href="/about" className="btn-secondary">
                ℹ️ 교회 소개
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">📍</div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary mb-1">주소</h4>
                  <p className="text-sm text-gray-600 break-keep">{churchInfo.address} {churchInfo.addressDetail}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">📞</div>
                <div>
                  <h4 className="font-bold text-primary mb-1">전화</h4>
                  <p className="text-sm text-gray-600">{churchInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">✉️</div>
                <div>
                  <h4 className="font-bold text-primary mb-1">이메일</h4>
                  <p className="text-sm text-gray-600">{churchInfo.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
