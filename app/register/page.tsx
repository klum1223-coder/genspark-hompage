'use client'

import { useState } from 'react'

interface FormData {
  name: string
  phone: string
  email: string
  type: 'newcomer' | 'event' | 'prayer' | 'counsel'
  message: string
  agreement: boolean
}

export default function OnlineRegistrationPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    type: 'newcomer',
    message: '',
    agreement: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.agreement) {
      setSubmitMessage('개인정보 수집 및 이용에 동의해주세요.')
      return
    }

    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      // 실제로는 API 엔드포인트로 전송
      // await fetch('/api/registration', { method: 'POST', body: JSON.stringify(formData) })
      
      // 임시: 콘솔에 출력
      console.log('등록 정보:', formData)
      
      // 성공 메시지
      setTimeout(() => {
        setSubmitMessage('✅ 등록이 완료되었습니다! 담당자가 확인 후 연락드리겠습니다.')
        setFormData({
          name: '',
          phone: '',
          email: '',
          type: 'newcomer',
          message: '',
          agreement: false,
        })
        setIsSubmitting(false)
      }, 1000)
    } catch (error) {
      setSubmitMessage('❌ 등록 중 오류가 발생했습니다. 다시 시도해주세요.')
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">온라인 등록</h1>
          <p className="text-xl text-gray-100">
            주성성결교회와 함께하고 싶으신가요?
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 등록 유형 */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  등록 유형 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 'newcomer', label: '👋 새가족', icon: '🆕' },
                    { value: 'event', label: '📅 행사 신청', icon: '🎉' },
                    { value: 'prayer', label: '🙏 기도 요청', icon: '✝️' },
                    { value: 'counsel', label: '💬 상담 신청', icon: '🤝' },
                  ].map((type) => (
                    <label
                      key={type.value}
                      className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.type === type.value
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={type.value}
                        checked={formData.type === type.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="text-3xl mb-2">{type.icon}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {type.label.split(' ')[1]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 이름 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="홍길동"
                />
              </div>

              {/* 연락처 */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="010-1234-5678"
                />
              </div>

              {/* 이메일 */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="example@email.com"
                />
              </div>

              {/* 내용 */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  내용
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="궁금하신 점이나 요청사항을 자유롭게 작성해주세요."
                />
              </div>

              {/* 개인정보 동의 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreement"
                    checked={formData.agreement}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">
                    <span className="font-bold text-gray-900">개인정보 수집 및 이용에 동의합니다.</span>
                    <br />
                    <span className="text-xs text-gray-600 mt-1 block">
                      수집항목: 이름, 연락처, 이메일 | 이용목적: 교회 등록 및 연락 | 보유기간: 1년
                    </span>
                  </span>
                </label>
              </div>

              {/* 제출 메시지 */}
              {submitMessage && (
                <div className={`p-4 rounded-lg ${
                  submitMessage.includes('✅') 
                    ? 'bg-green-50 text-green-800' 
                    : 'bg-red-50 text-red-800'
                }`}>
                  {submitMessage}
                </div>
              )}

              {/* 제출 버튼 */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-light transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '등록 중...' : '등록하기'}
              </button>
            </form>
          </div>

          {/* 안내 사항 */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3 flex items-center">
                <span className="text-2xl mr-2">📞</span>
                직접 문의
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                전화로 직접 문의하실 수 있습니다.
              </p>
              <p className="font-medium text-primary">02-1234-5678</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3 flex items-center">
                <span className="text-2xl mr-2">⏰</span>
                처리 시간
              </h3>
              <p className="text-sm text-gray-600">
                평일 오전 9시 ~ 오후 6시<br />
                1~2일 이내 연락드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
