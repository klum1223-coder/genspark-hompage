'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { activePopup, shouldShowPopup, hidePopupForToday, cleanupOldPopupData } from '@/lib/popup-data'

export default function PopupModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [dontShowToday, setDontShowToday] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // 오래된 팝업 데이터 정리
    cleanupOldPopupData()

    // 팝업 활성화 상태 및 표시 여부 확인
    if (activePopup.isActive && shouldShowPopup(activePopup.id)) {
      // 페이지 로드 후 0.5초 뒤에 팝업 표시
      const timer = setTimeout(() => {
        setIsOpen(true)
        setIsAnimating(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    if (dontShowToday) {
      hidePopupForToday(activePopup.id)
    }
    setIsAnimating(false)
    setTimeout(() => setIsOpen(false), 300) // 애니메이션 후 닫기
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-xl shadow-2xl max-w-[500px] w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-400 hover:text-gray-600 transition-colors shadow-md"
          aria-label="닫기"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Section (Optional) */}
        {activePopup.image && (
          <div className="relative h-48 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
            {/* 실제 이미지가 있을 경우 */}
            {/* <Image src={activePopup.image} alt={activePopup.title} fill className="object-cover" /> */}
            
            {/* 임시 플레이스홀더 */}
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-6xl mb-3">✝️</div>
                <p className="text-sm font-medium opacity-90">교회 이름</p>
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-6 md:p-8">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 pr-8">
            {activePopup.title}
          </h2>

          {/* Content (HTML Support) */}
          <div
            className="popup-content mb-6"
            dangerouslySetInnerHTML={{ __html: activePopup.content }}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {activePopup.linkUrl && activePopup.linkText && (
              <Link
                href={activePopup.linkUrl}
                onClick={handleClose}
                className="flex-1 btn-primary text-center"
              >
                {activePopup.linkText}
              </Link>
            )}
            <button
              onClick={handleClose}
              className={`flex-1 px-6 py-3 rounded-md border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors ${
                !activePopup.linkUrl ? 'btn-primary' : ''
              }`}
            >
              닫기
            </button>
          </div>
        </div>

        {/* Footer - Don't Show Today */}
        <div className="px-6 md:px-8 pb-6">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={dontShowToday}
              onChange={(e) => setDontShowToday(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
              오늘 하루 보지 않기
            </span>
          </label>
        </div>
      </div>

      <style jsx global>{`
        .popup-content p {
          line-height: 1.75;
        }
        .popup-content strong {
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}
