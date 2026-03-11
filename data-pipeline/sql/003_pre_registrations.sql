-- 티저 사이트 '사전 알림 신청' 이메일 저장용
-- Supabase SQL Editor에서 실행 (001, 002 다음에 실행 가능)

CREATE TABLE IF NOT EXISTS pre_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pre_registrations_email ON pre_registrations (email);

COMMENT ON TABLE pre_registrations IS '오픈워십 티저 사전 알림 신청 이메일';
