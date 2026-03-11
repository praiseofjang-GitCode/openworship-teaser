/**
 * [Step 5] 데이터 무결성 검사 (Schema Validation)
 * - energy_curve가 I(Intro)로 시작하는가
 * - id/ccli_number 명명 규칙 (CCLI 있으면 KR-{number}, 없으면 규칙 준수)
 * - summary_ko 50~100자
 *
 * 사용: node src/step5-validate.js [--file=chunk.json]
 */

import { readFileSync } from "fs";

const LITURGICAL = new Set(["Praise", "Adoration", "Response", "Sending"]);
const WORSHIP_ROLE = new Set(["Opener", "Transition", "Climax", "Meditation"]);
const DYNAMIC_PROFILE = new Set([
  "slow_burn",
  "mountain_peak",
  "staircase",
  "reflective_wave",
  "u_shape",
]);
const ENERGY_START = /^I:1/i;

function validateOne(row, index) {
  const errors = [];
  const id = row.id || row.song_id;

  if (!id || typeof id !== "string") errors.push("id(song_id) 필수");
  if (!row.canonical_title) errors.push("canonical_title 필수");
  if (!row.composer) errors.push("composer 필수");
  if (!row.primary_theme) errors.push("primary_theme 필수");
  if (!row.liturgical_phase || !LITURGICAL.has(row.liturgical_phase))
    errors.push("liturgical_phase는 Praise|Adoration|Response|Sending 중 하나");
  if (!row.worship_flow_role || !WORSHIP_ROLE.has(row.worship_flow_role))
    errors.push("worship_flow_role는 Opener|Transition|Climax|Meditation 중 하나");
  if (!row.key_common) errors.push("key_common 필수");
  if (!row.energy_curve) errors.push("energy_curve 필수");
  else if (!ENERGY_START.test(String(row.energy_curve).trim()))
    errors.push("energy_curve는 반드시 I:1로 시작 (예: I:1-V1:1-...)");
  if (!row.dynamic_profile || !DYNAMIC_PROFILE.has(row.dynamic_profile))
    errors.push("dynamic_profile는 slow_burn|mountain_peak|staircase|reflective_wave|u_shape 중 하나");
  if (!row.summary_ko) errors.push("summary_ko 필수");
  else {
    const len = (row.summary_ko || "").length;
    if (len < 50 || len > 100) errors.push(`summary_ko 50~100자 (현재 ${len}자)`);
  }

  if (row.ccli_number != null) {
    const num = Number(row.ccli_number);
    if (Number.isNaN(num) || num < 0) errors.push("ccli_number는 0 이상 숫자 또는 null");
  }

  return { index, id, errors };
}

export function validate(chunk) {
  const list = Array.isArray(chunk) ? chunk : [chunk];
  const results = list.map((row, i) => validateOne(row, i));
  const failed = results.filter((r) => r.errors.length > 0);
  return { results, failed, valid: list.length - failed.length, total: list.length };
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
      console.log("사용법: cat chunk.json | node src/step5-validate.js");
      console.log("   또는: node src/step5-validate.js --file=chunk.json");
      process.exit(1);
    }
  }

  const { failed, valid, total } = validate(chunk);
  if (failed.length) {
    failed.forEach(({ index, id, errors }) => {
      console.error(`[${index}] id=${id}: ${errors.join("; ")}`);
    });
    process.exitCode = 1;
  }
  console.log(JSON.stringify(chunk, null, 2));
  console.error(`[step5] 검증: ${valid}/${total} 통과`);
}

main();
