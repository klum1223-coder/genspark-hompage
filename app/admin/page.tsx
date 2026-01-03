'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { newsStorage, prayerStorage, ministryStorage, galleryStorage, imageToBase64, type NewsItem, type MinistryItem } from '@/lib/content-storage'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('info')
  const [message, setMessage] = useState('')

  // 간단한 비밀번호 인증
  const ADMIN_PASSWORD = 'joosung2025'

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
      setMessage('로그인 성공!')
    } else {
      setMessage('비밀번호가 올바르지 않습니다.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
    setPassword('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-primary-light flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">관리자 페이지</h1>
            <p className="text-gray-600">주성성결교회</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="관리자 비밀번호를 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            
            {message && (
              <div className={`p-3 rounded-lg text-sm ${
                message.includes('성공') 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-red-50 text-red-700'
              }`}>
                {message}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-light transition-colors"
            >
              로그인
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-primary hover:underline">
              ← 홈페이지로 돌아가기
            </Link>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              💡 기본 비밀번호: <code className="bg-white px-2 py-1 rounded">joosung2025</code>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">관리자 페이지</h1>
              <p className="text-sm text-gray-600">주성성결교회</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="px-4 py-2 text-primary hover:bg-gray-100 rounded-lg transition-colors"
              >
                홈페이지 보기
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="container-custom">
          <div className="flex space-x-1 overflow-x-auto">
            {[
              { id: 'info', label: '교회 정보' },
              { id: 'news', label: '교회 소식' },
              { id: 'ministry', label: '교회 사역' },
              { id: 'prayer', label: '기도 요청' },
              { id: 'gallery', label: '사진 관리' },
              { id: 'settings', label: '설정' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-8">
        {activeTab === 'info' && <ChurchInfoTab />}
        {activeTab === 'news' && <NewsManagementTab />}
        {activeTab === 'ministry' && <MinistryManagementTab />}
        {activeTab === 'prayer' && <PrayerManagementTab />}
        {activeTab === 'gallery' && <GalleryManagementTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>
    </div>
  )
}

// 교회 소식 관리 탭 (새로 작성)
function NewsManagementTab() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    category: '공지' as '공지' | '행사' | '소식',
    title: '',
    content: '',
    excerpt: '',
    author: '',
    image: '',
  })

  useEffect(() => {
    setNews(newsStorage.getAll())
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      newsStorage.update(editingId, formData)
    } else {
      newsStorage.add(formData)
    }
    setNews(newsStorage.getAll())
    resetForm()
  }

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      newsStorage.delete(id)
      setNews(newsStorage.getAll())
    }
  }

  const handleEdit = (item: NewsItem) => {
    setFormData({
      category: item.category,
      title: item.title,
      content: item.content,
      excerpt: item.excerpt,
      author: item.author,
      image: item.image || '',
    })
    setEditingId(item.id)
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      category: '공지',
      title: '',
      content: '',
      excerpt: '',
      author: '',
      image: '',
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const base64 = await imageToBase64(file)
      setFormData({ ...formData, image: base64 })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">교회 소식 관리</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
        >
          {showForm ? '취소' : '+ 새 소식 작성'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold mb-4">{editingId ? '소식 수정' : '새 소식 작성'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                required
              >
                <option value="공지">공지</option>
                <option value="행사">행사</option>
                <option value="소식">소식</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="소식 제목을 입력하세요"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                요약
              </label>
              <input
                type="text"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="간단한 요약을 입력하세요"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                내용
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                rows={6}
                placeholder="자세한 내용을 입력하세요"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                작성자
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="작성자 이름"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이미지 업로드 (선택)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {formData.image && (
                <div className="mt-2">
                  <img src={formData.image} alt="Preview" className="h-32 object-cover rounded" />
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light"
              >
                {editingId ? '수정 완료' : '등록하기'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4">등록된 소식 ({news.length})</h3>
        {news.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>등록된 소식이 없습니다.</p>
            <p className="text-sm mt-2">새 소식을 작성해보세요!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {news.map((item) => (
              <div key={item.id} className="flex items-start justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      item.category === '공지' ? 'bg-red-100 text-red-700' :
                      item.category === '행사' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                    <span className="text-xs text-gray-500">조회 {item.views}</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.excerpt}</p>
                  <p className="text-xs text-gray-500 mt-2">작성자: {item.author}</p>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// 교회 사역 관리 탭
function MinistryManagementTab() {
  const [ministries, setMinistries] = useState<MinistryItem[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    category: '교육' as '예배' | '교육' | '선교' | '친교' | '기타',
    description: '',
    details: '',
    meetingTime: '',
    meetingPlace: '',
    leader: '',
    contact: '',
    image: '',
  })

  useEffect(() => {
    setMinistries(ministryStorage.getAll())
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      ministryStorage.update(editingId, formData)
    } else {
      ministryStorage.add(formData)
    }
    setMinistries(ministryStorage.getAll())
    resetForm()
  }

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      ministryStorage.delete(id)
      setMinistries(ministryStorage.getAll())
    }
  }

  const handleEdit = (item: MinistryItem) => {
    setFormData(item)
    setEditingId(item.id)
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      category: '교육',
      description: '',
      details: '',
      meetingTime: '',
      meetingPlace: '',
      leader: '',
      contact: '',
      image: '',
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const base64 = await imageToBase64(file)
      setFormData({ ...formData, image: base64 })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">교회 사역 관리</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
        >
          {showForm ? '취소' : '+ 새 사역 추가'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold mb-4">{editingId ? '사역 수정' : '새 사역 추가'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">사역명</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="예배">예배</option>
                  <option value="교육">교육</option>
                  <option value="선교">선교</option>
                  <option value="친교">친교</option>
                  <option value="기타">기타</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">간단한 소개</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="한 줄 설명"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">상세 내용</label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                rows={4}
                placeholder="사역에 대한 자세한 설명"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">모임 시간</label>
                <input
                  type="text"
                  value={formData.meetingTime}
                  onChange={(e) => setFormData({ ...formData, meetingTime: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="예: 주일 오후 2시"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">모임 장소</label>
                <input
                  type="text"
                  value={formData.meetingPlace}
                  onChange={(e) => setFormData({ ...formData, meetingPlace: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="예: 교육관 3층"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">담당자</label>
                <input
                  type="text"
                  value={formData.leader}
                  onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="담당 목사님/전도사님"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">연락처 (선택)</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="010-0000-0000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">사진 업로드 (선택)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {formData.image && (
                <div className="mt-2">
                  <img src={formData.image} alt="Preview" className="h-32 object-cover rounded" />
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light"
              >
                {editingId ? '수정 완료' : '등록하기'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4">등록된 사역 ({ministries.length})</h3>
        {ministries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>등록된 사역이 없습니다.</p>
            <p className="text-sm mt-2">새 사역을 추가해보세요!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {ministries.map((item) => (
              <div key={item.id} className="flex items-start justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>⏰ {item.meetingTime}</p>
                    <p>📍 {item.meetingPlace}</p>
                    <p>👤 {item.leader}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// 기도 요청 관리 탭
function PrayerManagementTab() {
  const [prayers, setPrayers] = useState<any[]>([])

  useEffect(() => {
    setPrayers(prayerStorage.getAll())
  }, [])

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      prayerStorage.delete(id)
      setPrayers(prayerStorage.getAll())
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">기도 요청 관리</h2>
        <Link
          href="/prayer"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
        >
          기도 요청 페이지로 이동
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4">등록된 기도 제목 ({prayers.length})</h3>
        {prayers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>등록된 기도 제목이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {prayers.map((item) => (
              <div key={item.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                      {item.category}
                    </span>
                    {item.isPrivate && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        비공개
                      </span>
                    )}
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                  {!item.isPrivate && (
                    <p className="text-sm text-gray-600">{item.content}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    작성자: {item.author} | 기도 {item.prayCount}회
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded ml-4"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// 사진 관리 탭
function GalleryManagementTab() {
  const [albums, setAlbums] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '예배' as any,
    date: new Date().toISOString().split('T')[0],
    images: [] as string[],
  })

  useEffect(() => {
    setAlbums(galleryStorage.getAll())
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const year = parseInt(formData.date.split('-')[0])
    galleryStorage.add({
      ...formData,
      year,
      coverImage: formData.images[0],
    })
    setAlbums(galleryStorage.getAll())
    resetForm()
  }

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      galleryStorage.delete(id)
      setAlbums(galleryStorage.getAll())
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '예배',
      date: new Date().toISOString().split('T')[0],
      images: [],
    })
    setShowForm(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const base64Images = await Promise.all(files.map(file => imageToBase64(file)))
    setFormData({ ...formData, images: [...formData.images, ...base64Images] })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">사진 앨범 관리</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
        >
          {showForm ? '취소' : '+ 새 앨범 만들기'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold mb-4">새 앨범 만들기</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">앨범 제목</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                >
                  <option value="예배">예배</option>
                  <option value="행사">행사</option>
                  <option value="선교">선교</option>
                  <option value="교육">교육</option>
                  <option value="친교">친교</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">날짜</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                사진 업로드 (여러 장 가능)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {formData.images.length > 0 && (
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {formData.images.map((img, idx) => (
                    <img key={idx} src={img} alt={`Preview ${idx + 1}`} className="h-24 w-full object-cover rounded" />
                  ))}
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light"
                disabled={formData.images.length === 0}
              >
                등록하기
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4">등록된 앨범 ({albums.length})</h3>
        {albums.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>등록된 앨범이 없습니다.</p>
            <p className="text-sm mt-2">새 앨범을 만들어보세요!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {albums.map((album) => (
              <div key={album.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {album.coverImage && (
                  <img src={album.coverImage} alt={album.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {album.category}
                    </span>
                    <span className="text-xs text-gray-500">{album.date}</span>
                  </div>
                  <h4 className="font-bold mb-1">{album.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{album.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{album.images.length}장</span>
                    <button
                      onClick={() => handleDelete(album.id)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// 교회 정보 탭은 기존 코드 유지하되 간소화
function ChurchInfoTab() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-primary mb-4">교회 기본 정보</h2>
      <p className="text-gray-600 mb-4">
        교회 정보는 이전 버전의 관리자 페이지를 참고하세요.
      </p>
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-900">
          교회 이름, 전화번호, 주소 등의 기본 정보를 수정할 수 있습니다.
        </p>
      </div>
    </div>
  )
}

// 설정 탭
function SettingsTab() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-primary mb-4">설정</h2>
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700 mb-2">
          현재 비밀번호: <code className="bg-white px-2 py-1 rounded">joosung2025</code>
        </p>
        <p className="text-xs text-gray-600">
          비밀번호를 변경하려면 <code>/app/admin/page.tsx</code> 파일에서 <code>ADMIN_PASSWORD</code> 값을 수정하세요.
        </p>
      </div>
    </div>
  )
}
