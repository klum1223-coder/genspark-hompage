'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

// 앨범 데이터 타입 정의 (나중에 CMS로 교체 가능)
interface Album {
  id: number
  title: string
  date: string
  year: number
  category: '전체' | '예배' | '행사' | '선교' | '교육' | '친교'
  imageCount: number
  coverImage: string
  images: string[]
  description?: string
}

// 임시 앨범 데이터
const albumsData: Album[] = [
  {
    id: 1,
    title: '2024 여름수련회',
    date: '2024.07.15',
    year: 2024,
    category: '행사',
    imageCount: 12,
    coverImage: 'gradient-1',
    images: Array(12).fill('gradient-1'),
    description: '청소년들과 함께한 은혜로운 여름수련회',
  },
  {
    id: 2,
    title: '성탄절 축하 예배',
    date: '2023.12.24',
    year: 2023,
    category: '예배',
    imageCount: 18,
    coverImage: 'gradient-2',
    images: Array(18).fill('gradient-2'),
    description: '주님의 탄생을 축하하는 성탄 예배',
  },
  {
    id: 3,
    title: '부활절 연합예배',
    date: '2024.03.31',
    year: 2024,
    category: '예배',
    imageCount: 15,
    coverImage: 'gradient-3',
    images: Array(15).fill('gradient-3'),
    description: '부활의 기쁨을 나누는 예배',
  },
  {
    id: 4,
    title: '필리핀 선교 여행',
    date: '2024.02.10',
    year: 2024,
    category: '선교',
    imageCount: 24,
    coverImage: 'gradient-4',
    images: Array(24).fill('gradient-4'),
    description: '필리핀 현지 선교 사역',
  },
  {
    id: 5,
    title: '청년부 수련회',
    date: '2024.05.20',
    year: 2024,
    category: '행사',
    imageCount: 20,
    coverImage: 'gradient-5',
    images: Array(20).fill('gradient-5'),
    description: '청년들의 믿음을 세우는 시간',
  },
  {
    id: 6,
    title: '어린이 여름성경학교',
    date: '2023.08.10',
    year: 2023,
    category: '교육',
    imageCount: 30,
    coverImage: 'gradient-6',
    images: Array(30).fill('gradient-6'),
    description: '어린이들과 함께한 VBS',
  },
  {
    id: 7,
    title: '가을 감사축제',
    date: '2023.10.15',
    year: 2023,
    category: '행사',
    imageCount: 22,
    coverImage: 'gradient-7',
    images: Array(22).fill('gradient-7'),
    description: '추수감사절 축하 행사',
  },
  {
    id: 8,
    title: '지역 봉사 활동',
    date: '2024.04.20',
    year: 2024,
    category: '친교',
    imageCount: 16,
    coverImage: 'gradient-8',
    images: Array(16).fill('gradient-8'),
    description: '이웃사랑을 실천하는 봉사',
  },
  {
    id: 9,
    title: '신년 부흥회',
    date: '2024.01.15',
    year: 2024,
    category: '예배',
    imageCount: 14,
    coverImage: 'gradient-9',
    images: Array(14).fill('gradient-9'),
    description: '새해를 여는 부흥회',
  },
  {
    id: 10,
    title: '구역 야유회',
    date: '2023.09.25',
    year: 2023,
    category: '친교',
    imageCount: 18,
    coverImage: 'gradient-10',
    images: Array(18).fill('gradient-10'),
    description: '구역별 친목 도모',
  },
]

