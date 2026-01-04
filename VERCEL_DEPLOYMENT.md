# 🚀 Vercel 배포 완전 가이드

주성성결교회 홈페이지를 Vercel에 배포하여 실제 접속 가능한 웹사이트로 만드는 방법을 단계별로 안내합니다.

---

## 📋 목차
1. [사전 준비](#사전-준비)
2. [Vercel 계정 생성](#step-1-vercel-계정-생성)
3. [프로젝트 Import](#step-2-프로젝트-import)
4. [빌드 설정](#step-3-빌드-설정)
5. [환경 변수 설정](#step-4-환경-변수-설정)
6. [배포 실행](#step-5-배포-실행)
7. [도메인 연결](#step-6-도메인-연결)
8. [배포 후 체크리스트](#step-7-배포-후-체크리스트)
9. [자동 배포 설정](#step-8-자동-배포-설정)
10. [문제 해결](#문제-해결)

---

## 사전 준비

### ✅ 필요한 것들
- [x] GitHub 계정
- [x] GitHub에 업로드된 프로젝트 (완료)
- [ ] Vercel 계정 (이제 생성할 예정)
- [ ] 도메인 (선택사항)

### ✅ 현재 상태 확인
```bash
# 프로젝트가 GitHub에 있는지 확인
저장소: https://github.com/klum1223-coder/genspark-hompage
브랜치: main
최신 커밋: 1a3353a
```

---

## STEP 1: Vercel 계정 생성

### 1.1 Vercel 웹사이트 접속
```
https://vercel.com
```

### 1.2 GitHub으로 로그인
1. **"Sign Up"** 버튼 클릭
2. **"Continue with GitHub"** 선택
3. GitHub 계정으로 로그인
4. Vercel 권한 승인:
   - ✅ Read access to code
   - ✅ Read access to repositories
   - ✅ Write access to deployments
5. **"Authorize Vercel"** 클릭

### 1.3 프로필 설정 (선택)
- Team Name: `주성성결교회` 또는 `Joosung Church`
- Username: 자동 생성됨

---

## STEP 2: 프로젝트 Import

### 2.1 대시보드 접속
로그인 후 자동으로 대시보드로 이동합니다.

### 2.2 새 프로젝트 추가
1. **"Add New..."** 버튼 클릭
2. **"Project"** 선택

### 2.3 GitHub 저장소 선택
1. **Import Git Repository** 섹션 찾기
2. 검색창에 `genspark-hompage` 입력
3. 또는 스크롤하여 `klum1223-coder/genspark-hompage` 찾기
4. **"Import"** 버튼 클릭

### 2.4 저장소 권한 (필요시)
처음 사용하는 경우 추가 권한 요청이 나타날 수 있습니다:
1. **"Adjust GitHub App Permissions"** 클릭
2. 저장소 선택 또는 **"All repositories"** 선택
3. **"Install"** 클릭

---

## STEP 3: 빌드 설정

### 3.1 프로젝트 설정 화면
Import 후 설정 화면이 나타납니다.

### 3.2 기본 설정 확인

#### Framework Preset
```
✅ Next.js (자동 감지됨)
```

#### Root Directory
```
✅ ./ (기본값 유지)
```

#### Build and Output Settings
```
Build Command:    npm run build (자동 설정)
Output Directory: .next (자동 설정)
Install Command:  npm install (자동 설정)
Development Command: npm run dev (자동 설정)
```

#### Node.js Version
```
✅ 18.x (권장)
또는 20.x
```

### 3.3 설정 확인
모든 설정이 자동으로 감지되었으면 **다음 단계로 진행**합니다.

---

## STEP 4: 환경 변수 설정

### 4.1 환경 변수란?
API 키, 데이터베이스 URL 등 민감한 정보를 안전하게 저장하는 방법입니다.

### 4.2 현재 프로젝트의 환경 변수
주성성결교회 홈페이지는 **현재 localStorage를 사용**하므로 환경 변수가 **선택사항**입니다.

#### 필수 환경 변수 (없음)
```
현재 프로젝트는 환경 변수 없이 작동합니다.
```

#### 선택적 환경 변수 (향후 사용)
Sanity CMS를 연동하거나 YouTube API를 사용하려면:

```bash
# Sanity CMS (선택)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# YouTube API (선택)
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CHANNEL_ID=your_channel_id

# Site URL (권장)
NEXT_PUBLIC_SITE_URL=https://joosungchurch.com
```

### 4.3 환경 변수 추가 방법

#### 방법 1: 배포 시 추가
1. Configure Project 화면에서 아래로 스크롤
2. **"Environment Variables"** 섹션 찾기
3. **"Add"** 버튼 클릭
4. Name & Value 입력
5. Environment 선택:
   - ✅ Production
   - ✅ Preview
   - ✅ Development (선택)

**예시**:
```
Name:  NEXT_PUBLIC_SITE_URL
Value: https://your-project.vercel.app
Environment: Production, Preview
```

#### 방법 2: 배포 후 추가
1. 프로젝트 대시보드 → **"Settings"**
2. **"Environment Variables"** 탭
3. **"Add New"** 클릭
4. Name, Value, Environment 입력
5. **"Save"** 클릭

### 4.4 현재 프로젝트 권장 설정
**지금은 환경 변수 없이 배포해도 됩니다!**

나중에 필요하면 추가할 수 있습니다.

---

## STEP 5: 배포 실행

### 5.1 배포 시작
Configure Project 화면에서:
1. 모든 설정 확인
2. **"Deploy"** 버튼 클릭 🚀

### 5.2 배포 과정 (약 2-3분)
```
⏳ Building...
   ├─ Installing dependencies (30초)
   ├─ Building application (1-2분)
   └─ Deploying to edge network (30초)
```

### 5.3 배포 진행 상황 확인
실시간 로그가 표시됩니다:
```bash
[00:00:10] Installing dependencies...
[00:00:30] npm install completed
[00:00:35] Building Next.js application...
[00:01:20] Compiled successfully
[00:01:45] Generating static pages...
[00:02:00] ✓ Build completed
[00:02:15] Deploying to production...
[00:02:30] ✅ Deployment ready!
```

### 5.4 배포 완료 🎉
```
✅ Deployment successful!

Your project is live at:
https://genspark-hompage-xxxxx.vercel.app
```

---

## STEP 6: 도메인 연결

### 6.1 기본 URL
Vercel이 자동으로 URL을 생성합니다:
```
https://genspark-hompage-xxxxx.vercel.app
```

### 6.2 커스텀 도메인 추가 (선택)

#### 도메인이 있는 경우
1. 프로젝트 대시보드 → **"Settings"**
2. **"Domains"** 탭
3. **"Add"** 버튼 클릭
4. 도메인 입력: `joosungchurch.com`
5. **"Add"** 클릭

#### DNS 설정
Vercel이 DNS 레코드를 안내합니다:

**A 레코드**:
```
Type:  A
Name:  @
Value: 76.76.21.21
TTL:   Auto
```

**CNAME 레코드** (www):
```
Type:  CNAME
Name:  www
Value: cname.vercel-dns.com
TTL:   Auto
```

#### DNS 제공업체에서 설정
1. 도메인 제공업체 로그인 (Gabia, Hosting.kr 등)
2. DNS 관리 페이지 이동
3. 위 레코드 추가
4. 저장

#### SSL 인증서
- Vercel이 자동으로 Let's Encrypt SSL 발급
- 약 24시간 내 HTTPS 적용 완료

### 6.3 도메인 없는 경우
Vercel 기본 URL로도 충분히 사용 가능합니다!
```
https://genspark-hompage.vercel.app
```

---

## STEP 7: 배포 후 체크리스트

### ✅ 기본 기능 확인

#### 1. 메인 페이지
```
URL: https://your-project.vercel.app
```
- [ ] Hero 섹션 정상 표시
- [ ] 예배 시간 표시
- [ ] 최근 설교 목록 (3개)
- [ ] 교회 사역 미리보기 (3개)
- [ ] 교회 소식 미리보기 (3개)
- [ ] Footer 정보 정확

#### 2. 모든 페이지 접속
- [ ] `/about` - 교회 소개
- [ ] `/sermon` - 설교
- [ ] `/ministry` - 교회 사역
- [ ] `/news` - 교회 소식
- [ ] `/prayer` - 기도 요청
- [ ] `/contact` - 문의하기
- [ ] `/register` - 온라인 등록
- [ ] `/admin` - 관리자 페이지

#### 3. 관리자 페이지
```
URL: https://your-project.vercel.app/admin
비밀번호: joosung2025
```
- [ ] 로그인 성공
- [ ] 모든 탭 표시
- [ ] 데이터 저장 작동
- [ ] 메인 페이지 반영 확인

#### 4. 반응형 테스트
- [ ] 모바일 (375px): 햄버거 메뉴 작동
- [ ] 태블릿 (768px): 레이아웃 정상
- [ ] 데스크톱 (1024px+): 전체 디자인 정상

### ✅ 성능 확인

#### PageSpeed Insights
```
URL: https://pagespeed.web.dev/
```
1. Vercel URL 입력
2. "Analyze" 클릭
3. 점수 확인:
   - 목표: 모바일 70+, 데스크톱 90+

#### Lighthouse (Chrome DevTools)
1. F12 → Lighthouse 탭
2. "Analyze page load" 클릭
3. 점수 확인:
   - Performance: 90+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 100

### ✅ SEO 확인
- [ ] `/sitemap.xml` 접속 가능
- [ ] `/robots.txt` 접속 가능
- [ ] 페이지 제목 표시
- [ ] Open Graph 메타 태그

### ✅ 보안 확인
- [ ] HTTPS 적용
- [ ] 보안 헤더 설정
- [ ] .env 파일 노출 없음

---

## STEP 8: 자동 배포 설정

### 8.1 Git Push 자동 배포
Vercel이 자동으로 설정됩니다:
```
✅ main 브랜치 push → Production 배포
✅ 다른 브랜치 push → Preview 배포
✅ Pull Request → Preview 배포
```

### 8.2 확인 방법
```bash
# 로컬에서 코드 수정
vim app/page.tsx

# 커밋 및 푸시
git add -A
git commit -m "feat: 메인 페이지 업데이트"
git push origin main

# Vercel이 자동으로 감지하고 배포 시작
# 약 2-3분 후 배포 완료
```

### 8.3 배포 알림 설정
1. 프로젝트 → **"Settings"** → **"Notifications"**
2. Email 알림 활성화:
   - ✅ Deployment Started
   - ✅ Deployment Ready
   - ✅ Deployment Failed
3. Slack/Discord 연동 (선택)

---

## 문제 해결

### Q1. 빌드가 실패했어요
```bash
# 로컬에서 빌드 테스트
cd /home/user/webapp
npm run build

# 에러 메시지 확인
# 수정 후 다시 푸시
```

**일반적인 원인**:
- TypeScript 타입 오류
- 의존성 버전 충돌
- 환경 변수 누락

### Q2. 페이지가 404 에러를 표시해요
```bash
# next.config.js 확인
# vercel.json 확인
# 라우팅 설정 확인
```

### Q3. 환경 변수가 적용되지 않아요
```bash
# Vercel 대시보드에서 확인
Settings → Environment Variables

# 변수 이름 확인 (NEXT_PUBLIC_ 접두사 필요)
NEXT_PUBLIC_SITE_URL (O)
SITE_URL (X - 클라이언트에서 접근 불가)

# 재배포
Deployments → ... → Redeploy
```

### Q4. 배포는 성공했는데 사이트가 느려요
```bash
# Vercel Analytics 확인
프로젝트 → Analytics

# 이미지 최적화 확인
# 코드 스플리팅 확인
# 캐시 설정 확인
```

### Q5. 도메인 연결이 안 돼요
```bash
# DNS 전파 확인 (최대 24-48시간)
https://dnschecker.org

# DNS 레코드 확인
A 레코드: 76.76.21.21
CNAME: cname.vercel-dns.com

# Vercel에서 도메인 상태 확인
Settings → Domains → Status
```

### Q6. 관리자 페이지가 작동하지 않아요
```bash
# localStorage 작동 확인
# 브라우저 쿠키 설정 확인
# 비밀번호 확인: joosung2025

# 브라우저 캐시 클리어
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)
```

---

## 추가 최적화

### 1. Vercel Analytics 활성화
```
프로젝트 → Analytics → Enable Analytics
```
- 실시간 방문자 수
- 페이지 뷰
- 성능 지표

### 2. Speed Insights
```
프로젝트 → Speed Insights → Enable
```
- Core Web Vitals
- Real User Monitoring (RUM)

### 3. 캐시 설정
`vercel.json`에 이미 설정되어 있습니다:
```json
{
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 배포 명령어 정리

### Vercel CLI 설치 (선택)
```bash
npm install -g vercel

# 로그인
vercel login

# 로컬에서 배포
vercel

# 프로덕션 배포
vercel --prod
```

### GitHub에서 수동 배포 트리거
```bash
# 빈 커밋으로 배포 트리거
git commit --allow-empty -m "chore: trigger deployment"
git push origin main
```

---

## 배포 체크리스트 (요약)

### 배포 전
- [x] GitHub에 코드 업로드
- [x] .gitignore 설정
- [x] 환경 변수 확인
- [ ] Vercel 계정 생성

### 배포 중
- [ ] 프로젝트 Import
- [ ] 빌드 설정 확인
- [ ] 환경 변수 설정 (선택)
- [ ] 배포 실행

### 배포 후
- [ ] 모든 페이지 접속 확인
- [ ] 관리자 페이지 테스트
- [ ] 모바일 반응형 확인
- [ ] 성능 테스트 (PageSpeed Insights)
- [ ] SEO 확인 (sitemap.xml, robots.txt)
- [ ] 도메인 연결 (선택)

---

## 🎉 축하합니다!

주성성결교회 홈페이지가 성공적으로 배포되었습니다!

### 배포된 사이트
```
https://your-project.vercel.app
```

### 관리자 페이지
```
https://your-project.vercel.app/admin
비밀번호: joosung2025
```

### 다음 단계
1. ✅ 도메인 연결 (선택)
2. ✅ Google Search Console 등록
3. ✅ Naver Search Advisor 등록
4. ✅ 정기 모니터링 설정

---

## 📞 지원

### Vercel 문서
- https://vercel.com/docs

### 문의
- GitHub Issues
- Email: klum3@naver.com

---

**배포 성공을 기원합니다! 🚀**

*최종 업데이트: 2026년 1월 4일*
