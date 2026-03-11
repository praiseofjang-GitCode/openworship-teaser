# OpenWorship 찬양 데이터 파이프라인

한국어 찬양을 중심으로 **글로벌 찬양 메타데이터 DB**를 구축하는 자동화 파이프라인입니다.  
AI 환각 최소화·중복 원천 차단을 위한 6단계 설계를 따릅니다.

---

## 1. 사전 준비

### Supabase 테이블 생성

1. [Supabase](https://supabase.com) 프로젝트 생성
2. SQL Editor에서 아래 순서로 실행:
   - `sql/001_create_master_songs.sql`
   - `sql/002_create_performance_versions.sql`

### 환경 변수

```bash
cp .env.example .env
# .env 편집: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY 필수
```

| 변수 | Step | 설명 |
|------|------|------|
| `SUPABASE_URL` | 2, 6 | Supabase 프로젝트 URL |
| `SUPABASE_SERVICE_ROLE_KEY` | 2, 6 | 서비스 롤 키 (비공개) |
| `GOOGLE_SEARCH_API_KEY`, `GOOGLE_CX` | 1 | Google Custom Search |
| `GEMINI_API_KEY` | 1 | Gemini (실존 곡 검증) |
| `AZURE_OPENAI_*` | 4 | Azure GPT-4o (정밀 분석) |

---

## 2. 파이프라인 단계 요약

| Step | 목적 | 스크립트/도구 |
|------|------|----------------|
| **1** | 곡 탐색·씨앗 리스트 100곡 | Gemini + Google Search → `seed-list.json` |
| **2** | 중복 검증 (DB와 대조) | `node src/step2-dedup.js --file=seed-list.json` |
| **3** | 10곡 단위 청크 분할 | `run-pipeline.js` 내부 처리 |
| **4** | 정밀 신학/음악 분석 | Azure GPT-4o → `chunk-N.json` 채우기 |
| **5** | 스키마 검증 (energy_curve I:1, summary_ko 50~100자 등) | `node src/step5-validate.js --file=chunk-1.json` |
| **6** | Supabase upsert | `node src/step6-upsert.js --file=chunk-1.json` |

---

## 3. 실행 방법

### 의존성 설치

```bash
cd data-pipeline
npm install
```

### Step 2만 실행 (유니크 리스트 추출)

```bash
# seed-list.json이 있을 때 (형식: [{ "canonical_title": "꽃들도", "composer": "JWorship", "ccli_number": 7115514 }, ...])
node src/step2-dedup.js --file=seed-list.json > unique-list.json
```

### Step 5 검증만 실행

```bash
node src/step5-validate.js --file=chunk-1.json
# 검증 통과 시 동일 JSON을 stdout으로 출력 → Step 6 입력으로 사용
```

### Step 6 upsert만 실행

```bash
node src/step6-upsert.js --file=validated-chunk-1.json
```

### 전체 자동 실행 (Step 2 → 3 → 5 → 6)

```bash
# seed-list.json 존재 시, chunk-1.json … chunk-N.json 이 있으면 검증 후 upsert
node src/run-pipeline.js --seed=seed-list.json --chunk-size=10
```

- Step 1으로 `seed-list.json` 생성 후, Step 4로 각 `chunk-N.json`을 분석 결과로 채워 넣으면, 위 명령 한 번으로 검증·적재까지 수행됩니다.

---

## 4. 환각 방지 전략 (설계서 반영)

1. **Grounding**: 실시간 Google 검색 결과로 곡 정보 확정 (Step 1)
2. **Anchor**: CCLI 번호를 실존 기준으로 사용
3. **Negative Constraint**: 불확실한 값은 `UNKNOWN` 표기 (Step 4 프롬프트)
4. **Schema Validation**: Step 5에서 형식 어긋나면 기각·재요청

---

## 5. 관련 문서

- [openworship_song_database.md](../docs/openworship_song_database.md) — DB 설계·데이터 정의
- [openworship_roadmap.md](../docs/openworship_roadmap.md) — 90일 로드맵·Strict Tech Stack
