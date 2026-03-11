import "dotenv/config";

const required = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"];

function checkEnv() {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    console.warn(
      `[config] 다음 환경 변수가 없습니다: ${missing.join(", ")}. .env.example 참고.`
    );
  }
  return {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
}

export const env = checkEnv();
