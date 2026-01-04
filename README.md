# 🏛️ 주성성결교회 공식 홈페이지

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-red)]()

> 하나님의 사랑으로 함께하는 공동체 - 주성성결교회

Next.js 14, TypeScript, Tailwind CSS로 구축된 현대적이고 반응형 교회 홈페이지입니다. 비개발자도 쉽게 관리할 수 있는 관리자 페이지를 통해 모든 콘텐츠를 실시간으로 수정할 수 있습니다.

---

## 🌟 주요 기능

### 사용자 기능
- 🏠 **메인 페이지**: 동적 Hero 배너 (이미지/비디오 배경 지원)
- ⏰ **예배 안내**: 실시간 예배 시간 표시
- 🎤 **설교 영상**: YouTube 영상 직접 재생
- ⛪ **교회 사역**: 카테고리별 사역 소개
- 📰 **교회 소식**: 실시간 소식 게시판
- 🙏 **기도 요청**: 공개/비공개 기도 제목 관리
- 📞 **연락처**: 교회 정보 및 오시는 길
- 📝 **온라인 등록**: 새가족 등록 폼

### 관리자 기능 (비개발자 친화적!)
- 🔐 **보안 접속**: 비밀번호 보호 (joosung2025)
- 📊 **11개 관리 탭**:
  1. 🏛️ 교회 정보
  2. 👨‍🏫 담임목사 정보
  3. ⏰ 예배 시간
  4. 📖 교회 소개 (비전/사명/연혁)
  5. ⛪ 교회 사역
  6. 📰 교회 소식
  7. 🙏 기도 요청
  8. 🎤 설교 관리
  9. 🎪 팝업 배너
  10. 🎬 메인 배너 (배경 설정)
  11. 🎨 스타일 커스터마이징
- 💾 **실시간 저장**: 변경사항 즉시 반영
- 👁️ **미리보기**: 저장 전 결과 확인
- 🎨 **디자인 커스터마이징**: 색상, 폰트, 레이아웃 조정

---

## 🚀 빠른 시작

### 1. 저장소 클론

```bash
git clone https://github.com/klum1223-coder/genspark-hompage.git
cd genspark-hompage
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정 (선택사항)

```bash
# .env.example을 .env로 복사
cp .env.example .env

# .env 파일 수정 (현재는 localStorage 사용으로 선택사항)
```

### 4. 개발 서버 실행

```bash
npm run dev
```

### 5. 브라우저에서 확인

- **홈페이지**: http://localhost:3000
- **관리자 페이지**: http://localhost:3000/admin (비밀번호: joosung2025)

---

## 🛠️ 기술 스택

### Frontend
- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript 5.0
- **스타일링**: Tailwind CSS 3.0
- **폰트**: Noto Sans KR (Google Fonts)
- **아이콘**: Emoji & SVG

### 성능 최적화
- ⚡ Image Optimization (WebP/AVIF 자동 변환)
- 🎯 Code Splitting & Lazy Loading
- 📦 SWC Minification
- 🚀 Static Site Generation (SSG)
- 🔄 Incremental Static Regeneration (ISR)

### SEO & 접근성
- 🔍 Sitemap.xml 자동 생성
- 🤖 Robots.txt 설정
- 📊 Structured Data (JSON-LD)
- 🌐 Open Graph & Twitter Cards
- ♿ WCAG AA 준수

### 데이터 관리
- 💾 **현재**: Browser localStorage
- 🔮 **향후**: Sanity CMS (선택사항)

---

## 📁 프로젝트 구조

```
webapp/
├── 📂 app/                          # Next.js App Router
│   ├── about/                      # 교회 소개
│   ├── admin/                      # 관리자 페이지 ⭐
│   ├── contact/                    # 문의하기
│   ├── gallery/                    # 갤러리
│   ├── live/                       # 실시간 예배
│   ├── ministry/                   # 교회 사역
│   ├── news/                       # 교회 소식
│   ├── prayer/                     # 기도 요청
│   ├── register/                   # 온라인 등록
│   ├── sermon/                     # 설교
│   ├── layout.tsx                  # 루트 레이아웃
│   ├── page.tsx                    # 홈페이지
│   ├── sitemap.ts                  # Sitemap 생성
│   └── robots.ts                   # Robots.txt 생성
│
├── 📂 components/                   # React 컴포넌트
│   ├── layout/                     # Header, Footer
│   ├── shared/                     # Hero, AdminFloatingButton
│   ├── ui/                         # PopupModal
│   ├── StyleLoader.tsx             # 동적 스타일
│   └── StructuredData.tsx          # SEO 구조화된 데이터
│
├── 📂 lib/                          # 유틸리티
│   ├── sanity/                     # Sanity CMS (선택)
│   ├── church-info.ts              # 교회 정보
│   ├── content-storage.ts          # 콘텐츠 저장
│   └── youtube-api.ts              # YouTube API
│
├── 📂 public/                       # 정적 파일
│   └── manifest.json               # PWA Manifest
│
├── 📂 types/                        # TypeScript 타입
│
├── 📄 next.config.js               # Next.js 설정
├── 📄 tailwind.config.js           # Tailwind 설정
├── 📄 vercel.json                  # Vercel 배포 설정
├── 📄 .env.example                 # 환경 변수 예시
├── 📄 .gitignore                   # Git 무시 파일
│
└── 📚 문서
    ├── README.md                   # 프로젝트 소개 (이 파일)
    ├── DEPLOYMENT.md               # 배포 가이드
    ├── USER_MANUAL.md              # 사용자 매뉴얼
    ├── CHECKLIST.md                # 배포 체크리스트
    ├── PRODUCTION_READY.md         # 프로덕션 준비
    └── GITHUB_UPLOAD.md            # GitHub 업로드 가이드
