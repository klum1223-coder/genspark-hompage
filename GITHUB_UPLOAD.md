# 🚀 GitHub 업로드 완전 가이드

이 문서는 주성성결교회 홈페이지 프로젝트를 GitHub에 안전하게 업로드하는 방법을 안내합니다.

---

## 📁 프로젝트 파일 구조

```
webapp/
├── 📂 app/                          # Next.js App Router
│   ├── about/                      # 교회 소개 페이지
│   ├── admin/                      # 관리자 페이지 ⭐
│   ├── contact/                    # 문의하기 페이지
│   ├── gallery/                    # 갤러리 페이지
│   ├── live/                       # 실시간 예배 페이지
│   ├── ministry/                   # 교회 사역 페이지
│   ├── news/                       # 교회 소식 페이지
│   ├── prayer/                     # 기도 요청 페이지
│   ├── register/                   # 온라인 등록 페이지
│   ├── sermon/                     # 설교 페이지
│   ├── studio.disabled/            # Sanity Studio (비활성화)
│   ├── globals.css                 # 전역 스타일
│   ├── layout.tsx                  # 루트 레이아웃
│   ├── page.tsx                    # 홈페이지
│   ├── robots.ts                   # robots.txt 생성
│   └── sitemap.ts                  # sitemap.xml 생성
│
├── 📂 components/                   # React 컴포넌트
│   ├── layout/                     # 레이아웃 컴포넌트
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── shared/                     # 공유 컴포넌트
│   │   ├── Hero.tsx
│   │   ├── PortableText.tsx
│   │   └── AdminFloatingButton.tsx
│   ├── ui/                         # UI 컴포넌트
│   │   └── PopupModal.tsx
│   ├── StyleLoader.tsx             # 동적 스타일 로더
│   └── StructuredData.tsx          # SEO 구조화된 데이터
│
├── 📂 lib/                          # 유틸리티 라이브러리
│   ├── sanity/                     # Sanity CMS 관련
│   │   ├── schemas/                # 스키마 정의
│   │   ├── client.ts               # Sanity 클라이언트
│   │   └── queries.ts              # GraphQL 쿼리
│   ├── church-info.ts              # 교회 정보
│   ├── content-storage.ts          # 콘텐츠 저장소
│   ├── popup-data.ts               # 팝업 데이터
│   └── youtube-api.ts              # YouTube API
│
├── 📂 public/                       # 정적 파일
│   └── manifest.json               # PWA Manifest
│
├── 📂 types/                        # TypeScript 타입
│   └── sanity.ts
│
├── 📄 next.config.js               # Next.js 설정
├── 📄 tailwind.config.js           # Tailwind CSS 설정
├── 📄 tsconfig.json                # TypeScript 설정
├── 📄 package.json                 # 의존성 관리
├── 📄 vercel.json                  # Vercel 배포 설정
├── 📄 .env.example                 # 환경 변수 예시 ⭐
├── 📄 .gitignore                   # Git 무시 파일
│
└── 📚 문서 파일
    ├── README.md                   # 프로젝트 소개
    ├── DEPLOYMENT.md               # 배포 가이드
    ├── USER_MANUAL.md              # 사용자 매뉴얼
    ├── CHECKLIST.md                # 체크리스트
    ├── PRODUCTION_READY.md         # 프로덕션 준비
    └── GITHUB_UPLOAD.md            # 이 파일
```

---

## 🔐 환경 변수 보안 처리

### 1. 현재 환경 변수 확인

```bash
# .env 파일이 있는지 확인
ls -la | grep .env
```

### 2. .env.example 파일 확인

이미 생성되어 있습니다:
```
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here

# YouTube API (Optional)
YOUTUBE_API_KEY=your_youtube_api_key_here
YOUTUBE_CHANNEL_ID=your_channel_id_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://joosungchurch.com

# Admin Password (stored in localStorage, not environment variable)
# Password: joosung2025
```

### 3. .gitignore 확인

이미 안전하게 설정되어 있습니다:
```
.env*.local
.env
```

✅ **보안 상태**: 실제 환경 변수는 Git에 업로드되지 않습니다!

---

## 🎯 GitHub 업로드 단계별 가이드

### ✅ STEP 1: 현재 Git 상태 확인

```bash
# 작업 디렉토리로 이동
cd /home/user/webapp

# Git 상태 확인
git status

# 원격 저장소 확인
git remote -v
```

**예상 결과**:
```
origin  https://github.com/klum1223-coder/genspark-hompage.git (fetch)
origin  https://github.com/klum1223-coder/genspark-hompage.git (push)
```

✅ **이미 GitHub 저장소에 연결되어 있습니다!**

---

### ✅ STEP 2: 업로드할 파일 확인

```bash
# 추적 중인 파일 목록
git ls-files

# 변경된 파일 확인
git status
```

---

### ✅ STEP 3: 최종 커밋 및 푸시

