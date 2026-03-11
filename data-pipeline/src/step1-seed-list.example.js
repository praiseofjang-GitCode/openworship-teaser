/**
 * [Step 1] 곡 탐색 및 씨앗 리스트 생성 (Gemini + Google Search)
 *
 * 설계 요구사항:
 * - Gemini가 Google 검색 기능을 활용해 한국 교회 인기 찬양 100개 추출
 * - 실제 음원 발매 여부·CCLI 등록 여부 동시 확인
 * - 검색 결과(URL)가 없는 곡은 리스트에서 제외
 *
 * 출력 형식 (seed-list.json):
 * [
 *   { "canonical_title": "꽃들도", "composer": "JWorship", "ccli_number": 7115514 },
 *   ...
 * ]
 *
 * 연동 방법:
 * 1) Google Custom Search API + Gemini API 키를 .env에 설정
 * 2) Gemini에 "한국 교회 인기 찬양 100곡, CCLI 등록·음원 URL 확인" 프롬프트 전달
 * 3) 응답에서 곡명·작곡가·CCLI 번호 파싱 후 JSON 배열로 저장
 *
 * 참고: @see docs/openworship_song_database.md
 */

console.log("Step 1은 Gemini + Google Search API 연동 후 구현합니다.");
console.log("출력: seed-list.json (canonical_title, composer, ccli_number)");
