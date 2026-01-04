# 교회사역 페이지 분리 및 사역갤러리 구현 완료

## 📅 작업일: 2025-01-05

## ✅ 완료된 작업

### 1. 메인페이지와 탭페이지의 교회사역 분리

#### 메인페이지 교회사역 (`/`)
- **데이터 소스**: `localStorage.ministries`
- **기능**: 기존 블로그 연동 방식 유지
- **표시 방식**: 최대 3개 사역 카드 표시
- **특징**:
  - 아이콘 기반 디자인
  - 블로그 URL 연동
  - 간단한 설명 표시

#### 탭페이지 교회사역 (`/ministry`)
- **데이터 소스**: `localStorage.ministry_gallery`
- **기능**: 사역 활동 사진 갤러리
- **표시 방식**: 그리드 레이아웃
- **특징**:
  - 실제 사진 이미지 표시
  - 카테고리별 필터링 (전체/예배/교육/선교/친교/기타)
  - 날짜, 제목, 설명 등 상세 정보
  - localStorage 실시간 동기화 (5초 자동 새로고침)

### 2. 관리자 페이지 업데이트

#### 📸 사역갤러리 탭 (신규)
관리자 페이지에 **사역갤러리** 탭이 추가되었습니다.

**관리 가능한 항목**:
- ✏️ 사역 제목
- 📂 카테고리 선택 (예배/교육/선교/친교/기타)
- 🖼️ 사진 URL (이미지 프리뷰 제공)
- 📝 설명
- 📅 날짜

**기능**:
- ➕ 사역 추가
- 🗑️ 사역 삭제
- 💾 저장하기 (localStorage 저장)
- 🔄 실시간 미리보기

**접근 방법**:
1. https://genspark-hompage.vercel.app/admin 접속
2. 비밀번호: `joosung2025`
3. **📸 사역갤러리** 탭 선택
4. 사역 추가/편집/삭제
5. 💾 저장하기 버튼 클릭

#### 👨‍🏫 담임목사 탭 개선

**학력/경력 추가/제거 기능**:
- ✅ textarea 방식으로 변경
- ✅ 줄바꿈으로 항목 구분
- ✅ 각 줄이 하나의 학력/경력 항목으로 저장
- ✅ 교회소개 페이지에서 경력 표시 (💼 아이콘)

**사용 방법**:
```
호서대학교 신학과 졸업 (B.A.)
서울신학대학교 대학원 목회학 석사 (M.Div.)
```

각 줄이 개별 항목으로 저장되어 교회소개 페이지에 표시됩니다.

### 3. 교회사역 페이지 리뉴얼

#### 디자인 개선
- ✨ 그리드 레이아웃 전용 (지그재그 레이아웃 제거)
- 🖼️ 실제 사진 이미지 표시
- 🎨 이미지 로드 실패 시 그라데이션 + 아이콘으로 대체
- 📱 반응형 디자인 (모바일/태블릿/데스크톱)

#### 기능 추가
- 🔍 카테고리별 필터링
- 📅 날짜 표시 (한국어 형식)
- 🔄 localStorage 실시간 동기화
- ⏱️ 5초마다 자동 새로고침
- 💬 문의하기 버튼

## 📂 파일 변경 사항

### 수정된 파일

#### 1. `/app/ministry/page.tsx`
- MinistryGallery 인터페이스로 변경
- localStorage.ministry_gallery 연동
- 그리드 레이아웃 전용으로 단순화
- 실시간 동기화 구현

```typescript
interface MinistryGallery {
  id: string
  title: string
  category: string
  description: string
  image: string
  date: string
}
```

#### 2. `/app/admin/page.tsx`
- 사역갤러리 탭 추가 (이미 구현되어 있었음)
- 담임목사 학력/경력 textarea 방식 구현
- localStorage 저장 로직 개선

### 기존 파일 (변경 없음)
- `/app/page.tsx` - 메인페이지 교회사역은 그대로 유지
- `/app/about/page.tsx` - 담임목사 경력 표시 로직 이미 구현됨

## 🎯 데이터 구조

### 메인페이지 사역 (ministries)
```json
{
  "id": "1",
  "title": "기도 사역",
  "icon": "🙏",
  "description": "영적 성장과 기도의 힘",
  "detailContent": "https://blog.naver.com/joosung0416/224133934162"
}
```

### 탭페이지 사역갤러리 (ministry_gallery)
```json
{
  "id": "1736064123456",
  "title": "2024 성탄절 예배",
  "category": "예배",
  "description": "은혜로운 성탄절 예배를 드렸습니다",
  "image": "https://example.com/christmas-2024.jpg",
  "date": "2024-12-25"
}
```

## 📝 사용 가이드

### 사역갤러리 추가 방법

1. **관리자 페이지 접속**
   - URL: https://genspark-hompage.vercel.app/admin
   - 비밀번호: `joosung2025`

2. **사역갤러리 탭 선택**
   - 상단 탭에서 **📸 사역갤러리** 클릭

