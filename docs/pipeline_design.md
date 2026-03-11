# [설계서] 글로벌 찬양 메타데이터 자동 구축 파이프라인

한국어 찬양을 중심으로 글로벌 확장(미국, 남미)이 가능한 **표준화된 찬양 데이터베이스(DB)** 구축을 위한 통합 전략입니다. AI 환각 최소화·데이터 중복 원천 차단을 목표로 합니다.

---

## 1. 프로젝트 개요

- **목표**: 한국과 미국의 한인/현지 교회를 아우르는 글로벌 찬양 DB 구축
- **기반**: Supabase (PostgreSQL)
- **원칙**: AI 환각 방지, 데이터 무결성 최우선

---

## 2. 핵심 기술 스택

| 구분 | 기술 |
|------|------|
| 개발 환경 | Cursor AI (Python/TypeScript 스크립트) |
| 데이터 저장 | Supabase (PostgreSQL) |
| 탐색 엔진 | Google Search API 연동형 Gemini (실존 곡 검증) |
| 분석 엔진 | Azure GPT-4o (신학·음악 정밀 분석) |

---

## 3. 단계별 파이프라인 (Step-by-Step)

### [Step 1] 곡 탐색 및 씨앗 리스트 생성 (Gemini)

- **목적**: 실존하는 찬양 곡명 대량 수집
- **작업**: Gemini가 Google 검색을 활용해 한국 교회 인기 찬양 100개 추출
- **환각 통제**: 실제 음원 발매·CCLI 등록 여부 동시 확인. 검색 결과(URL)가 없는 곡은 즉시 제외

### [Step 2] 중복 검증 및 유니크 리스트 확정 (Cursor AI + Supabase)

- **목적**: DB와의 충돌 방지
- **작업**: 수집 100개를 Supabase `master_songs`의 `canonical_title`, `composer`와 대조
- **결과**: DB에 없는 곡만 선별 (예: 100개 중 84개 생존)

### [Step 3] 10개 단위 청크(Chunk) 분할

- **목적**: AI 컨텍스트 유지·정밀도 확보
- **작업**: 유니크 리스트를 10개 단위로 나누어 Step 4에 순차 입력

### [Step 4] 정밀 신학/음악 분석 (Azure GPT-4o)

- **목적**: 고품질 메타데이터 생성
- **입력**: 10곡명·아티스트
- **분석 항목**:
  - **Theology**: 핵심/부가 주제, 성경 구절(KRV), 예배 단계
  - **Musicology**: G Key 기준 키, BPM, 송폼 기반 에너지 커브(I:1 시작 규칙)
  - **Rights**: CCLI 번호 조회, verification_status = verified_global

### [Step 5] 데이터 무결성 검사 (Validation)

- **목적**: 스키마 규칙 준수 확인
- **검사 항목**:
  - 모든 `energy_curve`가 `I:1`로 시작하는가?
  - `ccli_number` 유효 또는 명명 규칙 준수 여부
  - `summary_ko` 50~100자 여부

### [Step 6] Supabase 최종 적재 (Upsert)

- **목적**: 검증된 데이터 DB 반영
- **작업**: `id`(Primary Key) 기준 upsert
- **자동화**: 적재 완료 곡은 다음 루프의 제외 리스트에 포함되어 중복 탐색 방지

---

## 4. 환각 증상(Hallucination) 방지 전략

1. **Grounding (근거 기반)**: AI 내부 지식이 아닌 실시간 Google 검색 결과로 곡 정보 확정
2. **Anchor (CCLI 번호)**: 실존 여부의 최종 기준을 CCLI로 설정, 가상 곡 생성 원천 차단
3. **Negative Constraint (모름 허용)**: 불확실할 경우 추측 금지, `UNKNOWN` 표기 강제
4. **Schema Validation**: 정해진 형식 위반 시 스크립트에서 기각·재요청

---

## 5. 기대 효과

- **데이터 일관성**: 동일한 신학·음악 분석 잣대
- **운영 효율**: 수동 입력 대비 약 90% 이상 시간 절감, 확장 용이
- **글로벌 대응**: 한국어 데이터 기반 다국어 제목·글로벌 표준 태그 자동 생성

---

## 6. 구현 위치

- **SQL**: `data-pipeline/sql/001_create_master_songs.sql`, `002_create_performance_versions.sql`
- **스크립트**: `data-pipeline/src/` (step2-dedup, step5-validate, step6-upsert, run-pipeline)
- **실행 가이드**: `data-pipeline/README.md`