```bash
# 모든 변경사항 스테이징
git add -A

# 커밋 메시지와 함께 커밋
git commit -m "feat: 프로덕션 배포 준비 완료 - 전체 프로젝트"

# GitHub에 푸시
git push origin main
```

**완료!** 🎉

---

## 🌐 GitHub 저장소 접속

### 저장소 URL
```
https://github.com/klum1223-coder/genspark-hompage
```

### 확인 사항
1. ✅ 모든 파일이 업로드되었는지 확인
2. ✅ README.md가 제대로 표시되는지 확인
3. ✅ .env 파일이 업로드되지 않았는지 확인 (보안)
4. ✅ 문서 파일들이 모두 보이는지 확인

---

## 🔒 보안 체크리스트

### 절대 업로드하면 안 되는 파일들
- ❌ `.env` (실제 환경 변수)
- ❌ `.env.local`
- ❌ `*.pem` (인증서 파일)
- ❌ `node_modules/` (의존성 폴더)
- ❌ `.next/` (빌드 파일)
- ❌ 개인 API 키가 포함된 파일

### 업로드해도 되는 파일들
- ✅ `.env.example` (예시 환경 변수)
- ✅ 소스 코드 (`.tsx`, `.ts`, `.js`)
- ✅ 스타일 파일 (`.css`)
- ✅ 설정 파일 (`next.config.js`, `tailwind.config.js`)
- ✅ 문서 파일 (`.md`)
- ✅ 공개 파일 (`public/` 폴더)

---

## 📝 .gitignore 상세 설명

```bash
# 의존성 (외부 라이브러리)
/node_modules          # npm 패키지들
/.pnp                  # Yarn PnP
.pnp.js

# 테스트
/coverage              # 테스트 커버리지 리포트

# Next.js 빌드 파일
/.next/                # Next.js 빌드 결과물
/out/                  # Static export 결과물

# 프로덕션 빌드
/build

# 운영체제 파일
.DS_Store              # macOS 시스템 파일
*.pem                  # 인증서 파일

# 디버그 로그
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# 환경 변수 (중요!)
.env*.local            # 로컬 환경 변수
.env                   # 실제 환경 변수

# Vercel
.vercel                # Vercel 배포 정보

# TypeScript
*.tsbuildinfo          # TypeScript 빌드 정보
next-env.d.ts          # Next.js TypeScript 정의

# Sanity
.sanity                # Sanity 설정
core                   # Sanity 코어 파일
```

---

## 🆕 새 GitHub 저장소 생성 (참고)

**현재는 이미 저장소가 있으므로 건너뛰세요!**

만약 새로 만들어야 한다면:

### 1. GitHub에서 저장소 생성
1. https://github.com 접속
2. 오른쪽 상단 "+" → "New repository"
3. 저장소 이름: `joosung-church-website`
4. Description: `주성성결교회 공식 홈페이지`
5. Public/Private 선택
6. **❌ README, .gitignore 추가하지 않기** (이미 있음)
7. "Create repository" 클릭

### 2. 로컬 저장소와 연결
```bash
# 현재 원격 저장소 제거 (필요시)
git remote remove origin

# 새 원격 저장소 추가
git remote add origin https://github.com/USERNAME/REPOSITORY.git

# 브랜치 이름 변경 (필요시)
git branch -M main

# 첫 푸시
git push -u origin main
```

---

## 🔑 GitHub Personal Access Token (PAT) 설정

### 1. Token 생성
1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. "Generate new token (classic)"
4. Note: "Joosung Church Website"
5. Expiration: "90 days" 또는 "No expiration"
6. Select scopes: ✅ **repo** (전체 선택)
7. "Generate token" 클릭
8. 🔴 **토큰 복사** (한 번만 표시됨!)

### 2. Token으로 인증
```bash
# HTTPS로 푸시할 때
git push https://YOUR_TOKEN@github.com/klum1223-coder/genspark-hompage.git main

# 또는 원격 URL에 토큰 포함
git remote set-url origin https://YOUR_TOKEN@github.com/klum1223-coder/genspark-hompage.git
git push origin main
```

---

## 📚 업로드 후 확인 사항

### GitHub에서 확인
1. ✅ README.md가 잘 표시되는가?
2. ✅ 모든 폴더가 보이는가?
3. ✅ 최신 커밋 메시지가 정확한가?
4. ✅ .env 파일이 보이지 않는가? (보안)

### 로컬에서 확인
```bash
# 최신 상태 확인
git status

# 커밋 히스토리
git log --oneline -10

# 원격 브랜치와 동기화 상태
git remote show origin
```

---

## 🔄 지속적인 업데이트 방법

### 일상적인 작업 흐름

```bash
# 1. 코드 수정 후
git add -A

# 2. 커밋
git commit -m "feat: 새로운 기능 추가"

# 3. 푸시
git push origin main
```

### 커밋 메시지 작성 규칙

