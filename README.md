# Church Website (교회 홈페이지)

Next.js 14와 TypeScript, Sanity.io CMS로 구축된 현대적인 교회 홈페이지입니다.

## 🎯 프로젝트 목표

- 새가족 환영과 기존 성도 소통의 균형
- 교회 사역과 활동을 시각적으로 효과적 소개
- 관리자가 쉽게 콘텐츠를 관리할 수 있는 시스템 (Sanity.io)
- 중요 공지를 팝업으로 효과적 전달

## 🛠️ 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **CMS**: Sanity.io (Headless CMS)
- **이미지**: Next.js Image + Sanity 이미지 최적화
- **라이트박스**: yet-another-react-lightbox

## 🚀 시작하기

### 1. 저장소 클론 및 의존성 설치

```bash
git clone <repository-url>
cd church-website
npm install --legacy-peer-deps
```

### 2. Sanity.io 프로젝트 설정

#### 2.1. Sanity 계정 생성
1. [Sanity.io](https://www.sanity.io/) 방문
2. 무료 계정 생성
3. 새 프로젝트 생성

#### 2.2. 프로젝트 ID 및 Dataset 생성
```bash
# Sanity CLI 설치 (전역)
npm install -g @sanity/cli

# Sanity 로그인
sanity login

# 기존 프로젝트 연결 또는 새 프로젝트 생성
sanity init

# 프로젝트 ID 확인
sanity projects list
```

#### 2.3. 환경 변수 설정
`.env.local` 파일 생성:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token_here
```

**API 토큰 생성 방법:**
1. [Sanity Manage](https://www.sanity.io/manage) 접속
2. 프로젝트 선택
3. API → Tokens → Add API token
4. 이름: "Production Token"
5. Permissions: Editor
6. 생성된 토큰을 `.env.local`에 복사

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 확인:
- **웹사이트**: http://localhost:3000
- **Sanity Studio**: http://localhost:3000/studio

## 📋 Sanity Studio 사용법

### 접속
http://localhost:3000/studio

### 콘텐츠 타입

#### 1. 팝업 공지 🔔
메인 페이지에 표시될 팝업을 관리합니다.

**필수 필드:**
- 제목
- 내용 (Rich Text)
- 노출 시작일/종료일

**선택 필드:**
- 이미지
- 링크 URL 및 버튼 텍스트
- 우선순위 (높을수록 먼저 표시)

#### 2. 교회 사역 ⛪
사역 소개 페이지의 콘텐츠를 관리합니다.

**필수 필드:**
- 사역명
- 카테고리 (예배/교육/선교/친교/기타)
- 간단한 소개
- 모임 시간/장소
- 담당자

**선택 필드:**
- 상세 설명
- 대표 이미지
- 연락처
- 표시 순서

#### 3. 설교 🎤
설교 목록 및 상세 페이지의 콘텐츠를 관리합니다.

**필수 필드:**
- 설교 제목
- 설교자
- 날짜
- 본문 말씀
- 설교 분류 (주일/수요/특별)

**선택 필드:**
- 시리즈
- 요약
- 설교 내용 (Rich Text)
- 오디오/비디오 URL
- 썸네일
- 첨부파일 (PDF 등)

#### 4. 교회 소식 📰
교회 소식 페이지의 콘텐츠를 관리합니다.

**필수 필드:**
- 제목
- 카테고리 (공지/행사/소식)
- 날짜
- 요약
- 내용 (Rich Text)

**선택 필드:**
- 썸네일
- 주요 공지 여부
- 조회수 (자동)

#### 5. 사진 앨범 📷
갤러리 페이지의 앨범을 관리합니다.

**필수 필드:**
- 앨범명
- 날짜
- 카테고리 (예배/행사/선교/교육/친교)
- 대표 이미지
- 사진들 (여러 장 업로드)

**선택 필드:**
- 설명
- 각 사진별 설명

### 콘텐츠 관리 팁

1. **미리보기**: Studio에서 수정 후 웹사이트에서 실시간 반영 확인
2. **이미지 최적화**: Sanity가 자동으로 이미지 최적화 및 CDN 제공
3. **Rich Text**: 설교 내용, 소식 등에서 서식, 링크, 이미지 추가 가능
4. **정렬**: 각 콘텐츠 타입별로 정렬 옵션 제공 (날짜, 우선순위 등)
5. **활성화/비활성화**: 각 항목별로 표시 여부 제어 가능

## 📁 프로젝트 구조

```
church-website/
├── app/
│   ├── about/              # 교회 소개
│   ├── ministry/           # 교회 사역
│   ├── gallery/            # 활동 사진
│   ├── sermon/             # 설교
│   ├── news/               # 교회 소식
│   ├── contact/            # 오시는 길
│   ├── studio/[[...index]]/  # Sanity Studio
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 메인 페이지
│   └── globals.css         # 전역 스타일
├── components/
│   ├── layout/             # Header, Footer
│   ├── ui/                 # PopupModal 등
│   └── shared/             # Hero 등
├── lib/
│   ├── sanity/
│   │   ├── client.ts       # Sanity 클라이언트
│   │   ├── queries.ts      # GROQ 쿼리
│   │   └── schemas/        # 스키마 정의
│   │       ├── popup.ts
│   │       ├── ministry.ts
│   │       ├── album.ts
│   │       ├── sermon.ts
│   │       ├── news.ts
│   │       └── index.ts
│   └── utils/              # 유틸리티 함수
├── types/
│   └── sanity.ts           # Sanity 타입 정의
├── public/                 # 정적 파일
├── sanity.config.ts        # Sanity 설정
├── .env.local.example      # 환경 변수 예제
└── README.md
```

## 🎨 디자인

- **스타일**: 미니멀, 모던 (Wix 템플릿 2614 스타일)
- **주 색상**: 따뜻한 베이지 (#F5F5DC)
- **포인트 색상**: 딥 블루 (#2C3E50)
- **폰트**: Noto Sans KR

## 🔧 주요 기능

### ✅ 구현 완료
- [x] 반응형 헤더 (모바일 햄버거 메뉴)
- [x] 팝업 모달 (오늘 하루 보지 않기)
- [x] 메인 페이지 (Hero, 예배 시간, 설교, 사역, 갤러리, 공지)
- [x] 교회 소개 페이지
- [x] 교회 사역 페이지 (지그재그/그리드 레이아웃)
- [x] 활동 사진 갤러리 (앨범 + 라이트박스)
- [x] 설교 페이지
- [x] 교회 소식 페이지
- [x] 오시는 길 페이지
- [x] Sanity CMS 연동
- [x] Sanity Studio (/studio)

### 🔄 향후 구현 예정
- [ ] 실제 Sanity 데이터로 페이지 업데이트
- [ ] 설교 오디오/비디오 플레이어
- [ ] 지도 API 연동 (카카오맵/네이버맵)
- [ ] 이메일 구독 기능
- [ ] 페이지네이션
- [ ] 검색 기능 강화
- [ ] SEO 최적화
- [ ] 다국어 지원 (한/영)

## 🌐 배포

### Vercel 배포
1. [Vercel](https://vercel.com) 계정 생성
2. GitHub 저장소 연결
3. 환경 변수 설정 (Sanity API 정보)
4. 자동 배포

### 환경 변수 설정 (Vercel)
Vercel Dashboard → Settings → Environment Variables에서 설정:
```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
SANITY_API_TOKEN
```

## 📝 라이선스

© 2024 교회 이름. All rights reserved.

## 🤝 기여

프로젝트에 기여하고 싶으시다면 Pull Request를 보내주세요.

## 📧 문의

- 이메일: info@church.com
- 전화: 02-1234-5678

## 🆘 문제 해결

### Sanity Studio가 로드되지 않을 때
```bash
# 캐시 클리어
rm -rf .next
npm run dev
```

### 이미지가 표시되지 않을 때
1. Sanity Dashboard에서 CORS 설정 확인
2. Settings → API → CORS Origins
3. http://localhost:3000 추가

### 빌드 에러
```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```
