'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface NewsItem {
  id: string
  title: string
  category: string
  date: string
  excerpt: string
  content: string
}

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('전체')
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)

  useEffect(() => {
    // localStorage에서 데이터 로드
    const loadData = () => {
      const savedNews = localStorage.getItem('news_items')
      if (savedNews) {
        setNewsItems(JSON.parse(savedNews))
      }
    }

    loadData()
  }, [])

  const categories = ['전체', ...Array.from(new Set(newsItems.map(n => n.category)))]
  
  const filteredNews = selectedCategory === '전체' 
    ? newsItems 
    : newsItems.filter(n => n.category === selectedCategory)

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            교회 소식
          </h1>
          <p className="text-lg text-gray-200">
            주성성결교회의 소식과 공지사항을 전합니다
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

          {/* News List */}
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredNews.map((news) => (
                <article 
                  key={news.id} 
                  className="card p-6 hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedNews(news)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        news.category === '공지' ? 'bg-red-100 text-red-700' :
                        news.category === '행사' ? 'bg-blue-100 text-blue-700' :
                        news.category === '예배' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {news.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(news.date).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-primary mb-3 hover:text-primary-light transition-colors">
                    {news.title}
                  </h2>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {news.excerpt}
                  </p>
                  
                  <button className="text-primary hover:text-primary-light font-medium text-sm flex items-center space-x-1">
                    <span>자세히 보기</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                등록된 소식이 없습니다
              </h3>
              <p className="text-gray-500 mb-6">
                관리자 페이지에서 교회 소식을 추가해주세요
              </p>
              <Link href="/admin" className="btn-primary">
                관리자 페이지로 이동
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* News Detail Modal */}
      {selectedNews && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedNews(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedNews.category === '공지' ? 'bg-red-100 text-red-700' :
                  selectedNews.category === '행사' ? 'bg-blue-100 text-blue-700' :
                  selectedNews.category === '예배' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {selectedNews.category}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(selectedNews.date).toLocaleDateString('ko-KR')}
                </span>
              </div>
              <button
                onClick={() => setSelectedNews(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <h2 className="text-3xl font-bold text-primary mb-6">
              {selectedNews.title}
            </h2>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedNews.content}
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <button
                onClick={() => setSelectedNews(null)}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
