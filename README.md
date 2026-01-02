# Church Website (교회 홈페이지)

Next.js 14와 TypeScript로 구축된 현대적인 교회 홈페이지입니다.

## 🎯 프로젝트 목표

- 새가족 환영과 기존 성도 소통의 균형
- 교회 사역과 활동을 시각적으로 효과적 소개
- 관리자가 쉽게 콘텐츠를 관리할 수 있는 시스템
- 중요 공지를 팝업으로 효과적 전달

## 🛠️ 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **CMS**: Sanity.io (관리자 시스템)
- **인증**: NextAuth.js
- **이미지**: Next.js Image + Sanity 이미지 최적화

## 📁 프로젝트 구조

```
church-website/
├── app/
│   ├── about/          # 교회 소개
│   ├── ministry/       # 교회 사역
│   ├── gallery/        # 활동 사진
│   ├── sermon/         # 설교
│   ├── news/           # 교회 소식
│   ├── contact/        # 오시는 길
│   ├── studio/         # Sanity Studio (관리자)
│   ├── layout.tsx      # 루트 레이아웃
│   ├── page.tsx        # 메인 페이지
│   └── globals.css     # 전역 스타일
├── components/
│   ├── layout/         # 레이아웃 컴포넌트 (Header, Footer)
│   ├── ui/             # UI 컴포넌트 (PopupModal 등)
│   └── shared/         # 공유 컴포넌트 (Hero 등)
├── lib/
│   ├── sanity/         # Sanity 설정 및 유틸리티
│   └── utils/          # 유틸리티 함수
├── public/
│   ├── images/         # 이미지 파일
│   └── fonts/          # 폰트 파일
├── styles/             # 추가 스타일 파일
└── types/              # TypeScript 타입 정의
```

## 🎨 디자인 방향

- **스타일**: Wix 템플릿 2614 (미니멀, 모던)
- **주 색상**: 따뜻한 베이지 (#F5F5DC)
- **포인트 색상**: 딥 블루 (#2C3E50)
- **폰트**: Noto Sans KR
- **레이아웃**: 카드형, 충분한 여백

## 📄 주요 페이지

### 메인 사이트
- `/` - 메인 페이지 (팝업 모달 포함)
- `/about` - 교회 소개 (비전, 연혁, 담임목사, 믿음)
- `/ministry` - 교회 사역 (주일학교, 청년부, 선교 등)
- `/gallery` - 활동 사진 갤러리
- `/sermon` - 설교 목록 및 재생
- `/news` - 교회 소식 및 공지사항
- `/contact` - 오시는 길 및 문의하기

### 관리자 시스템
- `/studio` - Sanity Studio (CMS 관리자)

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

### 3. 빌드

```bash
npm run build
```

### 4. 프로덕션 실행

```bash
npm start
```

## 🎯 주요 기능

### ✅ 구현 완료
- [x] Next.js 14 프로젝트 기본 구조
- [x] 반응형 헤더 (모바일 햄버거 메뉴)
- [x] 푸터 (교회 정보, SNS 링크)
- [x] 메인 페이지 (Hero, 환영, 예배 시간, 최신 소식)
- [x] 팝업 모달 (오늘 하루 보지 않기 기능)
- [x] 교회 소개 페이지
- [x] 교회 사역 페이지
- [x] 활동 사진 갤러리
- [x] 설교 페이지
- [x] 교회 소식 페이지
- [x] 오시는 길 페이지

### 🔄 향후 구현 예정
- [ ] Sanity CMS 연동
- [ ] 실제 데이터 연동
- [ ] 설교 오디오/비디오 재생 기능
- [ ] 이미지 갤러리 상세 뷰
- [ ] 지도 API 연동 (카카오맵/네이버맵)
- [ ] 뉴스레터 구독 기능
- [ ] 관리자 인증 (NextAuth.js)
- [ ] SEO 최적화
- [ ] 다국어 지원 (한/영)

## 🎨 컴포넌트

### Layout 컴포넌트
- `Header` - 네비게이션 헤더 (모바일 반응형)
- `Footer` - 페이지 푸터

### UI 컴포넌트
- `PopupModal` - 팝업 모달 (공지사항)

### Shared 컴포넌트
- `Hero` - 히어로 섹션

## 📱 반응형 디자인

- **모바일**: < 768px
- **태블릿**: 768px - 1024px
- **데스크톱**: > 1024px

## 🌈 색상 팔레트

```css
primary: #2C3E50 (딥 블루)
primary-light: #34495E
primary-dark: #1A252F

beige: #F5F5DC (따뜻한 베이지)
beige-light: #FAFAF0
beige-dark: #E8E8C8

accent-gold: #D4AF37
accent-warm: #C9A96E
```

## 📝 라이선스

© 2024 교회 이름. All rights reserved.

## 🤝 기여

프로젝트에 기여하고 싶으시다면 Pull Request를 보내주세요.

## 📧 문의

- 이메일: info@church.com
- 전화: 02-1234-5678
