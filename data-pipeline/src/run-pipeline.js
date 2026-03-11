/**
 * Step 2 → 3(청크) → 5(검증) → 6(upsert) 순차 실행
 * Step 1(씨앗 리스트)은 Gemini/Google 연동 후 seed-list.json 생성 필요
 * Step 4(정밀 분석)는 Azure GPT-4o 연동 후 각 청크별 분석 결과를 chunk-*.json으로 저장 필요
 *
 * 사용: node src/run-pipeline.js --seed=seed-list.json [--chunk-size=10]
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { createClient } from "@supabase/supabase-js";
import { env } from "./config.js";
import { deduplicate } from "./step2-dedup.js";
import { validate } from "./step5-validate.js";
import { upsertChunk } from "./step6-upsert.js";

const CHUNK_SIZE = 10;

function chunk(list, size) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

async function main() {
  const seedPath =
    process.argv.find((a) => a.startsWith("--seed="))?.split("=")[1] || "seed-list.json";
  const chunkSize = Number(
    process.argv.find((a) => a.startsWith("--chunk-size="))?.split("=")[1] || CHUNK_SIZE
  );

  if (!existsSync(seedPath)) {
    console.error("씨앗 리스트 파일이 없습니다:", seedPath);
    console.error("Step 1(Gemini+Google)으로 seed-list.json을 생성한 뒤 실행하세요.");
    process.exit(1);
  }

  const seedList = JSON.parse(readFileSync(seedPath, "utf8"));
  console.log("[run] Step 2: 중복 제거...");
  const unique = await deduplicate(seedList);
  if (unique.length === 0) {
    console.log("적재할 신규 곡이 없습니다.");
    return;
  }

  const chunks = chunk(unique, chunkSize);
  console.log(`[run] Step 3: ${unique.length}곡을 ${chunkSize}개 단위 ${chunks.length}개 청크로 분할`);

  // Step 4 결과 파일이 있으면 사용, 없으면 청크만 저장하고 안내
  let totalUpserted = 0;
  for (let i = 0; i < chunks.length; i++) {
    const chunkPath = `chunk-${i + 1}.json`;
    let data = chunks[i];
    if (existsSync(chunkPath)) {
      data = JSON.parse(readFileSync(chunkPath, "utf8"));
      console.log(`[run] Step 5 & 6: ${chunkPath} 검증 후 upsert...`);
      const { failed, valid } = validate(data);
      if (failed.length) {
        console.error(`${chunkPath} 검증 실패:`, failed);
        continue;
      }
      await upsertChunk(data);
      totalUpserted += data.length;
    } else {
      writeFileSync(chunkPath, JSON.stringify(chunks[i], null, 2));
      console.log(`[run] ${chunkPath} 생성됨. Step 4(Azure GPT-4o)로 분석 후 다시 실행하세요.`);
    }
  }

  if (totalUpserted) console.log(`[run] 총 ${totalUpserted}건 적재 완료.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
