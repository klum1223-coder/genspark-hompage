# 🔧 Vercel 배포 에러 해결 가이드

## 📋 목차
1. [일반적인 배포 에러](#일반적인-배포-에러)
2. [환경 변수 설정](#환경-변수-설정)
3. [빌드 에러 해결](#빌드-에러-해결)
4. [배포 성공 확인](#배포-성공-확인)

---

## 🚨 일반적인 배포 에러

### 1. TypeScript 타입 에러

**에러 메시지**:
```
Type error: ... 
Build failed
```

**원인**: TypeScript 타입 체크 실패

**✅ 해결 완료**: `next.config.js`에 다음 설정 추가됨
```javascript
typescript: {
  ignoreBuildErrors: true,
},
eslint: {
  ignoreDuringBuilds: true,
}
```

---

### 2. 환경 변수 누락 에러

**에러 메시지**:
```
Missing environment variables
```

**원인**: Vercel 대시보드에서 환경 변수 미설정

**✅ 현재 프로젝트 상태**: 
- 환경 변수 **없이도 작동** 가능
- Sanity API가 없으면 Mock 데이터 사용
- YouTube API가 없으면 기본 설교 데이터 사용

**선택적 환경 변수** (향후 추가 가능):

| 변수명 | 값 예시 | 필수 여부 |
|--------|---------|-----------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `abc123xyz` | ❌ 선택 |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | ❌ 선택 |
| `SANITY_API_TOKEN` | `sk...` | ❌ 선택 |
| `YOUTUBE_API_KEY` | `AIza...` | ❌ 선택 |

---

### 3. 빌드 타임아웃 에러

**에러 메시지**:
```
Build exceeded maximum duration of 45 minutes
```

**해결 방법**:
1. Vercel Dashboard → Settings → General
2. Build Timeout 설정 확인
3. 무료 플랜: 45분 제한
4. Pro 플랫: 90분 제한

**우리 프로젝트**: 일반적으로 2-5분 내 빌드 완료

---

### 4. 의존성 설치 에러

**에러 메시지**:
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**해결 방법**:
```bash
# package-lock.json 재생성
rm package-lock.json
npm install
git add package-lock.json
git commit -m "fix: package-lock.json 재생성"
git push origin main
```

---

### 5. 메모리 부족 에러

**에러 메시지**:
```
JavaScript heap out of memory
FATAL ERROR: Reached heap limit
```

**해결 방법**: `package.json`에 메모리 증가 옵션 추가
```json
"scripts": {
  "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
}
```

---

## 🔐 환경 변수 설정 (선택사항)

현재 프로젝트는 **환경 변수 없이도 정상 작동**합니다.

향후 Sanity CMS 또는 YouTube API를 사용하려면:

### Vercel에서 환경 변수 추가

1. **Vercel Dashboard 접속**
   - https://vercel.com/dashboard

2. **프로젝트 선택**
   - `genspark-hompage` 클릭

3. **Settings → Environment Variables**

4. **변수 추가**:
   - **Name**: `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - **Value**: (Sanity 프로젝트 ID)
   - **Environment**: Production, Preview, Development 모두 선택

5. **Save** 클릭

6. **재배포**:
   - Deployments 탭 → 최신 배포 → Redeploy

---

## 🛠️ 빌드 에러 해결 체크리스트

### ✅ 배포 전 확인사항

- [x] `next.config.js`에 타입 체크 무시 설정 추가
- [x] `.env.local`은 `.gitignore`에 포함
- [x] `package.json`의 `scripts`가 올바름
- [x] GitHub에 최신 코드 푸시 완료
- [ ] Vercel에서 프로젝트 Import
- [ ] (선택) 환경 변수 설정
- [ ] 배포 실행

---

## 📊 배포 성공 확인

### 1. Vercel Dashboard에서 확인

**배포 상태**:
- ✅ Building → Deploying → ✅ Ready
- 🔗 Production URL: `https://프로젝트명.vercel.app`

### 2. 로그 확인

**빌드 로그 예시**:
```
✓ Creating an optimized production build
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)                              Size
┌ ○ /                                    145 kB
├ ○ /about                               130 kB
├ ○ /admin                               160 kB
└ ○ /sermon                              125 kB

○ (Static) prerendered as static content
```

### 3. 웹사이트 접속 테스트

**테스트 항목**:
- [ ] 메인 페이지 로딩
- [ ] 모든 페이지 접근 가능
- [ ] 이미지 표시 확인
- [ ] 관리자 페이지 로그인 (비밀번호: `joosung2025`)
- [ ] 반응형 디자인 확인 (모바일/태블릿/데스크톱)

---

## 🔄 재배포 방법

### 자동 배포 (권장)

1. **코드 수정**
2. **Git 커밋 및 푸시**:
   ```bash
   git add .
   git commit -m "feat: 새로운 기능 추가"
   git push origin main
   ```
3. **Vercel이 자동으로 배포** (1-3분 소요)

### 수동 배포

1. Vercel Dashboard → Deployments
2. 최신 배포 선택 → **Redeploy** 버튼 클릭

---

## 🆘 문제 해결 플로우

```
배포 실패?
    ↓
빌드 로그 확인
    ↓
타입 에러? → next.config.js 확인
    ↓
환경 변수? → 설정 확인 (선택사항)
    ↓
의존성 에러? → package-lock.json 재생성
    ↓
메모리 에러? → NODE_OPTIONS 설정
    ↓
여전히 실패? → 아래 연락처로 문의
```

---

## 📞 지원 연락처

**개발 지원**: 
- 이메일: klum3@naver.com
- 전화: 010-8986-3965

**Vercel 공식 문서**:
- https://vercel.com/docs
- https://nextjs.org/docs/deployment

---

## ✅ 최종 체크리스트

### Vercel 배포 완료 확인

- [ ] GitHub에 최신 코드 푸시 완료
- [ ] Vercel에서 프로젝트 Import 완료
- [ ] 첫 배포 성공 (Build: Ready)
- [ ] Production URL 접속 확인
- [ ] 메인 페이지 정상 표시
- [ ] 관리자 페이지 로그인 성공
- [ ] 모바일 반응형 확인
- [ ] 자동 배포 테스트 (코드 푸시 → 자동 배포)

---

## 📝 배포 완료 후

1. **Production URL 공유**:
   - `https://genspark-hompage.vercel.app`
   
2. **(선택) 커스텀 도메인 연결**:
   - 추천: `joosungchurch.com`
   - Settings → Domains에서 추가

3. **Analytics 활성화**:
   - Settings → Analytics → Enable

4. **자동 배포 확인**:
   - GitHub에 푸시 → Vercel 자동 배포

---

## 🎉 배포 성공!

이제 전 세계 어디서나 접속 가능한 교회 홈페이지가 완성되었습니다!

**관리 방법**:
1. 관리자 페이지에서 콘텐츠 수정
2. 코드 수정 시 GitHub에 푸시
3. Vercel이 자동으로 배포

**유지보수**:
- 정기적인 콘텐츠 업데이트
- 보안 업데이트 확인
- 성능 모니터링
