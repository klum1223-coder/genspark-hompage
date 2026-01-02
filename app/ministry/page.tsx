'use client'

import { useState } from 'react'
import Link from 'next/link'

// 사역 데이터 타입 정의 (나중에 CMS로 교체 가능)
interface Ministry {
  id: number
  name: string
  category: '예배' | '교육' | '선교' | '친교' | '기타'
  description: string
  details: string
  meetingTime: string
  meetingPlace: string
  leader: string
  contact?: string
  image: string // 이미지 URL (임시로 그라데이션 사용)
}

// 임시 사역 데이터
const ministriesData: Ministry[] = [
  {
    id: 1,
    name: '청년부',
    category: '교육',
    description: '대학생과 청년들의 신앙 공동체',
    details: '20-30대 청년들이 함께 예배하고 교제하며, 말씀을 통해 성장하는 공동체입니다. 매주 찬양과 나눔의 시간을 통해 서로를 격려하고 믿음을 세워갑니다.',
    meetingTime: '주일 오후 2시',
    meetingPlace: '교육관 3층 청년부실',
    leader: '김청년 전도사',
    contact: '010-1234-5678',
    image: 'gradient-1',
  },
  {
    id: 2,
    name: '유년부',
    category: '교육',
    description: '초등학교 1-3학년 어린이 교육',
    details: '초등학교 저학년 어린이들을 위한 성경 교육과 신앙 훈련 프로그램입니다. 재미있는 활동과 게임을 통해 하나님의 사랑을 배웁니다.',
    meetingTime: '주일 오전 11시',
    meetingPlace: '교육관 2층 유년부실',
    leader: '박선생 교사',
    contact: '010-2345-6789',
    image: 'gradient-2',
  },
  {
    id: 3,
    name: '주일학교',
    category: '교육',
    description: '유치부부터 고등부까지 연령별 교육',
    details: '영유아부터 고등학생까지 각 연령에 맞는 체계적인 성경 교육을 제공합니다. 경험 많은 교사진이 어린이와 청소년의 신앙 성장을 돕습니다.',
    meetingTime: '주일 오전 11시',
    meetingPlace: '교육관 전체',
    leader: '이교육 부장',
    contact: '010-3456-7890',
    image: 'gradient-3',
  },
  {
    id: 4,
    name: '찬양팀',
    category: '예배',
    description: '하나님께 영광 돌리는 찬양 사역',
    details: '예배를 인도하고 찬양으로 하나님을 높이는 사역입니다. 다양한 악기와 보컬로 구성되어 있으며, 정기적인 연습을 통해 은혜로운 찬양을 준비합니다.',
    meetingTime: '주일 오전 9시 / 연습: 토요일 오후 7시',
    meetingPlace: '본당',
    leader: '최찬양 팀장',
    contact: '010-4567-8901',
    image: 'gradient-4',
  },
  {
    id: 5,
    name: '선교부',
    category: '선교',
    description: '국내외 선교와 복음 전파',
    details: '국내외 선교지를 섬기고 복음을 전하는 사역입니다. 단기 선교팀 파송, 선교사 후원, 지역 사회 봉사 등 다양한 선교 활동을 펼칩니다.',
    meetingTime: '월 1회 셋째주 주일 오후 1시',
    meetingPlace: '본관 3층 선교실',
    leader: '정선교 부장',
    contact: '010-5678-9012',
    image: 'gradient-5',
  },
  {
    id: 6,
    name: '구역모임',
    category: '친교',
    description: '가정과 지역별 소그룹 교제',
    details: '지역별로 나뉘어 가정에서 함께 모여 말씀을 나누고 기도하며 교제하는 소그룹 모임입니다. 서로의 삶을 나누고 격려하는 시간입니다.',
    meetingTime: '매주 목요일 오후 7시 30분',
    meetingPlace: '각 구역별 가정',
    leader: '김구역 총무',
    contact: '010-6789-0123',
    image: 'gradient-6',
  },
  {
    id: 7,
    name: '여선교회',
    category: '친교',
    description: '자매들의 기도와 봉사 공동체',
    details: '교회의 자매 성도들이 함께 기도하고 봉사하며 영적 성장을 추구하는 모임입니다. 교회 내 다양한 섬김과 지역 사회 봉사를 감당합니다.',
    meetingTime: '매주 수요일 오전 10시',
    meetingPlace: '본관 2층 여선교회실',
    leader: '박여선 회장',
    contact: '010-7890-1234',
    image: 'gradient-7',
  },
  {
    id: 8,
    name: '남선교회',
    category: '친교',
    description: '형제들의 신앙과 섬김의 공동체',
    details: '교회의 형제 성도들이 함께 모여 말씀을 나누고 기도하며 교회를 섬기는 모임입니다. 교회 시설 관리와 봉사 활동을 주도합니다.',
    meetingTime: '매월 둘째주 토요일 오전 7시',
    meetingPlace: '본관 1층 남선교회실',
    leader: '이남선 회장',
    contact: '010-8901-2345',
    image: 'gradient-8',
  },
]

