-- OpenWorship: master_songs 테이블
-- 1곡-N버전 구조의 핵심 곡 메타데이터 (신학·음악 분석)
-- 실행: Supabase SQL Editor 또는 psql에서 실행

-- 기존 테이블 제거 (초기 구축 시에만 사용, 운영 중에는 주석 처리)
-- DROP TABLE IF EXISTS performance_versions;
-- DROP TABLE IF EXISTS master_songs;

CREATE TABLE IF NOT EXISTS master_songs (
  -- PK: CCLI 있으면 KR-{ccli_number}, 없으면 KR-{canonical_title}-{year} 등 고유 ID
  id TEXT PRIMARY KEY,
  -- CCLI 번호 (없으면 NULL, id로 대체 식별)
  ccli_number BIGINT UNIQUE,
  -- 곡 제목 (한국어/영문)
  canonical_title TEXT NOT NULL,
  title_en TEXT,
  -- 작곡가/사역팀
  composer TEXT NOT NULL,
  -- 발표 연도
  year INTEGER,
  -- 원곡 언어 (ko, en 등)
  original_language TEXT DEFAULT 'ko',
  -- 신학 주제 (설계서 Primary Theme)
  primary_theme TEXT NOT NULL,
  secondary_theme TEXT,
  -- 성경 구절 (개역개정, 예: 시 148:3)
  scripture_refs TEXT,
  -- 예배 단계/역할 (Liturgical Phase, Worship Role)
  liturgical_phase TEXT NOT NULL CHECK (liturgical_phase IN ('Praise', 'Adoration', 'Response', 'Sending')),
  worship_flow_role TEXT NOT NULL CHECK (worship_flow_role IN ('Opener', 'Transition', 'Climax', 'Meditation')),
  -- 음악 메타 (G Key 기준, BPM, 러닝타임 MM:SS)
  key_common TEXT NOT NULL,
  tempo_bpm INTEGER,
  duration_est TEXT,
  vocal_range TEXT,
  -- 에너지 커브 (반드시 I:1 로 시작)
  energy_curve TEXT NOT NULL,
  dynamic_profile TEXT NOT NULL CHECK (dynamic_profile IN ('slow_burn', 'mountain_peak', 'staircase', 'reflective_wave', 'u_shape')),
  -- 가사 요약 50~100자 / 줄거리 200자 내외
  summary_ko TEXT NOT NULL,
  summary_long TEXT,
  -- 검증 상태 (verified_global = 최종 검증 완료)
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified_global', 'UNKNOWN')),
  -- 감사 로그
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스: 중복 검증(Step 2) 및 추천 검색용
CREATE INDEX IF NOT EXISTS idx_master_songs_canonical_composer ON master_songs (canonical_title, composer);
CREATE INDEX IF NOT EXISTS idx_master_songs_primary_theme ON master_songs (primary_theme);
CREATE INDEX IF NOT EXISTS idx_master_songs_liturgical_phase ON master_songs (liturgical_phase);
CREATE INDEX IF NOT EXISTS idx_master_songs_verification ON master_songs (verification_status);

-- pgvector 확장 후 임베딩 컬럼 추가 시 (RAG용, 추후 마이그레이션):
-- ALTER TABLE master_songs ADD COLUMN IF NOT EXISTS embedding vector(1536);
-- CREATE INDEX ON master_songs USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

COMMENT ON TABLE master_songs IS 'OpenWorship 글로벌 찬양 마스터 데이터 (1곡-N버전 중 핵심 정보)';
