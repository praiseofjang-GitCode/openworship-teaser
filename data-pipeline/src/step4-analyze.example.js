/**
 * [Step 4] 정밀 신학/음악 분석 (Azure GPT-4o)
 *
 * 입력: 10개 곡명·아티스트 (chunk-N.json from Step 3)
 * 출력: 마스터 프롬프트에 따른 메타데이터 (id, energy_curve(I:1 시작), summary_ko 50~100자 등)
 *
 * 분석 항목:
 * - Theology: primary_theme, secondary_theme, scripture_refs(KRV), liturgical_phase
 * - Musicology: key_common(G 기준), tempo_bpm, energy_curve(송폼 기반, I:1 시작), dynamic_profile
 * - Rights: ccli_number 조회, verification_status = verified_global
 * - 불확실한 값은 'UNKNOWN' 표기 (환각 방지)
 *
 * 연동 방법:
 * 1) AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_KEY, AZURE_OPENAI_DEPLOYMENT 설정
 * 2) 청크별로 10곡 정보를 프롬프트에 넣고 GPT-4o 호출
 * 3) 응답을 스키마에 맞게 파싱 후 Step 5 검증 → Step 6 upsert
 *
 * 참고: @see docs/openworship_song_database.md Section 3 (핵심 데이터 정의)
 */

console.log("Step 4는 Azure OpenAI(GPT-4o) 연동 후 구현합니다.");
console.log("입력: chunk-N.json (10곡) → 출력: 동일 파일 덮어쓰기 또는 validated-chunk-N.json");
