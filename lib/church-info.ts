// 주성성결교회 정보
// 이 파일을 수정하여 교회 정보를 업데이트할 수 있습니다.

export const CHURCH_INFO = {
  // 기본 정보
  name: '주성성결교회',
  englishName: 'Joosung Holiness Church',
  tagline: '하나님의 사랑으로 함께하는 공동체',
  description: '예수 그리스도의 복음으로 세워진 생명과 소망이 넘치는 교회',
  
  // 연락처 정보
  contact: {
    phone: '02-1234-5678',
    fax: '02-1234-5679',
    email: 'info@joosungchurch.com',
    address: '서울시 강남구 테헤란로 123',
    addressDetail: '주성빌딩 2층',
  },
  
  // 교통 정보
  transportation: {
    subway: '지하철 2호선 역삼역 3번 출구',
    bus: '간선: 146, 341, 360 / 지선: 3414, 4412',
    parking: '건물 지하 주차장 이용 가능',
    walkingTime: '도보 5분 거리',
  },
  
  // 예배 시간
  worship: {
    sunday: [
      { name: '1부 예배', time: '오전 09:00', description: '장년 예배' },
      { name: '2부 예배', time: '오전 11:00', description: '대예배' },
      { name: '찬양예배', time: '오후 14:00', description: '청년 찬양 예배' },
    ],
    weekday: [
      { name: '수요 예배', time: '매주 수요일 오후 07:30', description: '말씀과 기도로 함께하는 시간' },
      { name: '새벽 기도회', time: '매일 새벽 오전 05:30', description: '하루를 주님께 드리는 시간' },
      { name: '금요 기도회', time: '매주 금요일 오후 07:30', description: '성령 충만의 시간' },
    ],
  },
  
  // 담임목사 정보
  pastor: {
    name: '김은혜 목사',
    title: '담임목사',
    education: [
      '장로회신학대학교 신학과 (B.A.)',
      '장로회신학대학원 목회학 석사 (M.Div.)',
      '풀러신학교 선교학 박사 (D.Min.)',
    ],
    message: '하나님의 말씀으로 세워지고, 사랑으로 하나 되며, 복음으로 세상을 섬기는 교회를 꿈꿉니다.',
  },
  
  // 소셜 미디어
  social: {
    youtube: 'https://www.youtube.com/@주성성결교회',
    youtubeId: '@주성성결교회',
    blog: 'https://blog.naver.com/joosung0416',
    blogId: 'joosung0416',
    facebook: '',
    instagram: '',
  },
  
  // 교회 비전
  vision: {
    title: '주성성결교회의 비전',
    subtitle: '말씀으로 세워지고, 성령으로 충만하며, 사랑으로 섬기는 교회',
    items: [
      {
        icon: '📖',
        title: '말씀 중심',
        description: '성경 말씀을 기초로 한 신앙 생활',
      },
      {
        icon: '🔥',
        title: '성령 충만',
        description: '성령님의 인도하심을 따라 살아가는 교회',
      },
      {
        icon: '❤️',
        title: '사랑 실천',
        description: '이웃을 사랑하고 섬기는 공동체',
      },
      {
        icon: '🌍',
        title: '선교 열정',
        description: '복음을 전하는 선교하는 교회',
      },
    ],
  },
  
  // 핵심 가치
  coreValues: [
    '예배: 하나님께 영광을 돌리는 참된 예배',
    '말씀: 성경 말씀에 기초한 신앙',
    '기도: 쉬지 않고 기도하는 교회',
    '교제: 사랑으로 하나 되는 공동체',
    '섬김: 이웃을 섬기는 사랑의 실천',
    '전도: 복음을 전하는 선교적 교회',
  ],
}