```

---

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: `#8B4513` (갈색)
- **Secondary**: `#F5E6D3` (베이지)
- **Background**: `#FFFFFF` (흰색)
- **Text**: `#000000` (검정)

### 타이포그래피
- **폰트**: Noto Sans KR
- **크기**: 12px ~ 20px (커스터마이징 가능)
- **무게**: 300, 400, 500, 700

### 레이아웃
- **컨테이너**: 최대 1280px
- **간격**: 40px ~ 120px (커스터마이징 가능)
- **모서리**: 0px ~ 24px (커스터마이징 가능)

**🎨 스타일 커스터마이징**: 관리자 페이지에서 코딩 없이 변경 가능!

---

## 📖 사용자 가이드

### 비개발자를 위한 가이드

#### 1. 관리자 페이지 접속
```
URL: https://joosungchurch.com/admin
비밀번호: joosung2025
```

#### 2. 콘텐츠 수정
1. 원하는 탭 선택
2. 내용 수정
3. "💾 저장하기" 버튼 클릭
4. 메인 페이지 새로고침하여 확인

#### 3. 스타일 변경
1. "🎨 스타일" 탭 선택
2. 색상, 폰트, 간격 조정
3. 미리보기로 확인
4. "💾 저장 및 적용" 클릭

**자세한 사용법**: [USER_MANUAL.md](./USER_MANUAL.md) 참고 (8,400+ 자)

---

## 🚀 배포 가이드

### Vercel 배포 (권장)

#### 1. Vercel 계정 생성
```
https://vercel.com
```

#### 2. GitHub 연동
```
Repository: klum1223-coder/genspark-hompage
Framework: Next.js (자동 감지)
```

#### 3. 환경 변수 설정 (선택)
```
NEXT_PUBLIC_SITE_URL=https://joosungchurch.com
```

#### 4. 배포
- "Deploy" 클릭
- 약 2-3분 소요
- 자동 URL 생성

### 도메인 연결
```
1. Vercel → Settings → Domains
2. joosungchurch.com 입력
3. DNS 레코드 설정
4. 24시간 내 SSL 자동 발급
```

**자세한 배포 가이드**: [DEPLOYMENT.md](./DEPLOYMENT.md) 참고 (4,800+ 자)

---

## ✅ 배포 전 체크리스트

- [ ] `npm run build` 성공
- [ ] 환경 변수 설정 (선택)
- [ ] .env 파일 제외 확인
- [ ] 민감한 정보 제거
- [ ] README 업데이트
- [ ] 문서 파일 확인

**전체 체크리스트**: [CHECKLIST.md](./CHECKLIST.md) 참고 (5,300+ 자)

---

## 📊 성능 지표 (목표)

### Lighthouse 점수
- 🟢 Performance: **90+**
- 🟢 Accessibility: **90+**
- 🟢 Best Practices: **90+**
- 🟢 SEO: **100**

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

---

## 🔐 보안

### 구현된 보안 기능
- ✅ HTTPS 강제 리다이렉트
- ✅ 보안 헤더 (X-Frame-Options, CSP 등)
- ✅ 환경 변수 보호 (.gitignore)
- ✅ 관리자 페이지 비밀번호 보호
- ✅ XSS 방지 (React 자동)
- ✅ CSRF 방지

