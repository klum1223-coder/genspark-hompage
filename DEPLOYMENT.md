# 🚀 주성성결교회 홈페이지 배포 가이드

## 📋 목차
1. [Vercel 배포](#vercel-배포)
2. [환경 변수 설정](#환경-변수-설정)
3. [도메인 연결](#도메인-연결)
4. [배포 후 체크리스트](#배포-후-체크리스트)

---

## 1. Vercel 배포

### 1.1 Vercel 계정 생성
1. https://vercel.com 접속
2. GitHub 계정으로 로그인
3. 무료 플랜 선택 (Hobby)

### 1.2 프로젝트 연결
1. Vercel 대시보드에서 "New Project" 클릭
2. GitHub 저장소 선택: `klum1223-coder/genspark-hompage`
3. Import 클릭

### 1.3 빌드 설정
```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
Node.js Version: 18.x
```

### 1.4 배포 실행
- "Deploy" 버튼 클릭
- 약 2-3분 후 배포 완료
- 자동 생성된 URL 확인 (예: `your-project.vercel.app`)

---

## 2. 환경 변수 설정

### 2.1 Vercel 대시보드에서 설정
1. 프로젝트 선택 → Settings → Environment Variables
2. 다음 환경 변수 추가:

#### 필수 환경 변수
```bash
# Sanity CMS (선택사항 - 현재는 localStorage 사용)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token

# Site URL
NEXT_PUBLIC_SITE_URL=https://joosungchurch.com
```

#### YouTube API (선택사항)
```bash
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CHANNEL_ID=your_channel_id
```

### 2.2 환경 변수 적용
- 환경 변수 추가 후 자동으로 재배포됩니다
- 또는 Deployments 탭에서 "Redeploy" 클릭

---

## 3. 도메인 연결

### 3.1 도메인 구매
- 추천: Hosting.kr, Gabia, AWS Route 53
- 도메인 예시: `joosungchurch.com`

### 3.2 Vercel에 도메인 추가
1. Vercel 프로젝트 → Settings → Domains
2. "Add Domain" 클릭
3. 구매한 도메인 입력 (예: `joosungchurch.com`)
4. "Add" 클릭

### 3.3 DNS 설정
Vercel이 제공하는 DNS 레코드를 도메인 제공업체에 추가:

#### A 레코드
```
Type: A
Name: @
Value: 76.76.21.21
```

#### CNAME 레코드 (www)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3.4 SSL 인증서
- Vercel이 자동으로 Let's Encrypt SSL 인증서 발급
- 약 24시간 내 HTTPS 적용 완료

---

## 4. 배포 후 체크리스트

### ✅ 기본 기능 확인
- [ ] 메인 페이지 정상 로딩
- [ ] 모든 메뉴 네비게이션 작동
- [ ] 이미지 최적화 확인 (WebP 형식)
- [ ] 폰트 정상 로딩

### ✅ 페이지별 확인
- [ ] **홈페이지**: Hero 섹션, 예배 시간, 최근 설교, 교회 사역, 교회 소식
- [ ] **교회 소개**: 비전/사명, 담임목사 소개, 교회 연혁, 우리의 믿음
- [ ] **설교**: 유튜브 영상 임베드, 설교 목록
- [ ] **교회 사역**: 사역 목록, 카테고리 필터
- [ ] **교회 소식**: 뉴스 목록, 카테고리 필터, 상세 모달
- [ ] **기도 요청**: 기도 목록, 공개/비공개 설정, 카테고리 필터
- [ ] **문의하기**: 연락처 정보, 지도
- [ ] **온라인 등록**: 등록 폼

### ✅ 관리자 페이지
- [ ] `/admin` 접속 정상
- [ ] 비밀번호 인증 (`joosung2025`)
- [ ] 모든 탭 정상 작동:
  - [ ] 교회 정보
  - [ ] 담임목사
  - [ ] 예배 시간
  - [ ] 교회 소개
  - [ ] 교회 사역
  - [ ] 교회 소식
  - [ ] 기도 요청
  - [ ] 설교
  - [ ] 팝업 배너
  - [ ] 메인 배너 (배경 설정)
  - [ ] 스타일 & 레이아웃
- [ ] 데이터 저장 및 로드 확인

### ✅ 반응형 확인
- [ ] **모바일** (375px ~ 767px)
  - [ ] 메뉴 햄버거 버튼 작동
  - [ ] 터치 스크롤 정상
  - [ ] 버튼 크기 44px 이상
  - [ ] 텍스트 가독성
- [ ] **태블릿** (768px ~ 1023px)
  - [ ] 레이아웃 정상
  - [ ] 그리드 시스템 작동
- [ ] **데스크톱** (1024px 이상)
  - [ ] 전체 레이아웃 최적화
  - [ ] 호버 효과 작동

### ✅ SEO 확인
- [ ] Google Search Console 등록
- [ ] Naver Search Advisor 등록
- [ ] `sitemap.xml` 접속 확인: `/sitemap.xml`
- [ ] `robots.txt` 접속 확인: `/robots.txt`
- [ ] 메타 태그 확인 (각 페이지)
- [ ] Open Graph 이미지 설정
- [ ] 구조화된 데이터 (JSON-LD) 확인

### ✅ 성능 확인
- [ ] **PageSpeed Insights** 테스트
  - 목표: 모바일 70+ / 데스크톱 90+
  - URL: https://pagespeed.web.dev/
- [ ] **Lighthouse** 점수
  - Performance: 90+
  - Accessibility: 90+
  - Best Practices: 90+
  - SEO: 100
- [ ] 이미지 지연 로딩 확인
- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Largest Contentful Paint (LCP) < 2.5s

### ✅ 보안 확인
- [ ] HTTPS 강제 리다이렉트
- [ ] 보안 헤더 설정 확인
- [ ] 환경 변수 노출 여부 확인
- [ ] 관리자 페이지 비밀번호 보호

### ✅ 브라우저 호환성
- [ ] Chrome (최신 버전)
- [ ] Safari (iOS 포함)
- [ ] Firefox
- [ ] Edge
- [ ] Samsung Internet (모바일)

---

## 5. 모니터링

### 5.1 Vercel Analytics 활성화
1. 프로젝트 → Analytics 탭
2. "Enable Analytics" 클릭
3. 방문자 수, 페이지 뷰, 성능 지표 확인

### 5.2 오류 모니터링
- Vercel 대시보드에서 실시간 로그 확인
- 빌드 실패 시 이메일 알림 설정

---

## 6. 자동 배포 설정

### GitHub 연동 후 자동 배포
- `main` 브랜치에 push → 자동 배포
- PR 생성 → 프리뷰 배포
- 배포 완료 후 Slack/Discord 알림 설정 가능

---

## 7. 백업 및 복구

### 7.1 데이터 백업
현재 데이터는 브라우저 localStorage에 저장됩니다:
- **권장**: 정기적으로 관리자 페이지에서 데이터 확인
- **백업 방법**: 
  1. 개발자 도구 (F12) 열기
  2. Application → Local Storage 클릭
  3. 각 key의 value 복사하여 텍스트 파일로 저장

### 7.2 Vercel 배포 롤백
1. Deployments 탭 열기
2. 이전 배포 버전 선택
3. "Promote to Production" 클릭

---

## 8. 문제 해결

### 배포 실패 시
```bash
# 로컬에서 빌드 테스트
npm run build

# 에러 확인
npm run lint
```

### 환경 변수 문제
- Vercel 대시보드에서 환경 변수 재확인
- 재배포 후 확인

### 캐시 문제
```bash
# Vercel 대시보드에서
Deployments → ... → Clear Cache and Redeploy
```

---

## 9. 추가 최적화

### 이미지 최적화
- 모든 이미지는 Next.js Image 컴포넌트 사용
- 자동으로 WebP/AVIF 형식 변환
- 지연 로딩 자동 적용

### 코드 스플리팅
- Next.js가 자동으로 페이지별 코드 분할
- dynamic import 사용 가능

---

## 📞 지원

문제가 발생하면:
1. Vercel 문서: https://vercel.com/docs
2. Next.js 문서: https://nextjs.org/docs
3. GitHub Issues: 저장소에 이슈 등록

---

## 📝 참고 링크

- **Vercel 대시보드**: https://vercel.com/dashboard
- **GitHub 저장소**: https://github.com/klum1223-coder/genspark-hompage
- **Google Search Console**: https://search.google.com/search-console
- **Naver Search Advisor**: https://searchadvisor.naver.com/
- **PageSpeed Insights**: https://pagespeed.web.dev/

---

**배포 성공을 기원합니다! 🎉**
