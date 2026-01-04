'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// 사역 데이터 타입 정의
interface Ministry {
  id: string
  title: string
  icon: string
  description: string
  detailContent: string
  category: '예배' | '교육' | '선교' | '친교' | '기타'
  meetingTime: string
  meetingPlace: string
  leader: string
  contact?: string
  date: string
}

const categories = ['전체', '예배', '교육', '선교', '친교', '기타'] as const

export default function MinistryPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('전체')
  const [layout, setLayout] = useState<'zigzag' | 'grid'>('zigzag')
  const [ministries, setMinistries] = useState<Ministry[]>([])

  // localStorage에서 데이터 로드
  useEffect(() => {
    const stored = localStorage.getItem('ministries')
    if (stored) {
      try {
        const parsedData = JSON.parse(stored)
        setMinistries(parsedData)
      } catch (error) {
        console.error('Failed to load ministries:', error)
        setMinistries([])
      }
    }
  }, [])

  // 카테고리별 필터링
  const filteredMinistries = selectedCategory === '전체'
    ? ministries
    : ministries.filter(m => m.category === selectedCategory)

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

      {/* Category Filter & Layout Toggle */}
      <section className="bg-white border-b sticky top-20 z-40 shadow-sm">
        <div className="container-custom py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
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

            {/* Layout Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setLayout('zigzag')}
                className={`px-4 py-2 rounded-md transition-all duration-300 ${
                  layout === 'zigzag'
                    ? 'bg-white shadow text-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
                title="지그재그 레이아웃"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setLayout('grid')}
                className={`px-4 py-2 rounded-md transition-all duration-300 ${
                  layout === 'grid'
                    ? 'bg-white shadow text-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
                title="그리드 레이아웃"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
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
              <p className="text-xl text-gray-600">해당 카테고리의 사역이 없습니다.</p>
            </div>
          ) : layout === 'zigzag' ? (
            // Zigzag Layout
            <div className="space-y-20">
              {filteredMinistries.map((ministry, index) => (
                <div
                  key={ministry.id}
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-8 lg:gap-12 items-center group`}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                      <div className={`aspect-[4/3] bg-gradient-to-br ${getGradient(index)} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
                        <div className="text-center text-white">
                          <div className="text-8xl mb-4">{ministry.icon || getIcon(ministry.category)}</div>
                          <div className="text-2xl font-bold">{ministry.title}</div>
                        </div>
                      </div>
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-primary">
                        {ministry.category}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4 group-hover:text-primary-light transition-colors">
                        {ministry.title}
                      </h3>
                      <p className="text-xl text-gray-700 font-medium mb-4">
                        {ministry.description}
                      </p>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {ministry.detailContent}
                      </p>
                    </div>

                    {/* Meeting Info */}
                    <div className="bg-white rounded-xl p-6 shadow-md space-y-3">
                      {ministry.meetingTime && (
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">🕐</div>
                          <div>
                            <div className="text-sm text-gray-500">모임 시간</div>
                            <div className="font-medium text-gray-800">{ministry.meetingTime}</div>
                          </div>
                        </div>
                      )}
                      {ministry.meetingPlace && (
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">📍</div>
                          <div>
                            <div className="text-sm text-gray-500">모임 장소</div>
                            <div className="font-medium text-gray-800">{ministry.meetingPlace}</div>
                          </div>
                        </div>
                      )}
                      {ministry.leader && (
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">👤</div>
                          <div>
                            <div className="text-sm text-gray-500">담당자</div>
                            <div className="font-medium text-gray-800">{ministry.leader}</div>
                          </div>
                        </div>
                      )}
                      {ministry.contact && (
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">📞</div>
                          <div>
                            <div className="text-sm text-gray-500">연락처</div>
                            <div className="font-medium text-gray-800">{ministry.contact}</div>
                          </div>
                        </div>
                      )}
                      {ministry.date && (
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">📅</div>
                          <div>
                            <div className="text-sm text-gray-500">작성일</div>
                            <div className="font-medium text-gray-800">
                              {new Date(ministry.date).toLocaleDateString('ko-KR')}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/contact" className="flex-1 btn-primary text-center">
                        문의하기
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Grid Layout
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMinistries.map((ministry) => (
                <article
                  key={ministry.id}
                  className="card overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <div className={`aspect-[4/3] bg-gradient-to-br ${getGradient(parseInt(ministry.id) || 0)} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      <div className="text-center text-white">
                        <div className="text-6xl mb-2">{ministry.icon || getIcon(ministry.category)}</div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary">
                      {ministry.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-primary-light transition-colors">
                        {ministry.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {ministry.description}
                      </p>
                    </div>

                    {/* Compact Meeting Info */}
                    <div className="space-y-2 text-sm">
                      {ministry.meetingTime && (
                        <div className="flex items-center space-x-2 text-gray-700">
                          <span>🕐</span>
                          <span>{ministry.meetingTime}</span>
                        </div>
                      )}
                      {ministry.meetingPlace && (
                        <div className="flex items-center space-x-2 text-gray-700">
                          <span>📍</span>
                          <span>{ministry.meetingPlace}</span>
                        </div>
                      )}
                      {ministry.leader && (
                        <div className="flex items-center space-x-2 text-gray-700">
                          <span>👤</span>
                          <span>{ministry.leader}</span>
                        </div>
                      )}
                    </div>

                    {/* Button */}
                    <Link href="/contact" className="w-full btn-primary text-sm block text-center">
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