3. **새 사역 추가**
   - **➕ 사역 추가** 버튼 클릭
   - 필수 정보 입력:
     - 사역 제목 (예: "2024 성탄절 예배")
     - 카테고리 선택 (예배/교육/선교/친교/기타)
     - 날짜 선택
     - 사진 URL (이미지 주소)
     - 설명 (선택사항)

4. **저장**
   - **💾 저장하기** 버튼 클릭
   - 자동으로 localStorage에 저장됨

5. **확인**
   - https://genspark-hompage.vercel.app/ministry 접속
   - 5초 내에 자동 반영됨
   - 또는 페이지 새로고침 (Ctrl+R / Cmd+R)

### 이미지 업로드 방법

현재는 이미지 URL 방식을 사용합니다:

1. **이미지 호스팅 서비스 사용**
   - Imgur, imgbb, Google Drive 등
   - 또는 블로그/SNS에 업로드 후 이미지 URL 복사

2. **이미지 URL 입력**
   - 관리자 페이지 사역갤러리에서
   - "사진 URL" 필드에 이미지 주소 붙여넣기
   - 자동으로 미리보기 표시됨

3. **권장 이미지 사양**
   - 해상도: 최소 1200x900 (4:3 비율)
   - 형식: JPG, PNG, WebP
   - 용량: 5MB 이하 권장

## 🔧 기술 세부사항

### LocalStorage 키
- `ministries`: 메인페이지 교회사역 데이터
- `ministry_gallery`: 탭페이지 사역갤러리 데이터
- `pastor_info`: 담임목사 정보 (학력, 경력 포함)

### 자동 동기화
```typescript
// 5초마다 자동 새로고침
const interval = setInterval(() => {
  const stored = localStorage.getItem('ministry_gallery')
  if (stored) {
    setMinistryGallery(JSON.parse(stored))
  }
}, 5000)

// storage 이벤트 리스너
window.addEventListener('storage', handleStorageChange)
```

### 카테고리 필터링
- 전체: 모든 사역 표시
- 예배: 예배 관련 사역
- 교육: 교육/성경공부 관련
- 선교: 선교 활동
- 친교: 친교/소그룹 활동
- 기타: 기타 사역

## 🚀 배포 정보

### 커밋 정보
- **커밋 ID**: 64360d4
- **이전 커밋**: 27c532a
- **브랜치**: main
- **커밋 메시지**: "feat: 교회사역 탭페이지와 메인페이지 분리 및 사역갤러리 구현"

### GitHub
- **저장소**: https://github.com/klum1223-coder/genspark-hompage
- **변경 파일**: 
  - app/admin/page.tsx (사역갤러리 탭)
  - app/ministry/page.tsx (완전 리뉴얼)

### Vercel 배포
- **사이트 URL**: https://genspark-hompage.vercel.app/
- **자동 배포**: 진행 중 (약 2-3분 소요)
- **대시보드**: https://vercel.com/dashboard

## ✅ 테스트 체크리스트

### 관리자 페이지
- [ ] 사역갤러리 탭 접근 가능
- [ ] 사역 추가 기능 작동
- [ ] 이미지 URL 입력 시 미리보기 표시
- [ ] 카테고리 선택 가능
- [ ] 저장 버튼 작동
- [ ] 사역 삭제 기능 작동
- [ ] 담임목사 학력/경력 줄바꿈 입력 가능

### 교회사역 페이지
- [ ] 사역갤러리 표시
- [ ] 이미지 정상 로드
- [ ] 이미지 실패 시 그라데이션 대체
- [ ] 카테고리 필터 작동
- [ ] 날짜 표시 정상
- [ ] 반응형 디자인 (모바일/태블릿/데스크톱)
- [ ] 5초 자동 새로고침 작동

### 메인페이지
- [ ] 교회사역 섹션 기존 방식 유지
- [ ] 블로그 링크 작동

### 교회소개 페이지
- [ ] 담임목사 경력 표시
- [ ] 줄바꿈 정상 표시

## 📞 지원 문의

### 개발 지원
- **이메일**: klum3@naver.com
- **전화**: 010-8986-3965

### 배포 완료 후 확인사항

1. **메인 페이지 확인**
   - https://genspark-hompage.vercel.app/
   - 교회사역 섹션이 기존과 동일한지 확인

2. **교회사역 페이지 확인**
   - https://genspark-hompage.vercel.app/ministry
   - 사역갤러리가 정상 표시되는지 확인
   - 카테고리 필터 작동 확인

3. **관리자 페이지 확인**
   - https://genspark-hompage.vercel.app/admin
   - 사역갤러리 탭에서 사역 추가/편집 테스트
   - 담임목사 탭에서 학력/경력 편집 테스트

4. **교회소개 페이지 확인**
   - https://genspark-hompage.vercel.app/about
   - 담임목사 경력 표시 확인

## 🎉 완료!

모든 요청사항이 구현되었습니다:

1. ✅ 메인페이지의 교회사역과 탭페이지의 교회사역 분리
2. ✅ 탭페이지 사역 이미지 관리자 페이지에서만 업로드/삭제 가능
3. ✅ 담임목사 학력/경력 추가/제거 기능 및 줄바꿈 처리

배포가 완료되면 테스트를 진행해주세요!
