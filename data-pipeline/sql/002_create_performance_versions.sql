-- OpenWorship: performance_versions 테이블
-- 동일 곡의 사역팀별/실연별 버전 (편곡, 에너지, 송폼 등)
-- master_songs.id 를 FK로 참조

CREATE TABLE IF NOT EXISTS performance_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- master_songs 참조 (곡의 고유 ID)
  song_id TEXT NOT NULL REFERENCES master_songs(id) ON DELETE CASCADE,
  -- 유튜브 URL (Unique Key)
  youtube_url TEXT UNIQUE NOT NULL,
  -- 사역팀/채널명
  team_name TEXT,
  -- 예배 실황 날짜
  performance_date DATE,
  -- 이 버전의 에너지 커브·송폼·키·BPM
  energy_curve TEXT,
  song_form TEXT,
  key_used TEXT,
  bpm INTEGER,
  duration_est TEXT,
  dynamic_profile TEXT,
  --
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_performance_versions_song_id ON performance_versions (song_id);

COMMENT ON TABLE performance_versions IS 'OpenWorship 실연 버전 (1곡-N버전)';
