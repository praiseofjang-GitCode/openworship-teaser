# OpenWorship 프로젝트 로드맵 — 기술 스택 · 90일 계획 종합

프로젝트 전반의 기술 스택, 방향성, 90일 MVP 실행 로드맵을 정리한 문서입니다.

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | OpenWorship (오픈워십) |
| **핵심 미션** | 중소형 교회 사역자들이 매주 겪는 5~10시간의 반복적인 예배 준비 노동(악보 전조, PPT 제작, 선곡 등)을 **5분으로 단축**하는 '지능형 예배 디렉팅 SaaS'. |
| **포지셔닝** | **"토요일 밤의 구원자 (Time-to-Value)"**. 거대 플랫폼(Planning Center)과 경쟁하지 않고, 그들이 하지 못하는 선곡 및 PPT 자동화를 제공하는 보완재(Add-on). |
| **예배 본질** | 예배를 대신하지 않음. 예배 준비를 돕는 파트너로서, 예배의 본질에 더 깊이 집중할 수 있도록 준비 과정을 간소화. |
| **타임라인** | **90일 내 MVP 출시** 목표 (하루 1~2시간 1인 개발 기준). |
| **현재 단계** | 티저 사이트 (openworship-teaser) 완료 → SaaS MVP 90일 로드맵 진행 예정. |

---

## 2. Strict Tech Stack (SaaS MVP 기준)

90일 로드맵에서 사용하는 **고정 기술 스택**입니다.

| 구분 | 기술 | 비고 |
|------|------|------|
| **Frontend** | Next.js 14 (App Router) + TypeScript + Tailwind CSS | 티저와 동일 |
| **UI 컴포넌트** | **shadcn/ui** | 접근성 및 직관적인 UI 최우선 |
| **Backend / DB / Auth** | **Supabase** | PostgreSQL, pgvector, Auth, Edge Functions |
| **Hosting** | **Coolify** | VPS Self-hosted |
| **AI & LLM** | **Azure OpenAI** | 로직 및 신학 검증 |
| **유틸리티** | **PptxGenJS** (클라이언트 사이드 PPT 생성), **VexFlow** (악보 렌더링) | |

---

## 3. Core Development Directives (개발 원칙)

- **[Theological Safety - RAG]**  
  신뢰할 수 있는 교단별 데이터셋 기반의 RAG 방식을 적용하여 **신학적 환각(Hallucination)** 을 방지할 것.

- **[Copyright Compliance (BYOL)]**  
  **퍼블릭 도메인**(저작권 만료 찬송가)을 우선 활용하고, 서버에 저작물을 저장하지 않는 **클라이언트 사이드 프로세싱**을 지향할 것.

---

## 4. Database Schema Requirements (초기 단계)

| 테이블 | 용도 |
|--------|------|
| **Users** | 사용자 프로필, 소속 교회 정보, 선호 예배 스타일 |
| **Songs** | 찬양 메타데이터(BPM, Key), 퍼블릭 도메인 여부, 신학적 태그, **벡터 임베딩 데이터(pgvector)** |
| **Setlists** | 생성된 예배 프로젝트, 챕터별 곡 순서(Flow) |

*(추후: Feedbacks 등 확장)*

---

## 5. 현재 기술 스택 (티저 사이트 — Phase 0)

티저 사이트에서 실제로 사용한 스택입니다. SaaS MVP에서는 위 Strict Tech Stack으로 전환합니다.

### 5.1 코어

| 구분 | 기술 | 비고 |
|------|------|------|
| 프레임워크 | Next.js 14 (App Router) | |
| 언어 | TypeScript 5.x | |
| 런타임 | Node.js 18.17+ / 24.x LTS | |

### 5.2 프론트엔드 (티저)

| 구분 | 기술 | 비고 |
|------|------|------|
| 스타일링 | Tailwind CSS | |
| 애니메이션 | Framer Motion | |
| 아이콘 | Lucide React | |
| 이미지 | Next.js Image + Unsplash | |

