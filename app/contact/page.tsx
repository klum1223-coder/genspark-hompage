'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 폼 제출 로직
    alert('문의가 접수되었습니다. 감사합니다!')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-beige py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            오시는 길
          </h1>
          <p className="text-lg text-gray-600">
            우리 교회로 오시는 길을 안내합니다
          </p>
        </div>
      </section>

      {/* Map & Info */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="order-2 lg:order-1">
              <div className="card overflow-hidden h-[400px] lg:h-full">
                {/* 네이버 지도 */}
                <iframe 
                  src="https://map.naver.com/p/entry/place/1279788476?c=15.00,0,0,0,dh" 
                  width="100%" 
                  height="100%" 
                  style={{border: 0}}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="주성성결교회 위치"
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-primary mb-8">교회 정보</h2>
              
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl">
                    📍
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-primary mb-1">주소</h3>
                    <p className="text-gray-700">충북 청주시 흥덕구 봉명로219번길 24, 2층</p>
                    <p className="text-sm text-gray-500 mt-1">(우편번호: 06234)</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl">
                    📞
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-primary mb-1">전화번호</h3>
                    <p className="text-gray-700">010-8986-3965</p>
                    <p className="text-sm text-gray-500 mt-1">평일 09:00 - 18:00</p>
                  </div>
                </div>

                {/* Fax */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl">
                    📠
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-primary mb-1">팩스</h3>
                    <p className="text-gray-700">043-231-3530</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl">
                    ✉️
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-primary mb-1">이메일</h3>
                    <p className="text-gray-700">klum3@naver.com</p>
                  </div>
                </div>
              </div>

              {/* Transportation */}
              <div className="mt-8 p-6 bg-beige rounded-lg">
                <h3 className="font-bold text-lg text-primary mb-4">대중교통 안내</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <strong className="text-primary">🚌 버스:</strong>
                    <p className="ml-6 mt-1">간선버스: 146, 301, 740</p>
                    <p className="ml-6">지선버스: 3411, 4412</p>
                  </div>
                  <div>
                    <strong className="text-primary">🚗 자가용:</strong>
                    <p className="ml-6 mt-1">지하 주차장 이용 가능 (100대)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Worship Times */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">예배 시간</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { day: '주일 예배', times: ['1부 예배: 오전 09:00', '2부 예배: 오전 11:00', '찬양예배: 오후 14:00'] },
                { day: '새벽 기도회', times: ['월-토: 오전 05:30'] },
                { day: '수요 예배', times: ['수요일: 오후 19:30'] },
                { day: '금요 기도회', times: ['금요일: 오후 19:30'] },
              ].map((item, index) => (
                <div key={index} className="card p-6">
                  <h3 className="text-xl font-bold text-primary mb-4">{item.day}</h3>
                  <ul className="space-y-2">
                    {item.times.map((time, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-gray-700">
                        <span className="text-primary">•</span>
                        <span>{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">문의하기</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-gray-600">궁금한 사항이나 문의사항을 남겨주세요</p>
            </div>

            <form onSubmit={handleSubmit} className="card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    연락처
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    제목 *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  문의 내용 *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                ></textarea>
              </div>

              <button type="submit" className="w-full btn-primary">
                문의하기
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
