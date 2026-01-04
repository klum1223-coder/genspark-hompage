# 🚀 Vercel 배포 빠른 시작 가이드

## 📝 5분 안에 배포하기

### 1단계: Vercel 계정 생성 (1분)
```
1. https://vercel.com 접속
2. "Sign Up" 클릭
3. "Continue with GitHub" 선택
4. GitHub 계정으로 로그인
5. Vercel 권한 승인
```

### 2단계: 프로젝트 Import (2분)
```
1. "Add New..." → "Project" 클릭
2. 검색: genspark-hompage
3. "Import" 클릭
4. Framework: Next.js (자동 감지)
5. 환경 변수: 건너뛰기 (선택사항)
6. "Deploy" 클릭 🚀
```

### 3단계: 배포 완료 대기 (2분)
```
⏳ Building...
⏳ Deploying...
✅ Deployment Ready!

https://genspark-hompage-xxxxx.vercel.app
```

### 4단계: 사이트 확인 (1분)
```
✅ 메인 페이지 접속
✅ 관리자 페이지 테스트: /admin
   비밀번호: joosung2025
```

---

## 🎯 배포 후 할 일

### 필수
- [ ] 모든 페이지 접속 확인
- [ ] 관리자 페이지 로그인 테스트
- [ ] 모바일 반응형 확인

### 권장
- [ ] 커스텀 도메인 연결
- [ ] Google Search Console 등록
- [ ] Vercel Analytics 활성화

---

## 📚 상세 가이드

**완전한 가이드**: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- 환경 변수 설정
- 도메인 연결 방법
- 자동 배포 설정
- 문제 해결

---

## 🔗 유용한 링크

- **Vercel**: https://vercel.com
- **GitHub 저장소**: https://github.com/klum1223-coder/genspark-hompage
- **Vercel 문서**: https://vercel.com/docs

---

## 💡 팁

### 자동 배포
GitHub에 코드를 push하면 Vercel이 자동으로 배포합니다:
```bash
git add -A
git commit -m "업데이트"
git push origin main
# 자동 배포 시작! (2-3분 소요)
```

### 환경 변수 (선택사항)
현재 프로젝트는 환경 변수 없이 작동합니다.
Sanity CMS나 YouTube API를 사용하려면 나중에 추가하세요.

### 도메인 연결 (선택사항)
```
Settings → Domains → Add Domain
→ joosungchurch.com 입력
→ DNS 레코드 설정
```

---

## 🚨 문제 발생 시

### 빌드 실패
```bash
# 로컬에서 빌드 테스트
npm run build

# 에러 수정 후 다시 푸시
git push origin main
```

### 페이지 404
```
- next.config.js 확인
- 파일 경로 확인
- Vercel 로그 확인
```

### 관리자 페이지 접속 불가
```
- 비밀번호 확인: joosung2025
- 브라우저 캐시 클리어
- 시크릿 모드로 테스트
```

---

## 📞 지원

- **문서**: VERCEL_DEPLOYMENT.md (8,700+ 자)
- **체크리스트**: CHECKLIST.md
- **이메일**: klum3@naver.com

---

**🎉 배포 성공을 기원합니다!**

*간단 가이드 - 전체 가이드는 VERCEL_DEPLOYMENT.md 참고*
