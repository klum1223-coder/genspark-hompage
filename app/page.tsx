import Link from 'next/link'
import Hero from '@/components/shared/Hero'
import PopupModal from '@/components/ui/PopupModal'

export default function Home() {
  // 임시 데이터 - 나중에 CMS에서 가져올 데이터
  const recentSermons = [
    {
      id: 1,
      title: '새해, 새로운 시작',
      pastor: '김은혜 목사',
      date: '2024.01.07',
      verse: '이사야 43:18-19',
      thumbnail: '/images/sermon-1.jpg',
    },
    {
      id: 2,
      title: '하나님의 사랑',
      pastor: '김은혜 목사',
      date: '2023.12.31',
      verse: '요한복음 3:16',
      thumbnail: '/images/sermon-2.jpg',
    },
    {
      id: 3,
      title: '믿음으로 사는 삶',
      pastor: '김은혜 목사',
      date: '2023.12.24',
      verse: '히브리서 11:1-6',
      thumbnail: '/images/sermon-3.jpg',
    },
  ]

  const ministries = [
    { id: 1, title: '주일학교', icon: '👶', description: '영유아부터 고등부까지', link: '/ministry' },
    { id: 2, title: '청년부', icon: '🙋', description: '대학생과 청년들의 공동체', link: '/ministry' },
    { id: 3, title: '찬양 사역', icon: '🎵', description: '하나님을 찬양하는 음악 사역', link: '/ministry' },
    { id: 4, title: '선교 사역', icon: '🌍', description: '국내외 선교와 지역 봉사', link: '/ministry' },
  ]

  const recentPhotos = [
    { id: 1, title: '2024 신년 부흥회', date: '2024.01.15' },
    { id: 2, title: '어린이 여름성경학교', date: '2023.08.10' },
    { id: 3, title: '가을 수련회', date: '2023.10.20' },
    { id: 4, title: '성탄절 축하 행사', date: '2023.12.24' },
    { id: 5, title: '청년부 MT', date: '2023.11.05' },
    { id: 6, title: '지역 봉사 활동', date: '2023.09.15' },
  ]

  const announcements = [
    { id: 1, title: '2024년 신년 부흥회 안내', date: '2024.01.02', category: '공지' },
    { id: 2, title: '겨울 성경학교 등록 안내', date: '2023.12.28', category: '행사' },
    { id: 3, title: '주차장 이용 안내', date: '2023.12.20', category: '공지' },
  ]

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 주일 예배 */}
            <div className="card p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">⛪</div>
              <h3 className="text-xl font-bold text-primary mb-4">주일 예배</h3>
              <div className="space-y-2 text-gray-600">
                <p className="font-medium">1부 예배: 오전 09:00</p>
                <p className="font-medium">2부 예배: 오전 11:00</p>
                <p className="font-medium">찬양예배: 오후 14:00</p>
              </div>
            </div>

            {/* 수요 예배 */}
            <div className="card p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">🙏</div>
              <h3 className="text-xl font-bold text-primary mb-4">수요 예배</h3>
              <div className="space-y-2 text-gray-600">
                <p className="font-medium">매주 수요일</p>
                <p className="font-medium">오후 07:30</p>
                <p className="text-sm text-gray-500 mt-4">말씀과 기도로 함께하는 시간</p>
              </div>
            </div>

            {/* 새벽 기도회 */}
            <div className="card p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">🌅</div>
              <h3 className="text-xl font-bold text-primary mb-4">새벽 기도회</h3>
              <div className="space-y-2 text-gray-600">
                <p className="font-medium">매일 새벽</p>
                <p className="font-medium">오전 05:30</p>
                <p className="text-sm text-gray-500 mt-4">하루를 주님께 드리는 시간</p>
              </div>
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentSermons.map((sermon) => (
              <article key={sermon.id} className="card overflow-hidden group cursor-pointer">
                <div className="relative h-48 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <div className="text-center">
                      <div className="text-5xl mb-2">🎤</div>
                      <div className="text-sm font-medium">설교</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs text-gray-500">{sermon.date}</span>
                  <h3 className="text-lg font-bold text-primary mt-2 mb-2 group-hover:text-primary-light transition-colors">
                    {sermon.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">본문: {sermon.verse}</p>
                  <p className="text-sm text-gray-500">{sermon.pastor}</p>
                </div>
              </article>
            ))}
          </div>

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
              <p className="text-gray-600">다양한 사역으로 섬깁니다</p>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ministries.map((ministry) => (
              <Link 
                key={ministry.id}
                href={ministry.link}
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {recentPhotos.map((photo) => (
              <div 
                key={photo.id}
                className="card overflow-hidden group cursor-pointer aspect-square"
              >
                <div className="relative h-full bg-gradient-to-br from-beige to-beige-dark">
                  <div className="absolute inset-0 flex items-center justify-center text-primary/20 text-5xl group-hover:scale-110 transition-transform duration-300">
                    📷
                  </div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/80 transition-colors duration-300 flex items-center justify-center">
                    <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                      <p className="text-sm font-medium">{photo.title}</p>
                      <p className="text-xs mt-1">{photo.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

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

          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div 
                key={announcement.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                        {announcement.category}
                      </span>
                      <span className="text-sm text-gray-200">{announcement.date}</span>
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-beige transition-colors">
                      {announcement.title}
                    </h3>
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
            ))}
          </div>

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
                <div>
                  <h4 className="font-bold text-primary mb-1">주소</h4>
                  <p className="text-sm text-gray-600">서울시 강남구 테헤란로 123</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">📞</div>
                <div>
                  <h4 className="font-bold text-primary mb-1">전화</h4>
                  <p className="text-sm text-gray-600">02-1234-5678</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">✉️</div>
                <div>
                  <h4 className="font-bold text-primary mb-1">이메일</h4>
                  <p className="text-sm text-gray-600">info@church.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