```bash
# 새 기능
git commit -m "feat: 관리자 페이지에 통계 기능 추가"

# 버그 수정
git commit -m "fix: 모바일 레이아웃 깨짐 현상 수정"

# 문서 업데이트
git commit -m "docs: README 사용법 추가"

# 스타일 변경
git commit -m "style: 버튼 색상 변경"

# 리팩토링
git commit -m "refactor: 컴포넌트 구조 개선"

# 성능 개선
git commit -m "perf: 이미지 최적화"

# 테스트
git commit -m "test: 로그인 기능 테스트 추가"

# 빌드 설정
git commit -m "chore: 빌드 스크립트 업데이트"
```

---

## 🚨 문제 해결 (Troubleshooting)

### Q1. 푸시가 거부당했어요 (rejected)
```bash
# 원격 저장소의 변경사항을 먼저 가져오기
git pull origin main --rebase

# 충돌 해결 후
git push origin main
```

### Q2. 커밋을 취소하고 싶어요
```bash
# 마지막 커밋 취소 (파일은 유지)
git reset --soft HEAD~1

# 마지막 커밋 완전 삭제
git reset --hard HEAD~1
```

### Q3. 특정 파일을 Git에서 제거하고 싶어요
```bash
# Git 추적 중단 (파일은 유지)
git rm --cached filename

# 디렉토리 제거
git rm --cached -r directory/

# 커밋 및 푸시
git commit -m "chore: 불필요한 파일 제거"
git push origin main
```

### Q4. .env 파일을 실수로 커밋했어요!
```bash
# 즉시 히스토리에서 제거
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# 강제 푸시
git push origin main --force

# .gitignore에 추가 (이미 되어 있음)
echo ".env" >> .gitignore
git add .gitignore
git commit -m "chore: .gitignore에 .env 추가"
git push origin main
```

---

## 📦 프로젝트 클론 방법

다른 컴퓨터에서 프로젝트를 가져오려면:

```bash
# 저장소 클론
git clone https://github.com/klum1223-coder/genspark-hompage.git

# 디렉토리 이동
cd genspark-hompage

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일 수정 (실제 값 입력)

# 개발 서버 실행
npm run dev
```

---

## 🎯 GitHub Actions (자동 배포)

향후 자동 배포를 원하면 `.github/workflows/deploy.yml` 생성:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📊 저장소 관리 팁

### 1. 브랜치 전략
```bash
# 기능 개발용 브랜치 생성
git checkout -b feature/new-feature

# 수정 후 커밋
git add .
git commit -m "feat: 새 기능 추가"

# 메인 브랜치에 병합
git checkout main
git merge feature/new-feature

# 브랜치 삭제
git branch -d feature/new-feature
```

### 2. 태그 (버전 관리)
```bash
# 태그 생성
git tag -a v1.0.0 -m "Version 1.0.0 - 첫 배포"

# 태그 푸시
git push origin v1.0.0

# 모든 태그 푸시
git push origin --tags
```

### 3. .gitattributes 설정 (권장)
```bash
# .gitattributes 생성
cat > .gitattributes << 'EOF'
# Auto detect text files and perform LF normalization
* text=auto

# TypeScript
*.ts text eol=lf
*.tsx text eol=lf

# JavaScript
*.js text eol=lf
*.jsx text eol=lf

# JSON
*.json text eol=lf

# Markdown
*.md text eol=lf

# Images
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.svg text
EOF

# 커밋
git add .gitattributes
git commit -m "chore: .gitattributes 추가"
git push origin main
```

---

## ✅ 최종 체크리스트

업로드 전에 확인:

- [ ] .gitignore 파일 존재
- [ ] .env.example 파일 생성
- [ ] 실제 .env 파일은 제외됨
- [ ] README.md 작성 완료
- [ ] 불필요한 파일 제거 (node_modules, .next 등)
- [ ] 민감한 정보 (API 키, 비밀번호) 제거
- [ ] 커밋 메시지 명확하게 작성
- [ ] package.json에 스크립트 확인

업로드 후 확인:

- [ ] GitHub에서 저장소 정상 표시
- [ ] README.md 제대로 렌더링
- [ ] .env 파일 보이지 않음
- [ ] 모든 문서 파일 확인
- [ ] 라이선스 파일 (선택사항)
- [ ] GitHub Pages 활성화 (선택사항)

---

## 📞 도움이 필요하신가요?

- **GitHub 문서**: https://docs.github.com
- **Git 튜토리얼**: https://git-scm.com/doc
- **문의**: klum3@naver.com

---

## 🎉 완료!

축하합니다! 주성성결교회 홈페이지가 안전하게 GitHub에 업로드되었습니다.

**저장소 URL**: https://github.com/klum1223-coder/genspark-hompage

**다음 단계**:
1. ✅ Vercel 배포 (DEPLOYMENT.md 참고)
2. ✅ 도메인 연결
3. ✅ 지속적인 업데이트

---

*최종 업데이트: 2026년 1월 4일*
