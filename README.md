# OpenWorship Teaser

오픈워십 티저 웹사이트 (Next.js 14 + TypeScript + Tailwind)

### 실행 방법

**Windows에 Node.js가 설치되어 있는 경우 (권장)**

```bash
cd openworship-teaser
npm install
npm run dev
```

**Docker만 사용하는 경우** (Windows에 Node.js 미설치)

```bash
cd openworship-teaser
docker build -t openworship-teaser .
docker run -p 3000:3000 openworship-teaser
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속하세요.

**사전 알림 신청 (이메일 저장)**  
사전 등록 이메일을 Supabase에 저장하려면 프로젝트 루트에 `.env.local`을 만들고 다음을 설정하세요.  
`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`  
Supabase에 `data-pipeline/sql/003_pre_registrations.sql`을 실행해 `pre_registrations` 테이블을 먼저 생성해야 합니다.  
설정하지 않으면 폼 제출 시 "사전 등록 저장 기능이 꺼져 있습니다" 메시지가 나올 수 있습니다. **지금 당장 사용자에게 확인 메일이 가거나, 관리자에게 메일이 오는 기능은 없습니다.** 출시 시 수동/또는 별도 도구로 입력된 이메일 주소에 안내할 수 있습니다.

> ⚠️ **참고**: Docker 안에 설치한 Node.js는 **컨테이너 안에서만** 사용 가능합니다. Windows 명령 프롬프트(CMD)에서 `npm`을 쓰려면 [nodejs.org](https://nodejs.org/)에서 Windows용 Node.js LTS를 설치한 뒤, 새 CMD 창에서 `npm install`을 실행하세요. (명령어는 `npm install` 로 입력합니다.)

### 웹사이트에 올리기 (배포)

실제 인터넷에 공개하려면 [**docs/DEPLOY.md**](docs/DEPLOY.md)를 참고하세요.  
**Vercel**(가장 간단), **Netlify**, **Coolify/Docker**, **정적 호스팅** 방법이 정리되어 있습니다.

---

# 오픈워십 티저 웹사이트 개발 가이드

## 🎯 프로젝트 핵심 원칙

### ⚠️ 절대 규칙
- **"AI" 단어 사용 금지**: 모든 설명에서 "오픈워십", "예배 준비 도구", "스마트 시스템" 등으로 대체
- **예배 본질 존중**: 예배를 대신하는 것이 아니라, 예배 준비를 돕는 파트너임을 강조. 예배의 중심은 언제나 하나님

### 📝 핵심 메시지
"예배의 본질은 그대로, 준비는 더 깊고 빠르게"
"예배는 하나님의 부르심에 대한 성도의 응답입니다"
"오픈워십은 예배를 대신하지 않습니다. 예배의 본질에 더 깊이 집중할 수 있도록, 복잡한 준비 과정을 간소화하는 예배 준비 파트너입니다."


## 🛠 기술 스택

```json
{
  "framework": "Next.js 14 (App Router)",
  "language": "TypeScript", 
  "styling": "Tailwind CSS",
  "animation": "Framer Motion",
  "icons": "Lucide React",
  "images": "Next.js Image + Unsplash"
}
🎨 디자인 시스템
컬러 팔레트
Copy// tailwind.config.ts 설정
const colors = {
  primary: {
    50: '#f8fafc',
    500: '#64748b', 
    700: '#334155',
    900: '#0f172a'
  },
  accent: {
    500: '#eab308',
    600: '#d4af37', // 메인 골드
  },
  background: '#fefefe'
}
타이포그래피
한글: Pretendard Variable (CDN)
영문: Inter (Google Fonts)
스타일: Clean, Modern, 높은 가독성
📱 페이지 구조
Hero Section
배경: Unsplash "church worship ambient lighting" 메인 카피: "예배의 본질은 그대로, 준비는 더 깊고 빠르게" CTA: "사전 알림 신청하기"

핵심 가치 (3개 카드)
본질에 집중하는 준비: 형식이 아닌 메시지와 방향성에 집중
아이디어에서 완성까지: 흩어진 아이디어를 일관된 스토리라인으로
팀과 함께하는 준비: 실시간 협업으로 하나 된 예배 준비
스토리라인 구성
제목: "예배 주제만 있으면 충분합니다" 프로세스: 주제 입력 → 아이디어 수집 → 스토리라인 완성

협업 환경
제목: "혼자가 아닌, 팀과 함께" 기능: 실시간 편집, 역할 분담, 즉시 피드백

배포 및 공유
제목: "완성된 예배, 한 번의 클릭으로 공유"
비주얼: 다양한 디바이스에서의 예배 순서지 표시

사전 등록 CTA
배경: 부드러운 그라데이션 폼: 이메일 입력 + 개인정보 동의

🚀 개발 가이드라인
컴포넌트 구조
components/
├── sections/
│   ├── Hero.tsx
│   ├── CoreValues.tsx  
│   ├── StorylineBuilder.tsx
│   ├── Collaboration.tsx
│   ├── Deployment.tsx
│   └── PreRegistration.tsx
└── ui/
    ├── Button.tsx
    ├── Card.tsx
    └── Input.tsx
애니메이션
스크롤 애니메이션: Fade-in + Slide-up
호버 효과: 카드 lift-up, 버튼 색상 변화
Intersection Observer 활용한 순차적 등장
반응형 설계
모바일: 320px~767px (1열 레이아웃)
태블릿: 768px~1023px (2열 레이아웃)
데스크톱: 1024px~ (3열 레이아웃)
성능 최적화
Next.js Image 컴포넌트 사용
폰트 최적화 (font-display: swap)
SEO 메타태그 설정
📋 개발 체크리스트
Phase 1: 프로젝트 초기화
 Next.js 14 + TypeScript 프로젝트 생성
 Tailwind CSS + Framer Motion 설치
 디자인 시스템 설정 (colors, fonts)
 기본 폴더 구조 생성
Phase 2: 컴포넌트 개발
 Hero 섹션 (배경 이미지 + 텍스트)
 CoreValues 섹션 (3개 카드 그리드)
 StorylineBuilder 섹션 (좌우 분할)
 Collaboration 섹션 (기능 소개)
 Deployment 섹션 (디바이스 쇼케이스)
 PreRegistration 섹션 (이메일 폼)
Phase 3: 인터랙션 & 최적화
 스크롤 애니메이션 적용
 반응형 레이아웃 조정
 성능 최적화 (이미지, 폰트)
 접근성 검증 (ARIA, 키보드 네비게이션)