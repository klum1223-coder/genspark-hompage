'use client'

import { useState, useEffect } from 'react'

export default function LiveStreamPage() {
  const [isLive, setIsLive] = useState(false)
  const [nextService, setNextService] = useState<string>('')

  useEffect(() => {
    // 다음 예배 시간 계산
    const calculateNextService = () => {
      const now = new Date()
      const day = now.getDay() // 0: 일요일, 1: 월요일, ...
      const hour = now.getHours()
      const minute = now.getMinutes()

      // 주일 예배 시간
      if (day === 0) { // 일요일
        if (hour < 9) {
          return '오늘 오전 9시 1부 예배'
        } else if (hour < 11) {
          return '오늘 오전 11시 2부 예배'
        } else if (hour < 14) {
          return '오늘 오후 2시 찬양예배'
        }
      }
      
      // 수요일 예배
      if (day === 3 && hour < 19) {
        return '오늘 오후 7시 30분 수요예배'
      }

      // 다음 주일 예배
      const daysUntilSunday = day === 0 ? 7 : 7 - day
      return `${daysUntilSunday}일 후 주일 오전 9시 1부 예배`
    }

    setNextService(calculateNextService())

    // 실시간 여부 확인 (실제로는 YouTube API로 확인)
    // 여기서는 임시로 주일 예배 시간에만 true
    const checkLiveStatus = () => {
      const now = new Date()
      const day = now.getDay()
      const hour = now.getHours()
      
      // 주일 오전 9시~12시, 오후 2시~4시
      if (day === 0) {
        if ((hour >= 9 && hour < 12) || (hour >= 14 && hour < 16)) {
          setIsLive(true)
          return
        }
      }
      
      // 수요일 오후 7시~9시
      if (day === 3 && hour >= 19 && hour < 21) {
        setIsLive(true)
        return
      }
      
      setIsLive(false)
    }

    checkLiveStatus()
    const interval = setInterval(checkLiveStatus, 60000) // 1분마다 확인

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12">
        <div className="container-custom">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {isLive && (
              <span className="flex items-center space-x-2 bg-red-500 px-4 py-2 rounded-full animate-pulse">
                <span className="w-3 h-3 bg-white rounded-full"></span>
                <span className="font-bold">LIVE</span>
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold">실시간 예배</h1>
          </div>
          <p className="text-center text-xl text-red-100">
            {isLive ? '지금 예배가 진행 중입니다' : `다음 예배: ${nextService}`}
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          {/* YouTube 라이브 스트림 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="aspect-video bg-black relative">
              {isLive ? (
                <iframe
                  src="https://www.youtube.com/embed/live_stream?channel=UC-주성성결교회채널ID&autoplay=1"
                  title="주성성결교회 실시간 예배"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-white">
                  <div className="text-6xl mb-4">📺</div>
                  <h3 className="text-2xl font-bold mb-2">예배 시간이 아닙니다</h3>
                  <p className="text-gray-400 mb-6">다음 예배: {nextService}</p>
                  <a
                    href="https://www.youtube.com/@주성성결교회"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  >
                    유튜브 채널 방문하기
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* 예배 시간 안내 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* 주일 예배 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="text-2xl mr-2">⛪</span>
                주일 예배
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">1부 예배</span>
                  <span className="text-primary font-bold">오전 9:00</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">2부 예배</span>
                  <span className="text-primary font-bold">오전 11:00</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">찬양예배</span>
                  <span className="text-primary font-bold">오후 2:00</span>
                </div>
              </div>
            </div>

            {/* 평일 예배 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="text-2xl mr-2">🙏</span>
                평일 예배
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">수요예배</span>
                  <span className="text-primary font-bold">오후 7:30</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">금요기도회</span>
                  <span className="text-primary font-bold">오후 7:30</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">새벽기도</span>
                  <span className="text-primary font-bold">오전 5:30</span>
                </div>
              </div>
            </div>
          </div>

          {/* 안내 사항 */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-3 text-blue-900">💡 온라인 예배 안내</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>예배 시작 5분 전부터 실시간 스트리밍이 시작됩니다.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>채팅을 통해 기도 제목을 나눌 수 있습니다.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>예배 종료 후에도 다시보기가 가능합니다.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>온라인 헌금은 교회 계좌로 이체 가능합니다.</span>
              </li>
            </ul>
          </div>

          {/* 온라인 헌금 안내 */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
              <span className="text-2xl mr-2">💰</span>
              온라인 헌금 안내
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">은행명</p>
                <p className="font-bold text-lg">국민은행</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">계좌번호</p>
                <p className="font-bold text-lg">123-456-789012</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">예금주</p>
                <p className="font-bold text-lg">주성성결교회</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">문의</p>
                <p className="font-bold text-lg">02-1234-5678</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              * 입금 시 '헌금종류-이름'으로 입금해주세요. (예: 십일조-홍길동)
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
