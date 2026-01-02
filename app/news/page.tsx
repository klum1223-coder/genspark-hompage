export const metadata = {
  title: '교회 소식 | 교회 이름',
  description: '교회의 최신 소식과 공지사항입니다',
}

export default function NewsPage() {
  // 임시 뉴스 데이터
  const news = [
    {
      id: 1,
      category: '공지',
      title: '2024년 신년 부흥회 안내',
      excerpt: '새해를 맞이하여 부흥회를 개최합니다. 많은 참여 부탁드립니다.',
      date: '2024.01.02',
      author: '관리자',
      views: 245,
    },
    {
      id: 2,
      category: '행사',
      title: '겨울 성경학교 등록 안내',
      excerpt: '초등부 겨울 성경학교 등록이 시작되었습니다.',
      date: '2023.12.28',
      author: '교육부',
      views: 189,
    },
    {
      id: 3,
      category: '소식',
      title: '성탄절 축하 행사 후기',
      excerpt: '감동적이었던 성탄절 행사의 사진과 후기를 공유합니다.',
      date: '2023.12.26',
      author: '관리자',
      views: 312,
    },
    {
      id: 4,
      category: '공지',
      title: '주차장 이용 안내',
      excerpt: '주차장 공사로 인한 임시 주차 안내 사항입니다.',
      date: '2023.12.20',
      author: '관리부',
      views: 156,
    },
    {
      id: 5,
      category: '행사',
      title: '청년부 수련회 참가 신청',
      excerpt: '2024년 첫 청년부 수련회 참가자를 모집합니다.',
      date: '2023.12.15',
      author: '청년부',
      views: 201,
    },
    {
      id: 6,
      category: '소식',
      title: '해외 선교 사역 보고',
      excerpt: '필리핀 선교 사역의 귀한 열매들을 보고드립니다.',
      date: '2023.12.10',
      author: '선교부',
      views: 178,
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '공지':
        return 'bg-red-100 text-red-700'
      case '행사':
        return 'bg-blue-100 text-blue-700'
      case '소식':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-beige py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            교회 소식
          </h1>
          <p className="text-lg text-gray-600">
            교회의 최신 소식과 공지사항을 전해드립니다
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="px-6 py-2 bg-primary text-white rounded-full text-sm font-medium">
              전체
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200">
              공지사항
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200">
              행사안내
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200">
              교회소식
            </button>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            {/* Featured News */}
            <article className="card overflow-hidden mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-auto bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📢</div>
                    <p className="text-sm font-medium">주요 공지</p>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full mb-3 w-fit">
                    중요 공지
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                    2024년 신년 부흥회 안내
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    새해를 맞이하여 부흥회를 개최합니다. 
                    김은혜 목사님을 강사로 모시고 3일간 진행되는 
                    이번 부흥회에 많은 참여 부탁드립니다.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span>📅 2024.01.02</span>
                    <span>👁️ 245</span>
                  </div>
                </div>
              </div>
            </article>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.slice(1).map((item) => (
                <article key={item.id} className="card overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  {/* Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-beige to-beige-dark flex items-center justify-center text-primary">
                    <div className="text-5xl">📰</div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    
                    <h3 className="text-lg font-bold text-primary mb-2 line-clamp-2 hover:text-primary-light transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {item.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span>📅 {item.date}</span>
                        <span>👤 {item.author}</span>
                      </div>
                      <span>👁️ {item.views}</span>
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
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-beige">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-5xl mb-4">📧</div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              교회 소식 받기
            </h2>
            <p className="text-gray-700 mb-6">
              교회의 최신 소식과 공지사항을 이메일로 받아보세요
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
