'use client'

import { useState, useEffect } from 'react'

export default function PopupModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [dontShowToday, setDontShowToday] = useState(false)

  useEffect(() => {
    // 쿠키 확인: 오늘 하루 보지 않기를 선택했는지
    const hidePopup = localStorage.getItem('hidePopup')
    const hideDate = localStorage.getItem('hidePopupDate')
    const today = new Date().toDateString()

    if (hidePopup === 'true' && hideDate === today) {
      setIsOpen(false)
    } else {
      // 페이지 로드 후 0.5초 뒤에 팝업 표시
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    if (dontShowToday) {
      localStorage.setItem('hidePopup', 'true')
      localStorage.setItem('hidePopupDate', new Date().toDateString())
    }
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          aria-label="닫기"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Image Section */}
        <div className="h-64 bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
          <div className="text-center text-white p-6">
            <div className="text-5xl mb-4">✝️</div>
            <h3 className="text-2xl font-bold mb-2">중요 공지</h3>
            <p className="text-sm text-gray-200">Important Notice</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h4 className="text-xl font-bold text-primary mb-4">
            2024년 새해 부흥회 안내
          </h4>
          
          <div className="space-y-3 text-gray-600 text-sm">
            <p>
              <strong className="text-primary">일시:</strong> 2024년 1월 15일(월) ~ 17일(수)
            </p>
            <p>
              <strong className="text-primary">시간:</strong> 매일 저녁 7시 30분
            </p>
            <p>
              <strong className="text-primary">장소:</strong> 본당 대예배실
            </p>
            <p>
              <strong className="text-primary">강사:</strong> 김은혜 목사 (서울중앙교회)
            </p>
          </div>

          <div className="mt-6 p-4 bg-beige rounded-md">
            <p className="text-sm text-gray-700">
              모든 성도님들의 많은 참여 부탁드립니다.
              <br />
              새해의 영적 각성과 부흥의 시간이 되시기를 기도합니다.
            </p>
          </div>

          <button
            onClick={handleClose}
            className="w-full mt-6 btn-primary"
          >
            확인
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 pb-4">
          <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={dontShowToday}
              onChange={(e) => setDontShowToday(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span>오늘 하루 보지 않기</span>
          </label>
        </div>
      </div>
    </div>
  )
}