### 5.3 배포·실행 (티저)

| 구분 | 옵션 | 비고 |
|------|------|------|
| 로컬 | Node.js 직접 설치 | `npm install` → `npm run dev` |
| 컨테이너 | Docker (node:24-alpine) | Dockerfile 제공 |

---

## 6. 디자인 시스템 (티저 기준)

- **Primary**: `#f8fafc`, `#64748b`, `#334155`, `#0f172a` | **Accent**: `#eab308`, `#d4af37` | **Background**: `#fefefe`
- **타이포**: 한글 Pretendard Variable (CDN), 영문 Inter (Google Fonts)
- **반응형**: 모바일 1열 / 태블릿 2열 / 데스크톱 3열 (320px, 768px, 1024px)

---

## 7. 프로젝트 구조 (티저)

```
openworship-teaser/
├── docs/
│   ├── teaser_guide.md
│   └── openworship_roadmap.md   # 본 문서
├── src/app/                    # Next.js App Router
├── src/components/sections/    # Hero, CoreValues, StorylineBuilder, ...
├── src/components/ui/          # Button, Card, Input, ScrollReveal
├── public/
├── tailwind.config.ts
├── package.json
└── Dockerfile
```

---

## 8. 🚀 90-Day Execution Roadmap (12주 태스크)

Cursor AI는 아래 **주차별/일별(Day) Task**에 맞춰 순차적으로 코드를 작성한다.

### [Month 1] Phase 1: 데이터 구축 + 추천 AI + 기본 UI

**Week 1 (Day 1–7): 프로젝트 세팅 및 데이터 수집 파이프라인**

| Day | Task |
|-----|------|
| Day 1 | `npx create-next-app@latest` 초기화 및 **shadcn/ui** 기본 컴포넌트 세팅. |
| Day 2–3 | Supabase 프로젝트 연동 (Auth, DB Client 설정) 및 **Users**, **Songs** 테이블 생성. |
| Day 4–5 | 퍼블릭 도메인 찬송가 500곡 데이터를 DB에 업로드하는 Python/Node.js 스크립트 작성. |
| Day 6–7 | Azure OpenAI API 키 연동 및 기본 통신 테스트 코드 작성. |

**Week 2 (Day 8–14): 벡터 DB 구축 및 주제 기반 추천 로직**

| Day | Task |
|-----|------|
| Day 8–9 | Supabase **pgvector** 활성화 및 찬양 가사/주제 **임베딩 로직** 구현. |
| Day 10–12 | 입력된 '설교 본문/주제'를 바탕으로 Azure OpenAI가 **신학적 키워드**를 추출하는 프롬프트 작성. |
| Day 13–14 | 추출된 키워드로 Supabase 벡터 검색을 수행하여 **5곡 추천** API 라우트(`app/api/recommend`) 구현. |

**Week 3 (Day 15–21): 예배 흐름(Flow) 자동 생성 엔진**

| Day | Task |
|-----|------|
| Day 15–17 | 예배 챕터 모델(도입→참회→감사/기쁨→헌신/파송) **JSON 스키마** 설계. |
| Day 18–21 | 추천된 곡들을 예배 챕터 **에너지 레벨(BPM, 가사 내러티브)**에 맞게 자동 배치하는 알고리즘 구현. |

**Week 4 (Day 22–28): 핵심 대시보드 UI 제작**

| Day | Task |
|-----|------|
| Day 22–24 | 로그인 화면 및 **메인 대시보드** UI 구현. |
| Day 25–26 | **'새 예배 만들기'** 폼 (설교 주제, 교회 스타일 입력) UI 작성. |
| Day 27–28 | 추천된 곡 리스트와 예배 흐름을 시각적으로 보여주는 **타임라인(Timeline)** UI 완성. |

---

### [Month 2] Phase 2: 송폼 분석 + PPT 자동 생성

**Week 5 (Day 29–35): 송폼(Songform) 분석 엔진**

