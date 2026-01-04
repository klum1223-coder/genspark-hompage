'use client'

import { useEffect, useState } from 'react'

interface PastorInfo {
  name: string
  education: string[]
  career: string[]
  message: string
  photo?: string
}

interface AboutContent {
  vision: string
  mission: string
  history: string[]
  beliefs: string[]
}

interface ChurchInfo {
  name: string
  englishName: string
  phone: string
  fax: string
  email: string
  address: string
  addressDetail: string
}

export default function AboutPage() {
  const [pastorInfo, setPastorInfo] = useState<PastorInfo>({
    name: '김선우 목사',
    education: [
      '호서대학교 신학과 졸업 (B.A.)',
      '서울신학대학교 대학원 목회학 석사 (M.Div.)'
    ],
    career: [
      '희망도서관 청주지부장',
      '글쓰기 운동본부 충북지역장'
    ],
    message: '하나님의 말씀으로 세워지고, 사랑으로 하나 되며, 복음으로 세상을 섬기는 교회를 꿈꿉니다.',
    photo: '/pastor-photo.jpg'
  })

  const [aboutContent, setAboutContent] = useState<AboutContent>({
    vision: '우리 교회는 예수 그리스도의 복음을 전하고,\n하나님의 사랑을 실천하며, 지역사회를 섬기는\n건강한 신앙 공동체를 추구합니다.',
    mission: '말씀 중심의 예배, 사랑의 교제, 세상을 향한 선교',
    history: [
      '2020년 교회 설립 및 첫 예배',
      '2021년 청년부 및 주일학교 개설',
      '2022년 새 예배당 입당',
      '2023년 지역사회 봉사 시작',
      '2024년 온라인 예배 시스템 구축'
    ],
    beliefs: [
      '성경의 영감과 무오성',
      '삼위일체 하나님',
      '예수 그리스도의 대속과 부활',
      '성령의 내주와 사역',
      '교회는 그리스도의 몸',
      '예수 그리스도의 재림'
    ]
  })

  const [churchInfo, setChurchInfo] = useState<ChurchInfo>({
    name: '주성성결교회',
    englishName: 'Joosung Holiness Church',
    phone: '010-8986-3965',
    fax: '02-1234-5679',
    email: 'klum3@naver.com',
    address: '충북 청주시 흥덕구 봉명로219번길 24',
    addressDetail: '2층'
  })

  useEffect(() => {
    // localStorage에서 데이터 로드
    const loadData = () => {
      const savedPastorInfo = localStorage.getItem('pastor_info')
      if (savedPastorInfo) {
        setPastorInfo(JSON.parse(savedPastorInfo))
      }

      const savedAbout = localStorage.getItem('about_content')
      if (savedAbout) {
        setAboutContent(JSON.parse(savedAbout))
      }

      const savedChurchInfo = localStorage.getItem('church_info')
      if (savedChurchInfo) {
        setChurchInfo(JSON.parse(savedChurchInfo))
      }
    }

    loadData()
  }, [])

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
              <p className="text-gray-700 leading-relaxed text-center mb-8 whitespace-pre-line">
                {aboutContent.vision}
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
                  이웃을 섬기는<br />
                  선교의 공동체
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Church History */}
      <section className="section-padding bg-beige">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">교회 연혁</h2>
              <div className="w-20 h-1 bg-primary mx-auto"></div>
            </div>

            <div className="space-y-4">
              {aboutContent.history.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 flex-1 pt-1">{item}</p>
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
              <div className="w-20 h-1 bg-primary mx-auto"></div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* 사진 영역 */}
                <div className="md:col-span-2 bg-gradient-to-br from-beige to-beige-dark p-8 flex items-center justify-center">
                  <div className="relative w-full max-w-sm">
                    {pastorInfo.photo ? (
                      <img 
                        src={pastorInfo.photo}
                        alt={pastorInfo.name}
                        className="w-full h-auto rounded-lg shadow-xl object-cover"
                      />
                    ) : (
                      <div className="w-full aspect-[3/4] bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center text-white text-6xl">
                        👨‍🏫
                      </div>
                    )}
                  </div>
                </div>

                {/* 정보 영역 */}
                <div className="md:col-span-3 p-8 md:p-12">
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-primary mb-2">
                      {pastorInfo.name}
                    </h3>
                    <p className="text-gray-600 text-lg">담임목사 / Senior Pastor</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-primary mb-3 text-lg flex items-center space-x-2">
                        <span>📚</span>
                        <span>학력</span>
                      </h4>
                      <ul className="space-y-2 ml-7">
                        {pastorInfo.education.map((edu, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-gray-700">{edu}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {pastorInfo.career && pastorInfo.career.length > 0 && (
                      <div>
                        <h4 className="font-bold text-primary mb-3 text-lg flex items-center space-x-2">
                          <span>💼</span>
                          <span>경력</span>
                        </h4>
                        <ul className="space-y-2 ml-7">
                          {pastorInfo.career.map((car, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-primary mt-1">•</span>
                              <span className="text-gray-700">{car}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="border-t pt-6">
                      <blockquote className="text-gray-700 italic text-lg leading-relaxed border-l-4 border-primary pl-4">
                        "{pastorInfo.message}"
                      </blockquote>
                    </div>
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
              <div className="w-20 h-1 bg-primary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aboutContent.beliefs.map((belief, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <p className="text-gray-700 flex-1">{belief}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">오시는 길</h2>
              <div className="w-20 h-1 bg-primary mx-auto"></div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-primary mb-3 flex items-center">
                    <span className="text-2xl mr-2">📍</span>
                    주소
                  </h4>
                  <p className="text-gray-700 ml-9">{churchInfo.address}</p>
                  <p className="text-gray-700 ml-9">{churchInfo.addressDetail}</p>
                </div>

                <div>
                  <h4 className="font-bold text-primary mb-3 flex items-center">
                    <span className="text-2xl mr-2">📞</span>
                    전화
                  </h4>
                  <p className="text-gray-700 ml-9">{churchInfo.phone}</p>
                </div>

                <div>
                  <h4 className="font-bold text-primary mb-3 flex items-center">
                    <span className="text-2xl mr-2">📠</span>
                    팩스
                  </h4>
                  <p className="text-gray-700 ml-9">{churchInfo.fax}</p>
                </div>

                <div>
                  <h4 className="font-bold text-primary mb-3 flex items-center">
                    <span className="text-2xl mr-2">✉️</span>
                    이메일
                  </h4>
                  <p className="text-gray-700 ml-9">{churchInfo.email}</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t">
                <div className="text-center">
                  <a
                    href="/contact"
                    className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium"
                  >
                    자세한 오시는 길 보기
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
