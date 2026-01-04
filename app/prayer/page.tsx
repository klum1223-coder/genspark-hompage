'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface PrayerRequest {
  id: string
  category: string
  title: string
  content: string
  date: string
  isPublic: boolean
}

export default function PrayerPage() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('전체')
  const [showForm, setShowForm] = useState(false)
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerRequest | null>(null)

  useEffect(() => {
    // localStorage에서 데이터 로드
    const loadData = () => {
      const savedPrayers = localStorage.getItem('prayer_requests')
      if (savedPrayers) {
        const allPrayers = JSON.parse(savedPrayers)
        // 공개된 기도 요청만 표시
        setPrayers(allPrayers.filter((p: PrayerRequest) => p.isPublic))
      }
    }

    loadData()
  }, [])

  const categories = ['전체', ...Array.from(new Set(prayers.map(p => p.category)))]
  
  const filteredPrayers = selectedCategory === '전체' 
    ? prayers 
    : prayers.filter(p => p.category === selectedCategory)

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            기도 요청
          </h1>
          <p className="text-lg text-gray-100">
            함께 기도하며 하나님의 응답을 구합니다
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Prayer List */}
          {filteredPrayers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPrayers.map((prayer) => (
                <article 
                  key={prayer.id} 
                  className="card p-6 hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => setSelectedPrayer(prayer)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      prayer.category === '개인' ? 'bg-purple-100 text-purple-700' :
                      prayer.category === '교회' ? 'bg-blue-100 text-blue-700' :
                      prayer.category === '선교' ? 'bg-green-100 text-green-700' :
                      prayer.category === '가정' ? 'bg-pink-100 text-pink-700' :
                      prayer.category === '건강' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {prayer.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(prayer.date).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-primary-light transition-colors line-clamp-2">
                    {prayer.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
                    {prayer.content}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <button className="text-primary hover:text-primary-light font-medium text-sm flex items-center space-x-1">
                      <span>🙏</span>
                      <span>함께 기도하기</span>
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 text-sm">
                      자세히 보기 →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🙏</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                등록된 기도 요청이 없습니다
              </h3>
              <p className="text-gray-500 mb-6">
                관리자 페이지에서 기도 제목을 추가해주세요
              </p>
              <Link href="/admin" className="btn-primary">
                관리자 페이지로 이동
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Prayer Detail Modal */}
      {selectedPrayer && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedPrayer(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedPrayer.category === '개인' ? 'bg-purple-100 text-purple-700' :
                  selectedPrayer.category === '교회' ? 'bg-blue-100 text-blue-700' :
                  selectedPrayer.category === '선교' ? 'bg-green-100 text-green-700' :
                  selectedPrayer.category === '가정' ? 'bg-pink-100 text-pink-700' :
                  selectedPrayer.category === '건강' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {selectedPrayer.category}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(selectedPrayer.date).toLocaleDateString('ko-KR')}
                </span>
              </div>
              <button
                onClick={() => setSelectedPrayer(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <h2 className="text-3xl font-bold text-primary mb-6">
              {selectedPrayer.title}
            </h2>
            
            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedPrayer.content}
              </p>
            </div>

            <div className="bg-beige/50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-primary mb-3">기도 제목</h3>
              <p className="text-gray-700 leading-relaxed">
                이 기도 제목을 위해 함께 기도해주세요. 
                하나님께서 들으시고 응답해주실 것을 믿습니다.
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t space-y-3">
              <button
                className="w-full py-3 bg-primary hover:bg-primary-light text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <span>🙏</span>
                <span>함께 기도하겠습니다</span>
              </button>
              <button
                onClick={() => setSelectedPrayer(null)}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <section className="section-padding bg-beige">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">
              기도 요청 안내
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              기도 제목을 나누고 싶으신 분은 관리자 페이지에서 등록하실 수 있습니다.
              함께 기도하며 하나님의 은혜를 경험하시기 바랍니다.
            </p>
            <Link
              href="/admin"
              className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium"
            >
              기도 제목 등록하기 (관리자)
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