const categories = ['전체', '예배', '행사', '선교', '교육', '친교'] as const
const years = [2024, 2023, 2022]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('전체')
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  // 필터링된 앨범
  const filteredAlbums = albumsData.filter((album) => {
    const matchesCategory = selectedCategory === '전체' || album.category === selectedCategory
    const matchesYear = selectedYear === 'all' || album.year === selectedYear
    const matchesSearch = album.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesYear && matchesSearch
  })

  // 그라데이션 생성
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
      'gradient-9': 'from-orange-400 to-orange-600',
      'gradient-10': 'from-cyan-400 to-cyan-600',
    }
    return gradients[image] || 'from-gray-400 to-gray-600'
  }

  // 카테고리 아이콘
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      '전체': '📷',
      '예배': '🙏',
      '행사': '🎉',
      '선교': '✈️',
      '교육': '📚',
      '친교': '🤝',
    }
    return icons[category] || '📷'
  }

  // 앨범 클릭 핸들러
  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album)
  }

  // 앨범 상세 닫기
  const handleCloseAlbum = () => {
    setSelectedAlbum(null)
  }

  // 사진 클릭 핸들러
  const handlePhotoClick = (index: number) => {
    setPhotoIndex(index)
    setLightboxOpen(true)
  }

  // 라이트박스용 이미지 데이터
  const lightboxSlides = selectedAlbum?.images.map((img, idx) => ({
    src: `https://via.placeholder.com/1200x800/${getGradient(img).split('-')[1]}/${getGradient(img).split('-')[2]}/FFFFFF?text=${selectedAlbum.title}+${idx + 1}`,
  })) || []

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            교회 사역
          </h1>
          <p className="text-lg md:text-xl text-gray-100 animate-fade-in-delay">
            함께한 소중한 순간들을 나눕니다
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="bg-white border-b sticky top-20 z-40 shadow-sm">
        <div className="container-custom py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Category Filter */}
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-700 mb-3">카테고리</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-primary text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-1">{getCategoryIcon(category)}</span>
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Year Filter */}
            <div className="lg:w-48">
              <h3 className="text-sm font-medium text-gray-700 mb-3">연도</h3>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">전체</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="lg:w-64">
              <h3 className="text-sm font-medium text-gray-700 mb-3">검색</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="앨범명 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Album Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Results Info */}
          <div className="mb-8">
            <p className="text-gray-600">
              총 <span className="font-bold text-primary">{filteredAlbums.length}</span>개의 앨범
            </p>
          </div>

          {filteredAlbums.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-gray-600 mb-2">검색 결과가 없습니다</p>
              <p className="text-gray-500">다른 검색어나 필터를 시도해보세요</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredAlbums.map((album) => (
                <article
                  key={album.id}
                  onClick={() => handleAlbumClick(album)}
                  className="card overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  {/* Cover Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${getGradient(
                        album.coverImage
                      )} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                    >
                      <div className="text-white text-center">
                        <div className="text-4xl md:text-5xl mb-2">
                          {getCategoryIcon(album.category)}
                        </div>
                      </div>
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-3xl mb-2">🔍</div>
                        <p className="text-sm font-medium">앨범 보기</p>
                      </div>
                    </div>
                    {/* Image Count Badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary">
                      📷 {album.imageCount}장
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">{album.date}</span>
                      <span className="text-xs bg-beige px-2 py-1 rounded-full text-primary">
                        {album.category}
                      </span>
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-primary line-clamp-2 group-hover:text-primary-light transition-colors">
                      {album.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Album Detail Modal */}
      {selectedAlbum && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative bg-white w-full max-w-6xl m-4 rounded-2xl shadow-2xl animate-fade-in">
            {/* Close Button */}
            <button
              onClick={handleCloseAlbum}
              className="sticky top-4 right-4 float-right z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Album Header */}
            <div className="p-6 md:p-8 border-b">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                    {selectedAlbum.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <span>📅</span>
                      <span>{selectedAlbum.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>📷</span>
                      <span>{selectedAlbum.imageCount}장</span>
                    </span>
                    <span className="px-3 py-1 bg-beige rounded-full text-primary font-medium">
                      {selectedAlbum.category}
                    </span>
                  </div>
                </div>
              </div>
              {selectedAlbum.description && (
                <p className="text-gray-600">{selectedAlbum.description}</p>
              )}
            </div>

            {/* Photo Grid */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {selectedAlbum.images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => handlePhotoClick(index)}
                    className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${getGradient(
                        img
                      )} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white text-center">
                        <div className="text-3xl">📸</div>
                        <div className="text-xs mt-1">{index + 1}</div>
                      </div>
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-2xl">🔍</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={photoIndex}
      />

      {/* Upload Info */}
      <section className="section-padding bg-beige">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-5xl mb-4">📤</div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              사진 업로드 안내
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              교회 행사나 활동 사진을 공유하고 싶으시면
              <br />
              아래 이메일로 사진을 보내주세요.
              <br />
              <span className="text-sm text-gray-500 mt-2 inline-block">
                (JPG, PNG 형식, 최대 10MB)
              </span>
            </p>
            <a href="mailto:gallery@church.com" className="btn-primary inline-block">
              📧 gallery@church.com
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
