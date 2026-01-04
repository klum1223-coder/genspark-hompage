'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// 사역 갤러리 데이터 타입 정의 (탭 페이지용)
interface MinistryGallery {
  id: string
  title: string
  category: string
  description: string
  image: string
  date: string
}

const categories = ['전체', '예배', '교육', '선교', '친교', '기타'] as const

export default function MinistryPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('전체')
  const [ministryGallery, setMinistryGallery] = useState<MinistryGallery[]>([])

  // localStorage에서 사역 갤러리 데이터 로드
  useEffect(() => {
    const stored = localStorage.getItem('ministry_gallery')
    if (stored) {
      try {
        const parsedData = JSON.parse(stored)
        setMinistryGallery(parsedData)
        console.log('Loaded ministry gallery:', parsedData)
      } catch (error) {
        console.error('Failed to load ministry gallery:', error)
        setMinistryGallery([])
      }
    }

    // 5초마다 자동 새로고침
    const interval = setInterval(() => {
      const stored = localStorage.getItem('ministry_gallery')
      if (stored) {
        try {
          const parsedData = JSON.parse(stored)
          setMinistryGallery(parsedData)
        } catch (error) {
          console.error('Failed to reload ministry gallery:', error)
        }
      }
    }, 5000)

    // localStorage 변경 감지
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'ministry_gallery' && e.newValue) {
        try {
          const parsedData = JSON.parse(e.newValue)
          setMinistryGallery(parsedData)
          console.log('Ministry gallery updated from storage event:', parsedData)
        } catch (error) {
          console.error('Failed to parse ministry gallery from storage event:', error)
        }
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // 카테고리별 필터링
  const filteredMinistries = selectedCategory === '전체'
    ? ministryGallery
    : ministryGallery.filter(m => m.category === selectedCategory)

  // 이미지 그라데이션 생성
  const getGradient = (index: number) => {
    const gradients = [
      'from-blue-400 to-blue-600',
      'from-green-400 to-green-600',
      'from-purple-400 to-purple-600',
      'from-pink-400 to-pink-600',
      'from-yellow-400 to-yellow-600',
      'from-red-400 to-red-600',
      'from-indigo-400 to-indigo-600',
      'from-teal-400 to-teal-600',
    ]
    return gradients[index % gradients.length]
  }

  // 이미지 아이콘 생성
  const getIcon = (category: string) => {
    const icons: Record<string, string> = {
      '예배': '🙏',
      '교육': '📚',
      '선교': '✈️',
      '친교': '🤝',
      '기타': '⭐',
    }
    return icons[category] || '⭐'
  }

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            우리 교회의 사역
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto animate-fade-in-delay">
            하나님 나라를 위해 헌신하며,<br />
            사랑과 섬김으로 함께 성장하는 공동체입니다.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b sticky top-20 z-40 shadow-sm">
        <div className="container-custom py-6">
          <div className="flex justify-center">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ministries Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {filteredMinistries.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-gray-600 mb-4">해당 카테고리의 사역이 없습니다.</p>
              <p className="text-sm text-gray-500">관리자 페이지에서 사역을 추가해주세요.</p>
            </div>
          ) : (
            // Grid Layout - 사역 갤러리
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMinistries.map((item, index) => (
                <article
                  key={item.id}
                  className="card overflow-hidden group cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    {item.image ? (
                      <div className="aspect-[4/3] relative">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            // 이미지 로드 실패 시 그라데이션으로 대체
                            e.currentTarget.style.display = 'none'
                            const parent = e.currentTarget.parentElement
                            if (parent) {
                              parent.innerHTML = `
                                <div class="aspect-[4/3] bg-gradient-to-br ${getGradient(index)} flex items-center justify-center">
                                  <div class="text-center text-white">
                                    <div class="text-6xl mb-2">${getIcon(item.category)}</div>
                                    <div class="text-lg font-bold">${item.title}</div>
                                  </div>
                                </div>
                              `
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div className={`aspect-[4/3] bg-gradient-to-br ${getGradient(index)} flex items-center justify-center`}>
                        <div className="text-center text-white">
                          <div className="text-6xl mb-2">{getIcon(item.category)}</div>
                          <div className="text-lg font-bold">{item.title}</div>
                        </div>
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary shadow-md">
                      {item.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-primary-light transition-colors">
                      {item.title}
                    </h3>
                    
                    {item.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {item.description}
                      </p>
                    )}

                    {/* Date */}
                    {item.date && (
                      <div className="flex items-center text-xs text-gray-500 mb-4">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(item.date).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    )}

                    {/* Action Button */}
                    <Link href="/contact" className="block w-full btn-primary text-center text-sm py-2">
                      문의하기
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            사역에 참여하고 싶으신가요?
          </h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            각 사역에 대한 자세한 정보나 참여 방법이 궁금하시면<br />
            언제든지 담당자에게 문의해주세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-beige transition-colors shadow-lg"
            >
              📞 문의하기
            </Link>
            <Link
              href="/about"
              className="inline-block px-8 py-4 border-2 border-white bg-transparent text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
            >
              ℹ️ 교회 소개
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