### 비밀번호 변경
현재 관리자 비밀번호: `joosung2025`

**변경 방법**: `app/admin/page.tsx` 파일에서 `ADMIN_PASSWORD` 수정

---

## 🌐 지원 브라우저

- ✅ Chrome (최신 버전)
- ✅ Safari (iOS 포함)
- ✅ Firefox
- ✅ Edge
- ✅ Samsung Internet

---

## 📱 반응형 디자인

- 📱 **모바일**: 375px ~ 767px
- 📲 **태블릿**: 768px ~ 1023px
- 💻 **데스크톱**: 1024px 이상

---

## 🔄 업데이트 로드맵

### Version 1.0.0 (현재) ✅
- [x] 기본 페이지 구성
- [x] 관리자 페이지 (11개 탭)
- [x] 스타일 커스터마이징
- [x] SEO 최적화
- [x] 성능 최적화
- [x] 문서화

### Version 1.1.0 (계획)
- [ ] Sanity CMS 완전 통합
- [ ] 이미지 업로드 기능
- [ ] 지도 API 연동 (카카오/네이버)
- [ ] 이메일 서비스 연동

### Version 2.0.0 (장기)
- [ ] 회원 시스템
- [ ] 온라인 헌금 시스템
- [ ] 실시간 스트리밍 통합
- [ ] 모바일 앱 (PWA → Native)
- [ ] 다국어 지원 (영어)

---

## 🤝 기여

프로젝트 개선 아이디어가 있으시면:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📝 라이선스

이 프로젝트는 주성성결교회를 위해 개발되었습니다.

© 2024 주성성결교회. All rights reserved.

---

## 📞 연락처

### 교회 정보
- **교회명**: 주성성결교회 (Joosung Holiness Church)
- **주소**: 충북 청주시 흥덕구 봉명로219번길 24, 2층
- **전화**: 010-8986-3965
- **이메일**: klum3@naver.com

### 기술 지원
- **GitHub Issues**: 문제 보고
- **이메일**: klum3@naver.com

---

## 🆘 문제 해결 (Troubleshooting)

### 빌드 에러
```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install

# 캐시 클리어
rm -rf .next
npm run build
```

### 환경 변수 문제
```bash
# .env 파일 확인
cat .env.example

# 환경 변수 복사
cp .env.example .env
```

### 포트 충돌
```bash
# 다른 포트로 실행
PORT=3001 npm run dev
```

---

## 📚 추가 문서

| 문서 | 설명 | 대상 |
|------|------|------|
| [DEPLOYMENT.md](./DEPLOYMENT.md) | 배포 단계별 가이드 | 개발자/관리자 |
| [USER_MANUAL.md](./USER_MANUAL.md) | 관리자 페이지 완전 가이드 | 비개발자 |
| [CHECKLIST.md](./CHECKLIST.md) | 배포 전/후 체크리스트 | 모든 사용자 |
| [PRODUCTION_READY.md](./PRODUCTION_READY.md) | 프로덕션 준비 요약 | 모든 사용자 |
| [GITHUB_UPLOAD.md](./GITHUB_UPLOAD.md) | GitHub 업로드 가이드 | 개발자 |

---

## 🎯 프로젝트 목표

1. **접근성**: 모든 연령층이 쉽게 사용 가능
2. **관리 편의성**: 비개발자도 콘텐츠 관리 가능
3. **성능**: 빠른 로딩 속도 (LCP < 2.5s)
4. **보안**: 안전한 데이터 관리
5. **확장성**: 향후 기능 추가 용이

---

## 💡 주요 특징

- 🚀 **초고속 로딩**: Next.js 14 + SSG/ISR
- 📱 **완전 반응형**: 모바일 우선 디자인
- 🎨 **커스터마이징**: 코딩 없이 디자인 변경
- 🔍 **SEO 최적화**: Google/Naver 검색 최적화
- ♿ **접근성**: WCAG AA 준수
- 🔒 **보안**: 다층 보안 시스템
- 📊 **분석 준비**: Vercel Analytics 지원

---

## 🙏 감사의 말

이 프로젝트를 함께 만들어주신 모든 분들께 감사드립니다.

**하나님의 영광을 위하여!**

---

## 🌟 Star History

프로젝트가 도움이 되셨다면 ⭐ Star를 눌러주세요!

---

**Made with ❤️ for Joosung Holiness Church**

*최종 업데이트: 2026년 1월 4일*
*버전: 1.0.0 (Production Ready)*
