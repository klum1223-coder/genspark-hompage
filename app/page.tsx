import Hero from '@/components/shared/Hero'
import PopupModal from '@/components/ui/PopupModal'

export default function Home() {
  return (
    <>
      <PopupModal />
      
      {/* Hero Section */}
      <Hero />

      {/* Welcome Section */}
      <section className="section-padding bg-beige">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              환영합니다
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              우리 교회는 하나님의 사랑과 은혜를 나누는 공동체입니다.
              <br />
              새가족 여러분을 진심으로 환영하며, 
              <br />
              함께 믿음의 여정을 걸어가기를 소망합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 예배 시간 */}
            <div className="card p-8 text-center">
              <div className="text-4xl mb-4">⛪</div>
              <h3 className="text-xl font-bold text-primary mb-3">예배 시간</h3>
              <p className="text-gray-600">
                주일 1부 예배: 오전 9:00<br />
                주일 2부 예배: 오전 11:00<br />
                수요 예배: 오후 7:30
              </p>
            </div>

            {/* 오시는 길 */}
            <div className="card p-8 text-center">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-primary mb-3">오시는 길</h3>
              <p className="text-gray-600">
                서울시 강남구 테헤란로 123<br />
                지하철 2호선 역삼역 3번 출구<br />
                도보 5분 거리
              </p>
            </div>

            {/* 연락처 */}
            <div className="card p-8 text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-primary mb-3">연락처</h3>
              <p className="text-gray-600">
                대표전화: 02-1234-5678<br />
                팩스: 02-1234-5679<br />
                이메일: info@church.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              교회 소식
            </h2>
            <p className="text-gray-600">최근 교회 소식을 전해드립니다</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <article key={item} className="card overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <span className="text-sm text-gray-500">2024.01.02</span>
                  <h3 className="text-lg font-bold text-primary mt-2 mb-3">
                    교회 소식 제목 {item}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    교회 소식의 간단한 설명이 들어갑니다...
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
