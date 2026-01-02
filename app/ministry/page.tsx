export const metadata = {
  title: '교회 사역 | 교회 이름',
  description: '우리 교회의 다양한 사역을 소개합니다',
}

export default function MinistryPage() {
  const ministries = [
    {
      title: '주일학교',
      icon: '👶',
      description: '영유아부터 고등부까지 연령별 맞춤 교육',
      programs: ['영아부', '유치부', '유년부', '초등부', '중등부', '고등부']
    },
    {
      title: '청년부',
      icon: '🙋',
      description: '대학생과 청년들의 신앙 공동체',
      programs: ['대학부', '청년부', '청년 찬양팀', '청년 선교회']
    },
    {
      title: '장년부',
      icon: '👥',
      description: '장년 성도들의 신앙 성숙과 교제',
      programs: ['남선교회', '여선교회', '구역 모임', '소그룹']
    },
    {
      title: '실버 사역',
      icon: '👴',
      description: '어르신들을 위한 특별 프로그램',
      programs: ['경로대학', '실버 찬양대', '실버 봉사단']
    },
    {
      title: '찬양 사역',
      icon: '🎵',
      description: '하나님을 찬양하는 음악 사역',
      programs: ['성가대', '찬양팀', '오케스트라', '어린이 합창단']
    },
    {
      title: '선교 사역',
      icon: '🌍',
      description: '국내외 선교와 지역 봉사',
      programs: ['해외 선교', '국내 선교', '지역 봉사', '구제 사역']
    },
  ]

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-beige py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            교회 사역
          </h1>
          <p className="text-lg text-gray-600">
            하나님의 나라를 위한 다양한 사역들
          </p>
        </div>
      </section>

      {/* Ministry Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministries.map((ministry, index) => (
              <div key={index} className="card p-8 hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4 text-center">{ministry.icon}</div>
                <h3 className="text-2xl font-bold text-primary mb-3 text-center">
                  {ministry.title}
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  {ministry.description}
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <ul className="space-y-2">
                    {ministry.programs.map((program, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                        <span className="text-primary">•</span>
                        <span>{program}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">주간 일정</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            </div>

            <div className="space-y-4">
              {[
                { day: '주일', schedule: ['1부 예배 09:00', '2부 예배 11:00', '찬양예배 14:00', '주일학교 11:00'] },
                { day: '월요일', schedule: ['새벽기도회 05:30'] },
                { day: '화요일', schedule: ['새벽기도회 05:30', '청년부 모임 19:30'] },
                { day: '수요일', schedule: ['새벽기도회 05:30', '수요예배 19:30'] },
                { day: '목요일', schedule: ['새벽기도회 05:30', '구역 모임 19:30'] },
                { day: '금요일', schedule: ['새벽기도회 05:30', '금요기도회 19:30'] },
                { day: '토요일', schedule: ['새벽기도회 05:30', '청소년부 모임 14:00'] },
              ].map((item, index) => (
                <div key={index} className="card p-6">
                  <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
                    <div className="md:w-32 font-bold text-primary text-lg">
                      {item.day}
                    </div>
                    <div className="flex-1 flex flex-wrap gap-3">
                      {item.schedule.map((time, idx) => (
                        <span key={idx} className="inline-block bg-beige px-4 py-2 rounded-full text-sm text-gray-700">
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
