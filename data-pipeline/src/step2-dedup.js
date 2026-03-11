/**
 * [Step 2] 중복 검증 및 유니크 리스트 확정
 * - Supabase master_songs의 canonical_title, composer와 대조
 * - DB에 없는 곡만 반환 (입력: 씨앗 리스트 배열)
 *
 * 사용: node src/step2-dedup.js
 * 입력: stdin JSON 배열 또는 --file=seed-list.json
 */

import { createClient } from "@supabase/supabase-js";
import { env } from "./config.js";
import { readFileSync } from "fs";

if (!env.supabaseUrl || !env.supabaseServiceKey) {
  console.error("SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY 필요.");
  process.exit(1);
}

const supabase = createClient(env.supabaseUrl, env.supabaseServiceKey);

/** 씨앗 리스트 항목: { canonical_title, composer [, ccli_number ] } */
function normalizeRow(row) {
  const title = (row.canonical_title || row.title_ko || "").trim();
  const composer = (row.composer || "").trim();
  return { canonical_title: title, composer, ccli_number: row.ccli_number ?? null };
}

async function getExistingKeys() {
  const { data, error } = await supabase
    .from("master_songs")
    .select("canonical_title, composer, id");
  if (error) throw error;
  const set = new Set(
    (data || []).map(
      (r) => `${(r.canonical_title || "").toLowerCase()}|${(r.composer || "").toLowerCase()}`
    )
  );
  return set;
}

export async function deduplicate(seedList) {
  const rows = Array.isArray(seedList) ? seedList.map(normalizeRow) : [];
  const existing = await getExistingKeys();
  const unique = rows.filter((r) => {
    const key = `${(r.canonical_title || "").toLowerCase()}|${(r.composer || "").toLowerCase()}`;
    return !existing.has(key);
  });
  return unique;
}

async function main() {
  let seedList = [];
  const fileArg = process.argv.find((a) => a.startsWith("--file="));
  if (fileArg) {
    const path = fileArg.split("=")[1];
    seedList = JSON.parse(readFileSync(path, "utf8"));
  } else {
    try {
      const raw = readFileSync(0, "utf8");
      seedList = JSON.parse(raw);
    } catch {
      console.log("사용법: cat seed-list.json | node src/step2-dedup.js");
      console.log("   또는: node src/step2-dedup.js --file=seed-list.json");
      process.exit(1);
    }
  }

  const unique = await deduplicate(seedList);
  console.log(JSON.stringify(unique, null, 2));
  console.error(`[step2] 입력 ${seedList.length}곡 → 유니크 ${unique.length}곡`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
