export const metadata = {
  title: '설교 | 교회 이름',
  description: '주일 설교 말씀을 나눕니다',
}

export default function SermonPage() {
  // 임시 설교 데이터
  const sermons = [
    {
      id: 1,
      title: '새해, 새로운 시작',
      pastor: '김은혜 목사',
      date: '2024.01.07',
      verse: '이사야 43:18-19',
      series: '2024 신년 특별 시리즈',
    },
    {
      id: 2,
      title: '하나님의 사랑',
      pastor: '김은혜 목사',
      date: '2023.12.31',
      verse: '요한복음 3:16',
      series: '사랑의 메시지',
    },
    {
      id: 3,
      title: '믿음으로 사는 삶',
      pastor: '김은혜 목사',
      date: '2023.12.24',
      verse: '히브리서 11:1-6',
      series: '성탄절 특별 메시지',
    },
    {
      id: 4,
      title: '감사의 힘',
      pastor: '김은혜 목사',
      date: '2023.12.17',
      verse: '데살로니가전서 5:16-18',
      series: '일반 설교',
    },
    {
      id: 5,
      title: '기도의 능력',
      pastor: '김은혜 목사',
      date: '2023.12.10',
      verse: '마태복음 7:7-11',
      series: '일반 설교',
    },
    {
      id: 6,
      title: '말씀 묵상의 은혜',
      pastor: '김은혜 목사',
      date: '2023.12.03',
      verse: '시편 1:1-3',
      series: '일반 설교',
    },
  ]

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-beige py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            설교
          </h1>
          <p className="text-lg text-gray-600">
            하나님의 말씀으로 은혜받으세요
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-primary text-white rounded-md text-sm">
                전체
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                주일 설교
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                수요 설교
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                특별 설교
              </button>
            </div>
            <div className="w-full md:w-auto">
              <input
                type="text"
                placeholder="설교 검색..."
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sermon List */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto space-y-6">
            {sermons.map((sermon) => (
              <article key={sermon.id} className="card p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Thumbnail */}
                  <div className="flex-shrink-0">
                    <div className="w-full md:w-40 h-40 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="text-3xl mb-2">🎤</div>
                        <div className="text-sm font-medium">설교</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="inline-block px-3 py-1 bg-beige text-primary text-xs font-medium rounded-full mb-2">
                          {sermon.series}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">
                          {sermon.title}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600 mb-4">
                      <p><strong>본문:</strong> {sermon.verse}</p>
                      <p><strong>설교자:</strong> {sermon.pastor}</p>
                      <p><strong>날짜:</strong> {sermon.date}</p>
                    </div>

                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary-light transition-colors">
                        🎧 듣기
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors">
                        📄 본문 보기
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors">
                        ⬇️ 다운로드
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2 mt-12">
            <button className="px-3 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200">
              이전
            </button>
            <button className="px-4 py-2 rounded-md bg-primary text-white">1</button>
            <button className="px-4 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200">2</button>
            <button className="px-4 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200">3</button>
            <button className="px-3 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200">
              다음
            </button>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="section-padding bg-beige">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              설교 알림 받기
            </h2>
            <p className="text-gray-700 mb-6">
              매주 새로운 설교가 업로드되면 이메일로 알려드립니다
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                구독하기
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
