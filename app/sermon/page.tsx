'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Sermon {
  id: string
  title: string
  pastor: string
  date: string
  verse: string
  youtubeUrl: string
  description: string
}

export default function SermonPage() {
  const [sermons, setSermons] = useState<Sermon[]>([])

  useEffect(() => {
    const loadSermons = () => {
      try {
        const savedSermons = localStorage.getItem('sermons')
        if (savedSermons) {
          const parsedSermons = JSON.parse(savedSermons)
          console.log('Sermon page loaded sermons:', parsedSermons)
          setSermons(parsedSermons)
        }
      } catch (error) {
        console.error('Error loading sermons:', error)
      }
    }

    loadSermons()
    
    // localStorage 변경 감지
    const handleStorageChange = () => {
      loadSermons()
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // 5초마다 자동 새로고침
    const interval = setInterval(loadSermons, 5000)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  // 유튜브 URL에서 비디오 ID 추출
  const getYoutubeVideoId = (url: string) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

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
              {sermons.map((sermon) => {
                const videoId = getYoutubeVideoId(sermon.youtubeUrl)
                const youtubeUrl = sermon.youtubeUrl || ''
                
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
                      {youtubeUrl && (
                        <a 
                          href={youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 mt-4 text-primary hover:text-primary-light transition-colors text-sm font-medium"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                          <span>유튜브에서 보기</span>
                        </a>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎤</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">설교 영상이 없습니다</h3>
              <p className="text-gray-600 mb-6">관리자 페이지에서 설교를 추가해주세요.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/admin"
                  className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
                >
                  관리자 페이지
                </Link>
                <a
                  href="https://www.youtube.com/@주성성결교회"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                  유튜브 채널 방문하기
                </a>
              </div>
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
            주일마다 오전 10시 45분에 예배를 드립니다
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
