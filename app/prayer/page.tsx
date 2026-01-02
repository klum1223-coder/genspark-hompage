'use client'

import { useState } from 'react'

interface PrayerRequest {
  id: number
  author: string
  title: string
  content: string
  date: string
  prayCount: number
  category: '개인' | '가정' | '건강' | '직장' | '교회' | '기타'
  isPrivate: boolean
}

export default function PrayerPage() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([
    {
      id: 1,
      author: '홍길동',
      title: '가족의 건강을 위해',
      content: '가족 모두가 건강하게 지낼 수 있도록 기도 부탁드립니다.',
      date: '2024-12-28',
      prayCount: 15,
      category: '가정',
      isPrivate: false,
    },
    {
      id: 2,
      author: '김영희',
      title: '취업을 위한 기도',
      content: '하나님의 뜻 가운데 좋은 직장을 구할 수 있도록 기도해주세요.',
      date: '2024-12-27',
      prayCount: 23,
      category: '직장',
      isPrivate: false,
    },
    {
      id: 3,
      author: '익명',
      title: '개인적인 어려움',
      content: '비공개 기도 제목입니다.',
      date: '2024-12-26',
      prayCount: 8,
      category: '개인',
      isPrivate: true,
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newPrayer, setNewPrayer] = useState({
    author: '',
    title: '',
    content: '',
    category: '개인' as PrayerRequest['category'],
    isPrivate: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const prayer: PrayerRequest = {
      id: prayers.length + 1,
      ...newPrayer,
      date: new Date().toISOString().split('T')[0],
      prayCount: 0,
    }

    setPrayers([prayer, ...prayers])
    setNewPrayer({
      author: '',
      title: '',
      content: '',
      category: '개인',
      isPrivate: false,
    })
    setShowForm(false)
    alert('기도 제목이 등록되었습니다. 성도님들이 함께 기도하겠습니다.')
  }

  const handlePray = (id: number) => {
    setPrayers(prayers.map(p => 
      p.id === id ? { ...p, prayCount: p.prayCount + 1 } : p
    ))
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      '개인': 'bg-blue-100 text-blue-800',
      '가정': 'bg-green-100 text-green-800',
      '건강': 'bg-red-100 text-red-800',
      '직장': 'bg-yellow-100 text-yellow-800',
      '교회': 'bg-purple-100 text-purple-800',
      '기타': 'bg-gray-100 text-gray-800',
    }
    return colors[category] || colors['기타']
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">기도 요청</h1>
          <p className="text-xl text-purple-100 mb-6">
            서로 기도하며 함께 기도하는 공동체
          </p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-8 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition-colors"
          >
            {showForm ? '작성 취소' : '+ 기도 제목 등록'}
          </button>
        </div>
      </section>

      <div className="section-padding">
        <div className="container-custom max-w-6xl">
          {/* 기도 제목 등록 폼 */}
          {showForm && (
            <div className="mb-8 bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-primary mb-6">기도 제목 등록</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newPrayer.author}
                      onChange={(e) => setNewPrayer({...newPrayer, author: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="홍길동"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      분류 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={newPrayer.category}
                      onChange={(e) => setNewPrayer({...newPrayer, category: e.target.value as PrayerRequest['category']})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="개인">개인</option>
                      <option value="가정">가정</option>
                      <option value="건강">건강</option>
                      <option value="직장">직장</option>
                      <option value="교회">교회</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    제목 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newPrayer.title}
                    onChange={(e) => setNewPrayer({...newPrayer, title: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="기도 제목을 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    내용 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={newPrayer.content}
                    onChange={(e) => setNewPrayer({...newPrayer, content: e.target.value})}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="기도 제목에 대한 상세 내용을 작성해주세요"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newPrayer.isPrivate}
                      onChange={(e) => setNewPrayer({...newPrayer, isPrivate: e.target.checked})}
                      className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">
                      비공개로 등록 (제목과 분류만 표시됩니다)
                    </span>
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    등록하기
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-8 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    취소
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 기도 제목 목록 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                기도 제목 <span className="text-purple-600">({prayers.length})</span>
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>🙏</span>
                <span>함께 기도해요</span>
              </div>
            </div>

            {prayers.map((prayer) => (
              <div key={prayer.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(prayer.category)}`}>
                        {prayer.category}
                      </span>
                      {prayer.isPrivate && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          🔒 비공개
                        </span>
                      )}
                      <span className="text-sm text-gray-500">{prayer.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {prayer.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {prayer.isPrivate ? '비공개 기도 제목입니다.' : prayer.content}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>작성자: {prayer.author}</span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <span>🙏</span>
                        <span>{prayer.prayCount}명이 기도했습니다</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handlePray(prayer.id)}
                    className="px-6 py-2 bg-purple-50 text-purple-600 font-medium rounded-lg hover:bg-purple-100 transition-colors flex items-center space-x-2"
                  >
                    <span>🙏</span>
                    <span>기도합니다</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 안내 사항 */}
          <div className="mt-12 bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-3 text-purple-900">💡 기도 요청 게시판 안내</h3>
            <ul className="space-y-2 text-sm text-purple-800">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>성도님들의 기도 제목을 나누고 함께 기도하는 공간입니다.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>비공개 기도 제목은 제목과 분류만 표시되며, 내용은 목회자만 확인합니다.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>긴급 기도 제목은 교회 사무실로 직접 연락 주시기 바랍니다. (02-1234-5678)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>모든 기도 제목은 주일 기도회에서 함께 기도합니다.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