| Day | Task |
|-----|------|
| Day 29–31 | 곡의 메타데이터에 **Verse/Chorus/Bridge** 구조를 정의하는 스키마 추가. |
| Day 32–35 | 예배 흐름에 맞춰 곡의 **송폼 반복 횟수**(예: 후렴 2번 반복 등)를 조정하는 로직 구현. |

**Week 6 (Day 36–42): PPT 자동 생성 템플릿(Client-side) 구축**

| Day | Task |
|-----|------|
| Day 36–38 | **PptxGenJS** 라이브러리 설치 및 기본 슬라이드 렌더링 테스트. |
| Day 39–42 | 곡의 **가사를 송폼에 맞춰 슬라이드 당 2~4줄씩** 자동 분할하는 텍스트 파싱 로직 구현. |

**Week 7 (Day 43–49): PPT 다운로드 및 테마 적용**

| Day | Task |
|-----|------|
| Day 43–45 | **16:9 및 4:3** 비율 선택, 배경색/폰트 설정이 가능한 PPT 테마 옵션 UI 구현. |
| Day 46–49 | 브라우저 환경에서 사용자가 최종 **PPTX 파일 다운로드**가 가능한 내보내기(Export) 기능 완성. |

**Week 8 (Day 50–56): 전체 워크플로우 통합**

| Day | Task |
|-----|------|
| Day 50–53 | **[주제 입력] → [곡 추천] → [흐름 배치] → [PPT 생성]** 전 과정을 하나의 끊김없는 UX로 통합. |
| Day 54–56 | 에러 핸들링, 로딩 스피너, 재생성(Regenerate) 버튼 등 디테일 보완. |

---

### [Month 3] Phase 3: 안정화 + 디버깅 + 런칭 준비

**Week 9 (Day 57–63): 사용자 피드백 반영 및 UX 개선**

| Day | Task |
|-----|------|
| Day 57–59 | **반응형 웹**(Mobile/Tablet) UI 최적화. |
| Day 60–63 | 모의 테스트 중 발견된 **버그 수정** (Edge case 예외 처리). |

**Week 10 (Day 64–70): 병목(Bottleneck) 수집 시스템 추가**

| Day | Task |
|-----|------|
| Day 64–67 | 사용자가 겪는 **예배 준비의 어려움**을 수집할 수 있는 **피드백 폼** UI 추가. |
| Day 68–70 | Supabase에 **Feedbacks** 테이블 구축 및 피드백 데이터 저장·분류. |

**Week 11 (Day 71–77): 퍼포먼스 최적화 및 결제 준비**

| Day | Task |
|-----|------|
| Day 71–73 | **Stripe API** 기본 세팅 및 구독 결제 스키마 뼈대 작성. |
| Day 74–77 | API 응답 속도 최적화 및 **쿼리 캐싱(Caching)** 적용. |

**Week 12 (Day 78–84+): 최종 배포 준비**

| Day | Task |
|-----|------|
| Day 78–80 | **Coolify** 기반 VPS 서버 배포 환경 테스트 (Dockerfile, 환경 변수 설정). |
| Day 81–84 | **프로덕션(Production)** 배포 및 최종 점검. |

---

## 9. Cursor AI 지시 사항

이 문서를 읽었다면, 다음과 같이 대답하고 지시를 대기할 것:

> **"OpenWorship 90일 마스터 로드맵을 숙지했습니다. 현재 위치한 진행 상황이 'Week 1의 Day 1'이 맞습니까? 작업을 시작할 일차(Day)를 지정해 주시면 즉시 코드를 작성하겠습니다."**

---

## 10. 문서 버전

| 날짜 | 변경 내용 |
|------|-----------|
| 최초 작성 | 티저 기술 스택 및 로드맵 정리 |
| 업데이트 | 90일 SaaS MVP 로드맵, Strict Tech Stack, DB 스키마, Core Directives, Cursor AI 지시 사항 통합 |

---

이 문서는 프로젝트가 진행됨에 따라 계속 업데이트할 수 있습니다.
