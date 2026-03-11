# OpenWorship 찬양 데이터베이스 구축 가이드

한국과 미국의 한인/현지 교회를 아우르는 **글로벌 찬양 데이터베이스(DB)** 구축을 위한 통합 전략입니다. Supabase 기반이며, **AI 환각 방지**와 **데이터 무결성**을 최우선으로 설계되었습니다.

---

## 1. 데이터베이스 아키텍처: '1곡-N버전' 관계형 구조

동일한 곡이라도 사역팀(마커스, 어노인팅 등)마다 **편곡과 에너지**가 다르다는 점을 반영하여, **두 개의 테이블**로 분리합니다.

### [Table 1] `master_songs` (핵심 정보)

| 항목 | 설명 |
|------|------|
| **PK** | `ccli_number` (CCLI 번호가 없을 경우 `KR-곡명-연도` 조합의 고유 ID) |
| **관리 항목** | 곡 제목(KO/EN), 작곡가, 원곡 언어, 핵심/부가 신학 주제, 성경 구절(개역개정), 가사 줄거리(200자 내외), 가사 요약(50~100자) |

### [Table 2] `performance_versions` (실연 정보)

| 항목 | 설명 |
|------|------|
| **FK** | `ccli_number` (Master Table 참조) |
| **Unique Key** | 유튜브 URL |
| **관리 항목** | 사역팀명, 예배 실황 날짜, Energy Curve, 송폼, 사용 키(Key), BPM, 예상 러닝타임, Dynamic Profile |

---

## 2. 데이터 수집 및 중복 회피 로직 (5-Step)

| Step | 내용 |
|------|------|
| **1** | **실존 곡 목록 확보**: Google Search API를 사용해 CCLI 및 공식 음원 사이트에서 **100곡 단위** 목록 수집. |
| **2** | **중복 필터링**: Supabase `master_songs`와 비교하여, 기존 CCLI 번호 또는 곡명과 **중복된 곡 제외**. |
| **3** | **다중 버전 수집**: 유튜브 API로 동일 곡의 여러 버전 검색. **조회수·날짜** 기준 상위 N개 영상을 추출하여 각기 다른 `performance_versions`로 등록. |
| **4** | **오디오·가사 분석**: 각 영상의 오디오 패턴·가사 분석으로 **에너지 커브(1–5 레벨)** 및 **예배 단계/역할** 도출. |
| **5** | **검증 후 업로드**: 누락 항목 검사 후 `verification_status`를 `verified_global`로 설정하고 Supabase에 업로드. |

---

## 3. 핵심 데이터 정의 가이드라인

### 3.1 신학 및 예배

**Primary Theme (핵심 신학 주제)**

- 성육신, 삼위일체, 은혜/복음, 십자가, 하나님 나라 등.

**Liturgical Phase (예배 단계)**

- Praise, Adoration, Response, Sending.

**Worship Role (예배에서의 역할)**

- Opener, Transition, Climax, Meditation.

### 3.2 음악적 분석 (Energy Curve)

**레벨 (1–5)**

- **1**: Pad / Quiet  
- **2**: Building  
- **3**: Mid-energy  
- **4**: High  
- **5**: Explosive Peak  

**규칙**

- 모든 곡은 **I(Intro):1** 로 시작해야 함.

**Dynamic Profile (곡의 흐름 유형)**

- `slow_burn` — 서서히 상승  
- `mountain_peak` — 중후반 피크  
- `staircase` — 단계적 상승  
- `reflective_wave` — 묵상형 파동  
- `u_shape` — 하강 후 재상승  

---

## 4. 데이터 생성 결과: 한국 교회 인기 G-Key 찬양 10곡 샘플

중복을 피하고 실존 곡 정보를 기반으로 생성된 **Master Data 샘플** (CSV 형식)입니다.

