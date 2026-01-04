#!/bin/bash

# 주성성결교회 홈페이지 - Vercel 배포 준비 스크립트
# 실행 방법: chmod +x deploy-check.sh && ./deploy-check.sh

echo "🚀 주성성결교회 홈페이지 배포 준비 체크"
echo "=========================================="
echo ""

# 색상 정의
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 체크 함수
check_pass() {
    echo -e "${GREEN}✅ $1${NC}"
}

check_fail() {
    echo -e "${RED}❌ $1${NC}"
}

check_warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 1. Node.js 버전 확인
echo "1️⃣  Node.js 버전 확인..."
NODE_VERSION=$(node -v 2>/dev/null)
if [ $? -eq 0 ]; then
    check_pass "Node.js 설치됨: $NODE_VERSION"
else
    check_fail "Node.js가 설치되지 않았습니다"
    exit 1
fi
echo ""

# 2. package.json 확인
echo "2️⃣  package.json 확인..."
if [ -f "package.json" ]; then
    check_pass "package.json 존재"
else
    check_fail "package.json을 찾을 수 없습니다"
    exit 1
fi
echo ""

# 3. 의존성 설치 확인
echo "3️⃣  의존성 확인..."
if [ -d "node_modules" ]; then
    check_pass "node_modules 존재"
else
    check_warn "node_modules 없음. npm install 실행을 권장합니다"
fi
echo ""

# 4. 빌드 테스트
echo "4️⃣  빌드 테스트..."
echo "   (이 과정은 약 1-2분 소요될 수 있습니다)"
if npm run build > /dev/null 2>&1; then
    check_pass "빌드 성공"
else
    check_fail "빌드 실패. 로그를 확인하세요: npm run build"
    exit 1
fi
echo ""

# 5. .gitignore 확인
echo "5️⃣  .gitignore 확인..."
if [ -f ".gitignore" ]; then
    check_pass ".gitignore 존재"
    
    # .env 제외 확인
    if grep -q "^\.env$" .gitignore; then
        check_pass ".env 파일이 .gitignore에 포함됨"
    else
        check_warn ".env 파일이 .gitignore에 없습니다"
    fi
    
    # node_modules 제외 확인
    if grep -q "node_modules" .gitignore; then
        check_pass "node_modules가 .gitignore에 포함됨"
    else
        check_fail "node_modules가 .gitignore에 없습니다"
    fi
else
    check_fail ".gitignore를 찾을 수 없습니다"
fi
echo ""

# 6. 환경 변수 확인
echo "6️⃣  환경 변수 확인..."
if [ -f ".env.example" ]; then
    check_pass ".env.example 존재"
else
    check_warn ".env.example 파일이 없습니다 (선택사항)"
fi

if [ -f ".env" ]; then
    check_warn ".env 파일 발견. Git에 커밋되지 않도록 주의하세요!"
fi
echo ""

# 7. vercel.json 확인
echo "7️⃣  Vercel 설정 확인..."
if [ -f "vercel.json" ]; then
    check_pass "vercel.json 존재"
else
    check_warn "vercel.json이 없습니다 (선택사항)"
fi
echo ""

# 8. Git 상태 확인
echo "8️⃣  Git 상태 확인..."
if git rev-parse --git-dir > /dev/null 2>&1; then
    check_pass "Git 저장소 초기화됨"
    
    # 원격 저장소 확인
    if git remote -v | grep -q "github.com"; then
        REMOTE_URL=$(git remote get-url origin)
        check_pass "GitHub 원격 저장소 연결: $REMOTE_URL"
    else
        check_fail "GitHub 원격 저장소가 연결되지 않았습니다"
        exit 1
    fi
    
    # 커밋되지 않은 변경사항 확인
    if [ -z "$(git status --porcelain)" ]; then
        check_pass "모든 변경사항이 커밋됨"
    else
        check_warn "커밋되지 않은 변경사항이 있습니다"
        echo "   실행: git add -A && git commit -m 'your message' && git push origin main"
    fi
else
    check_fail "Git 저장소가 초기화되지 않았습니다"
    exit 1
fi
echo ""

# 9. 필수 파일 확인
echo "9️⃣  필수 파일 확인..."
REQUIRED_FILES=(
    "app/layout.tsx"
    "app/page.tsx"
    "next.config.js"
    "tailwind.config.js"
    "tsconfig.json"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        check_pass "$file 존재"
    else
        check_fail "$file를 찾을 수 없습니다"
    fi
done
echo ""

# 10. 문서 파일 확인
echo "🔟 문서 파일 확인..."
DOC_FILES=(
    "README.md"
    "DEPLOYMENT.md"
    "VERCEL_DEPLOYMENT.md"
)

for file in "${DOC_FILES[@]}"; do
    if [ -f "$file" ]; then
        check_pass "$file 존재"
    else
        check_warn "$file가 없습니다"
    fi
done
echo ""

# 최종 결과
echo "=========================================="
echo "✅ 배포 준비 체크 완료!"
echo ""
echo "📋 다음 단계:"
echo "1. Vercel 웹사이트 접속: https://vercel.com"
echo "2. GitHub 계정으로 로그인"
echo "3. 프로젝트 Import: genspark-hompage"
echo "4. Deploy 클릭"
echo ""
echo "📚 자세한 가이드: VERCEL_DEPLOYMENT.md 참고"
echo ""
echo "🎉 배포 성공을 기원합니다!"
