export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-beige py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            교회 소개
          </h1>
          <p className="text-lg text-gray-600">
            하나님의 사랑으로 세워진 공동체를 소개합니다
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">비전과 사명</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-center mb-8">
                우리 교회는 예수 그리스도의 복음을 전하고,<br />
                하나님의 사랑을 실천하며, 지역사회를 섬기는<br />
                건강한 신앙 공동체를 추구합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🙏</div>
                <h3 className="text-xl font-bold text-primary mb-3">예배</h3>
                <p className="text-gray-600">
                  하나님을 경배하고<br />
                  말씀으로 양육받는<br />
                  예배 공동체
                </p>
              </div>

              <div className="text-center p-6">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-xl font-bold text-primary mb-3">교제</h3>
                <p className="text-gray-600">
                  서로 사랑하고<br />
                  함께 성장하는<br />
                  교제의 공동체
                </p>
              </div>

              <div className="text-center p-6">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-bold text-primary mb-3">선교</h3>
                <p className="text-gray-600">
                  복음을 전하고<br />
                  세상을 섬기는<br />
                  선교 공동체
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">교회 연혁</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            </div>

            <div className="space-y-8">
              {[
                { year: '2020', event: '교회 창립 및 초대 담임목사 부임' },
                { year: '2021', event: '신축 예배당 건축 시작' },
                { year: '2022', event: '새 예배당 입당 예배' },
                { year: '2023', event: '선교센터 개관 및 지역 봉사 시작' },
                { year: '2024', event: '창립 5주년 감사예배' },
              ].map((item) => (
                <div key={item.year} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    {item.year}
                  </div>
                  <div className="flex-1 pt-5">
                    <p className="text-lg text-gray-700">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pastor Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">담임목사 소개</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            </div>

            <div className="card p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-4xl">
                    👤
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    김선우 목사
                  </h3>
                  <p className="text-gray-600 mb-4">담임목사 / Senior Pastor</p>
                  
                  <div className="space-y-2 text-gray-700">
                    <p>총신대학교 신학과 졸업 (B.A.)</p>
                    <p>총신대학교 신학대학원 목회학 석사 (M.Div.)</p>
                  </div>

                  <div className="mt-6 p-4 bg-beige rounded-md">
                    <p className="text-sm text-gray-700 italic">
                      &ldquo;하나님의 말씀으로 세워지고, 사랑으로 하나 되며,
                      <br />
                      복음으로 세상을 섬기는 교회를 꿈꿉니다.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beliefs Section */}
      <section className="section-padding bg-beige">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">우리의 믿음</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                '성경은 하나님의 영감으로 기록된 오류 없는 말씀입니다',
                '삼위일체 하나님을 믿습니다',
                '예수 그리스도의 대속의 죽음과 부활을 믿습니다',
                '성령의 내주하심과 사역을 믿습니다',
                '교회는 그리스도의 몸이며 성도의 공동체입니다',
                '예수 그리스도의 재림과 최후의 심판을 믿습니다',
              ].map((belief, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm">
                    ✓
                  </div>
                  <p className="text-gray-700">{belief}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">오시는 길</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">📍</div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">주소</h4>
                    <p className="text-gray-700">서울시 강남구 테헤란로 123</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">📞</div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">전화</h4>
                    <p className="text-gray-700">02-1234-5678</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">✉️</div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">이메일</h4>
                    <p className="text-gray-700">info@joosungchurch.com</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-primary mb-3">대중교통 이용</h4>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-semibold">🚇 지하철:</span> 2호선 역삼역 3번 출구 (도보 5분)</p>
                  <p><span className="font-semibold">🚌 버스:</span> 146, 241, 401, 4319</p>
                </div>
                <h4 className="font-bold text-primary mb-3 mt-6">주차 안내</h4>
                <p className="text-gray-700">교회 지하 주차장 이용 가능 (예배 시간 무료)</p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <p>지도는 실제 배포 시 Google Maps 또는 Kakao Map으로 연동됩니다</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
