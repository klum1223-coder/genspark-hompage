import Link from 'next/link'
import { getLatestSermons } from '@/lib/youtube-api'

export const metadata = {
  title: '설교 - 주성성결교회',
  description: '주성성결교회의 설교 말씀을 나눕니다',
}

// ISR: 1시간마다 재검증
export const revalidate = 3600

export default async function SermonPage() {
  // 유튜브에서 최신 설교 가져오기
  const sermons = await getLatestSermons(12)

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">설교 말씀</h1>
          <p className="text-xl text-gray-100">
            하나님의 말씀으로 은혜받는 시간
          </p>
        </div>
      </section>

      {/* Sermon List */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Quick Links */}
          <div className="mb-8 flex flex-wrap gap-3">
            <Link
              href="/live"
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <span>🔴</span>
              <span>실시간 예배</span>
            </Link>
            <a
              href="https://www.youtube.com/@주성성결교회"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>유튜브 채널</span>
            </a>
          </div>

          {/* Sermon Grid */}
          {sermons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sermons.map((sermon) => (
                <a
                  key={sermon.id}
                  href={sermon.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gray-200 overflow-hidden">
                    <img
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
                      {sermon.duration}
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {sermon.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {sermon.description || '주성성결교회 예배 말씀'}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{new Date(sermon.publishedAt).toLocaleDateString('ko-KR')}</span>
                      <span className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        </svg>
                        <span>{sermon.viewCount}</span>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎤</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">설교 영상이 없습니다</h3>
              <p className="text-gray-600 mb-6">곧 새로운 설교가 업로드됩니다.</p>
              <a
                href="https://www.youtube.com/@주성성결교회"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
              >
                유튜브 채널 방문하기
              </a>
            </div>
          )}

          {/* Load More */}
          {sermons.length >= 12 && (
            <div className="text-center mt-12">
              <a
                href="https://www.youtube.com/@주성성결교회/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
              >
                더 많은 설교 보기
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">함께 예배하고 싶으신가요?</h2>
          <p className="text-xl text-gray-100 mb-8">
            주일마다 오전 9시, 11시에 예배를 드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/live"
              className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              실시간 예배 보기
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-primary transition-colors"
            >
              오시는 길
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