```csv
song_id,ccli_number,canonical_title,title_en,composer,year,primary_theme,secondary_theme,scripture_refs,liturgical_phase,worship_flow_role,key_common,tempo_bpm,duration_est,vocal_range,energy_curve,dynamic_profile,summary_ko,verification_status
KR-7115514,7115514,꽃들도,Flowers,JWorship,2018,하나님 나라,임재,시 148:3,Praise,Transition,G,72,05:30,male_low,I:1-V1:1-C1:2-V2:2-C2:3-B1:4-C3:5-O:1,slow_burn,만물이 창조주를 찬양하는 종말론적 기쁨을 담은 곡입니다.,verified_global
KR-7076329,7076329,시간을 뚫고,Through Time,WELOVE,2016,성육신,동행,빌 2:6-8,Adoration,Climax,G,74,05:45,male_high,I:1-V1:1-C1:2-V2:2-C2:3-B:4-C3:5-O:2,staircase,우리의 삶에 찾아오신 하나님의 겸손과 사랑을 고백합니다.,verified_global
KR-7049444,7049444,예수 피를 힘입어,By the Blood of Jesus,어노인팅,2015,십자가,임재,히 10:19,Adoration,Opener,G,64,05:55,male_low,I:1-V1:1-C1:2-V2:2-C2:3-B:4-C3:4-O:2,mountain_peak,보혈의 공로를 의지하여 하나님 보좌 앞으로 나아가는 예배 곡.,verified_global
KR-7132958,7132958,공감하시네,He Sympathizes,위러브,2019,은혜/복음,위로,히 4:15,Response,Meditation,G,66,06:30,female_high,I:1-V1:1-C1:2-V2:2-C2:3-B:4-C3:4-O:1,slow_burn,우리의 아픔을 깊이 이해하시는 주님의 마음을 묵상합니다.,verified_global
KR-4433765,4433765,온 땅의 주인,Who Am I,어노인팅,2004,하나님 나라,위로,시 8:4,Adoration,Climax,G,82,05:20,male_high,I:1-V1:2-C1:3-V2:3-C2:4-B:5-C3:5-O:2,mountain_peak,위대하신 창조주가 연약한 나를 사랑하신다는 감격의 고백.,verified_global
KR-7154231,7154231,원하고 바라고 기도합니다,I Wish Want and Pray,찬미워십,2020,헌신,동행,빌 4:6-7,Response,Transition,G,68,05:25,male_low,I:1-V1:1-C1:2-V2:2-C2:3-B:4-C3:5-O:1,slow_burn,하나님의 꿈이 나의 비전이 되기를 간구하는 결단의 찬양.,verified_global
KR-6101416,6101416,소원,My Wish,한웅재,2011,하나님 나라,헌신,시 27:4,Response,Meditation,G,64,04:50,male_low,I:1-V1:1-V2:2-C1:2-V3:2-C2:3-O:1,reflective_wave,삶의 작은 일에서도 주님을 닮기 원하는 진솔한 고백.,verified_global
KR-7033504,7033504,은혜로다,By Grace,예수전도단,2014,은혜/복음,임재,엡 2:8-9,Adoration,Meditation,G,68,06:15,female_low,I:1-V1:1-C1:2-V2:2-C2:2-B:3-C3:4-O:1,mountain_peak,하나님의 조건 없는 사랑과 은혜를 찬양하는 고전적 워십.,verified_global
KR-6531422,6531422,하나님은 너를 지키시는 자,The Lord Keeps You,정성실,2013,은혜/복음,위로,시 121:1-8,Sending,Meditation,G,62,04:40,female_high,I:1-V1:1-C1:2-V2:2-C2:3-O:1,reflective_wave,우리를 보호하시는 하나님의 신실하심을 선포하며 파송합니다.,verified_global
KR-7095642,7095642,나의 모습 나의 소유,I Offer My Life,제이워십,2017,헌신,회개/자복,롬 12:1,Response,Meditation,G,70,05:10,female_low,I:1-V1:1-C1:2-V2:2-C2:3-B:4-C3:4-O:1,u_shape,나의 모든 것을 주님께 제물로 드린다는 결단의 노래.,verified_global
```

---

## 5. 다음 단계

- 이 설계를 바탕으로 **Supabase 실제 테이블 생성용 SQL 스크립트**를 작성할 수 있습니다.
- 또는 **미국 교회(English) 데이터 수집** 단계로 바로 진행할 수 있습니다.

---

## 6. 관련 문서

- [openworship_roadmap.md](./openworship_roadmap.md) — 프로젝트 로드맵 및 DB 스키마 요구사항(Songs, Setlists 등)
- [teaser_guide.md](./teaser_guide.md) — 티저 사이트 개발 가이드
- [pipeline_design.md](./pipeline_design.md) — 글로벌 찬양 메타데이터 **자동 구축 파이프라인** 설계서
- `data-pipeline/README.md` — 파이프라인 실행 방법 (Step 1~6)
