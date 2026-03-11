/**
 * [Step 6] Supabase master_songs 최종 적재 (Upsert)
 * - id를 Primary Key로 upsert (있으면 update, 없으면 insert)
 * - 적재 완료된 곡은 다음 루프의 '제외 리스트'에 포함되도록 Step 2에서 자동 제외됨
 *
 * 사용: node src/step6-upsert.js [--file=validated-chunk.json]
 */

import { createClient } from "@supabase/supabase-js";
import { env } from "./config.js";
import { readFileSync } from "fs";

if (!env.supabaseUrl || !env.supabaseServiceKey) {
  console.error("SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY 필요.");
  process.exit(1);
}

const supabase = createClient(env.supabaseUrl, env.supabaseServiceKey);

const COLUMNS = [
  "id",
  "ccli_number",
  "canonical_title",
  "title_en",
  "composer",
  "year",
  "original_language",
  "primary_theme",
  "secondary_theme",
  "scripture_refs",
  "liturgical_phase",
  "worship_flow_role",
  "key_common",
  "tempo_bpm",
  "duration_est",
  "vocal_range",
  "energy_curve",
  "dynamic_profile",
  "summary_ko",
  "summary_long",
  "verification_status",
];

function toRow(row) {
  const r = { ...row };
  if (r.song_id && !r.id) r.id = r.song_id;
  if (r.verification_status === undefined) r.verification_status = "verified_global";
  if (r.original_language === undefined) r.original_language = "ko";
  const out = {};
  for (const key of COLUMNS) {
    if (r[key] !== undefined) out[key] = r[key];
  }
  out.updated_at = new Date().toISOString();
  return out;
}

export async function upsertChunk(rows) {
  const list = Array.isArray(rows) ? rows : [rows];
  const payload = list.map(toRow);
  const { data, error } = await supabase.from("master_songs").upsert(payload, {
    onConflict: "id",
    ignoreDuplicates: false,
  });
  if (error) throw error;
  return { inserted: payload.length, data };
}

async function main() {
  let chunk = [];
  const fileArg = process.argv.find((a) => a.startsWith("--file="));
  if (fileArg) {
    const path = fileArg.split("=")[1];
    chunk = JSON.parse(readFileSync(path, "utf8"));
  } else {
    try {
      const raw = readFileSync(0, "utf8");
      chunk = JSON.parse(raw);
    } catch {
      console.log("사용법: cat validated-chunk.json | node src/step6-upsert.js");
      console.log("   또는: node src/step6-upsert.js --file=validated-chunk.json");
      process.exit(1);
    }
  }

  const result = await upsertChunk(chunk);
  console.log(JSON.stringify(result, null, 2));
  console.error(`[step6] upsert 완료: ${result.inserted}건`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