const categories = ['전체', '예배', '교육', '선교', '친교'] as const

export default function MinistryPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('전체')
  const [layout, setLayout] = useState<'zigzag' | 'grid'>('zigzag')

  // 카테고리별 필터링
  const filteredMinistries = selectedCategory === '전체'
    ? ministriesData
    : ministriesData.filter(m => m.category === selectedCategory)

  // 이미지 그라데이션 생성
  const getGradient = (image: string) => {
    const gradients: Record<string, string> = {
      'gradient-1': 'from-blue-400 to-blue-600',
      'gradient-2': 'from-green-400 to-green-600',
      'gradient-3': 'from-purple-400 to-purple-600',
      'gradient-4': 'from-pink-400 to-pink-600',
      'gradient-5': 'from-yellow-400 to-yellow-600',
      'gradient-6': 'from-red-400 to-red-600',
      'gradient-7': 'from-indigo-400 to-indigo-600',
      'gradient-8': 'from-teal-400 to-teal-600',
    }
    return gradients[image] || 'from-gray-400 to-gray-600'
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
                      <div className={`aspect-[4/3] bg-gradient-to-br ${getGradient(ministry.image)} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
                        <div className="text-center text-white">
                          <div className="text-8xl mb-4">{getIcon(ministry.category)}</div>
                          <div className="text-2xl font-bold">{ministry.name}</div>
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
                        {ministry.name}
                      </h3>
                      <p className="text-xl text-gray-700 font-medium mb-4">
                        {ministry.description}
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        {ministry.details}
                      </p>
                    </div>

                    {/* Meeting Info */}
                    <div className="bg-white rounded-xl p-6 shadow-md space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">🕐</div>
                        <div>
                          <div className="text-sm text-gray-500">모임 시간</div>
                          <div className="font-medium text-gray-800">{ministry.meetingTime}</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">📍</div>
                        <div>
                          <div className="text-sm text-gray-500">모임 장소</div>
                          <div className="font-medium text-gray-800">{ministry.meetingPlace}</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">👤</div>
                        <div>
                          <div className="text-sm text-gray-500">담당자</div>
                          <div className="font-medium text-gray-800">{ministry.leader}</div>
                        </div>
                      </div>
                      {ministry.contact && (
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">📞</div>
                          <div>
                            <div className="text-sm text-gray-500">연락처</div>
                            <div className="font-medium text-gray-800">{ministry.contact}</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 btn-primary text-center">
                        자세히 보기
                      </button>
                      <Link href="/contact" className="flex-1 btn-secondary text-center">
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
                    <div className={`aspect-[4/3] bg-gradient-to-br ${getGradient(ministry.image)} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      <div className="text-center text-white">
                        <div className="text-6xl mb-2">{getIcon(ministry.category)}</div>
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
                        {ministry.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {ministry.description}
                      </p>
                    </div>

                    {/* Compact Meeting Info */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 text-gray-700">
                        <span>🕐</span>
                        <span>{ministry.meetingTime}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-700">
                        <span>📍</span>
                        <span>{ministry.meetingPlace}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-700">
                        <span>👤</span>
                        <span>{ministry.leader}</span>
                      </div>
                    </div>

                    {/* Button */}
                    <button className="w-full btn-primary text-sm">
                      자세히 보기
                    </button>
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
