export type Locale = "en" | "ko";

export const translations = {
  en: {
    hero: {
      title: "The essence of worship unchanged,\npreparation deeper and faster",
      titleLine2: "preparation deeper and faster",
      subtitle:
        "Open Worship does not replace worship. We simplify the complex preparation process so you can focus more deeply on the essence of worship—as your worship preparation partner.",
      cta: "Get early access",
      imageAlt: "Worship atmosphere",
    },
    header: {
      cta: "Get early access",
    },
    coreValues: {
      title: "A new way of worship preparation",
      subtitle: "Three core values from Open Worship.",
      value1Title: "Preparation focused on essence",
      value1Desc:
        "Focus on message and direction, not format—so the heart of worship becomes clearer.",
      value2Title: "From idea to completion",
      value2Desc:
        "Turn scattered ideas into a consistent storyline and complete the flow of worship.",
      value3Title: "Preparation with your team",
      value3Desc:
        "Real-time collaboration unites your worship team. Divide roles and complete together.",
    },
    storyline: {
      title: "Contextual song arrangement that fits the whole worship",
      intro:
        "We arrange songs in context with the full worship—sermon, chapters, and flow. Songs match worship chapters (Gathering → Confession → Joy → Hope) and the energy curve for one coherent story.",
      flowLabel: "4-step process",
      flowSentence:
        "Sermon passage & theme → Theological keywords → Song DB & energy curve matching → Chapter storyline arrangement",
      step1: "Sermon passage & theme input",
      step2: "Theological keyword extraction",
      step3: "Song DB & energy curve matching",
      step4: "Chapter storyline arrangement",
      detailSummary: "Song DB energy curve and theological themes are analyzed to place songs by chapter and emotional tone.",
      detailsTitle: "7-stage worship chapter model (customizable)",
      detailsItems: [
        "1. Gathering — Invitation (Low~Medium)",
        "2. Adoration — Praise (Medium~High)",
        "3. Confession — Grace (Low)",
        "4. Thanksgiving — Gratitude (Medium~High)",
        "5. Proclamation — Response (Medium)",
        "6. Commitment — Dedication (Low~Medium)",
        "7. Sending — Blessing (Medium)",
      ],
      exampleTitle: "Worship energy curve · Storyline example",
      exampleSubtitle: "Lent Sunday worship — From the cross to hope",
      chapter1: "Gathering",
      chapter2: "Confession",
      chapter3: "Joy",
      chapter4: "Hope",
      energyCalm: "Calm",
      energyDeep: "Deep reflection",
      energyPeak: "Proclamation · Joy",
      energyCommit: "Commitment · Hope",
      exampleNote:
        "Energy: calm (Gathering·Confession) → peak (salvation joy) → hope (commitment & sending). Songs are placed to match the sermon message and emotional arc.",
      lentSongs: [
        { song: "Just as I am", artist: "J-US", key: "E", bpm: 68 },
        { song: "The Love of the Cross", artist: "Marcus Worship (Stephen Hah)", key: "G", bpm: 64 },
        { song: "Shout for Joy and Sing", artist: "Anointing / Marcus Worship", key: "G", bpm: 128 },
        { song: "The Time, Penetrated", artist: "WELOVE", key: "G", bpm: 64 },
      ],
    },
    collaboration: {
      title: "Not alone—with your team",
      subtitle: "Real-time collaboration unites your worship preparation team.",
      feature1Title: "Real-time editing",
      feature1Desc: "Edit together on one screen with changes reflected instantly.",
      feature2Title: "Role assignment",
      feature2Desc: "Assign roles to divide and streamline worship preparation.",
      feature3Title: "Instant feedback",
      feature3Desc: "Share feedback in comments and align on one direction.",
    },
    deployment: {
      title: "Share your worship in one click",
      subtitle:
        "View and share the worship order across devices.",
      desktop: "Desktop",
      tablet: "Tablet",
      mobile: "Mobile",
      note: "The worship order is optimized for every screen.",
    },
    preregistration: {
      title: "Get early access",
      subtitle: "We’ll notify you first when Open Worship launches.",
      emailLabel: "Email",
      emailPlaceholder: "example@church.org",
      agreeLabel:
        "I agree to the collection and use of my information. (Used only for early-access notifications.)",
      submit: "Get early access",
      loading: "Submitting…",
      successTitle: "You’re on the list.",
      successMessage:
        "We’ll send one notification to the email you provided when we launch.",
      successNote: "No confirmation email is sent right away.",
      errorRequired: "Please enter your email.",
      errorInvalid: "Please enter a valid email address.",
      errorAgree: "Please agree to the collection and use of your information.",
      errorService: "Early access signup is temporarily unavailable. Please try again later.",
      errorSubmit: "Submission failed. Please try again.",
      errorNetwork: "Network error. Please try again.",
      formNote:
        "No confirmation email is sent right away. We’ll notify you once at launch.",
    },
    footer: {
      tagline: "The essence of worship unchanged, preparation deeper and faster",
    },
  },
  ko: {
    hero: {
      title: "예배의 본질은 그대로,\n준비는 더 깊고 빠르게",
      titleLine2: "준비는 더 깊고 빠르게",
      subtitle:
        "오픈워십은 예배를 대신하지 않습니다.\n예배의 본질에 더 깊이 집중할 수 있도록, 복잡한 준비 과정을 간소화하는 예배 준비 파트너입니다.",
      cta: "사전 알림 신청하기",
      imageAlt: "예배 분위기",
    },
    header: {
      cta: "사전 알림 신청",
    },
    coreValues: {
      title: "예배 준비의 새로운 방식",
      subtitle: "오픈워십이 제안하는 세 가지 핵심 가치입니다.",
      value1Title: "본질에 집중하는 준비",
      value1Desc:
        "형식이 아닌 메시지와 방향성에 집중하여, 예배의 핵심이 더 선명해집니다.",
      value2Title: "아이디어에서 완성까지",
      value2Desc:
        "흩어진 아이디어를 일관된 스토리라인으로 정리해 예배 흐름을 완성합니다.",
      value3Title: "팀과 함께하는 준비",
      value3Desc:
        "실시간 협업으로 하나 된 예배 준비. 역할을 나누고 함께 완성해 나갑니다.",
    },
    storyline: {
      title: "예배 전체 내용과 어울리는 컨텍스트 찬양구성",
      intro:
        "예배 전체(설교, 챕터, 흐름)와 어울리는 컨텍스트로 찬양을 구성합니다. 예배 챕터(도입→참회→기쁨→소망)와 에너지 커브에 맞춰 곡의 나열이 아니라 하나의 이야기 흐름으로 설계됩니다.",
      flowLabel: "4단계 처리 흐름",
      flowSentence:
        "설교 본문·주제 입력 → 신학적 키워드 추출 → 찬양 DB·에너지 커브 매칭 → 챕터별 스토리라인 배치",
      step1: "설교 본문·주제 입력",
      step2: "신학적 키워드 추출",
      step3: "찬양 DB·에너지 커브 매칭",
      step4: "챕터별 스토리라인 배치",
      detailSummary:
        "찬양 DB의 에너지 커브와 신학적 주제를 분석해, 챕터별 감정 톤(기승전결)에 맞는 곡을 자동 배치합니다.",
      detailsTitle: "7단계 예배 챕터 모델 (맞춤 재배열 가능)",
      detailsItems: [
        "1. Gathering — 초대·부르심 (Low~Medium)",
        "2. Adoration — 찬양·경배 (Medium~High)",
        "3. Confession — 회개·은혜 (Low)",
        "4. Thanksgiving — 감사 (Medium~High)",
        "5. Proclamation — 말씀·응답 (Medium)",
        "6. Commitment — 헌신 (Low~Medium)",
        "7. Sending — 파송·축복 (Medium)",
      ],
      exampleTitle: "예배 에너지 커브 · 스토리라인 예시",
      exampleSubtitle: "사순절 주일예배 — 십자가에서 소망으로",
      chapter1: "도입",
      chapter2: "참회",
      chapter3: "기쁨",
      chapter4: "소망",
      energyCalm: "잔잔",
      energyDeep: "깊은 묵상",
      energyPeak: "선포·기쁨",
      energyCommit: "결단·소망",
      exampleNote:
        "에너지: 잔잔(도입·참회) → 고조(구원의 기쁨) → 결단·소망. 설교 메시지와 감정의 흐름(Emotional Arc)에 맞춰 곡이 배치됩니다.",
      lentSongs: [
        { song: "내 모습 이대로", artist: "제이어스 (J-US)", key: "E", bpm: 68 },
        { song: "십자가 그 사랑", artist: "마커스워십 (작곡 Stephen Hah)", key: "G", bpm: 64 },
        { song: "기뻐하며 승리의 노래 부르리", artist: "어노인팅 / 마커스워십", key: "G", bpm: 128 },
        { song: "시간을 뚫고", artist: "위러브 (WELOVE)", key: "G", bpm: 64 },
      ],
    },
    collaboration: {
      title: "혼자가 아닌, 팀과 함께",
      subtitle: "실시간 협업으로 예배 준비팀이 하나가 됩니다.",
      feature1Title: "실시간 편집",
      feature1Desc: "한 화면에서 함께 수정하고, 변경 사항이 즉시 반영됩니다.",
      feature2Title: "역할 분담",
      feature2Desc: "담당자를 지정해 효율적으로 예배 준비를 나눌 수 있습니다.",
      feature3Title: "즉시 피드백",
      feature3Desc: "코멘트로 의견을 나누고, 하나 된 방향으로 정리합니다.",
    },
    deployment: {
      title: "완성된 예배, 한 번의 클릭으로 공유",
      subtitle: "예배 순서지를 다양한 디바이스에서 바로 확인하고 공유할 수 있습니다.",
      desktop: "데스크톱",
      tablet: "태블릿",
      mobile: "모바일",
      note: "예배 순서지가 모든 화면에 최적화되어 표시됩니다.",
    },
    preregistration: {
      title: "사전 알림 신청",
      subtitle: "오픈워십 출시 시 가장 먼저 알려드립니다.",
      emailLabel: "이메일",
      emailPlaceholder: "example@church.org",
      agreeLabel:
        "개인정보 수집·이용에 동의합니다. (사전 알림 발송 목적으로만 사용되며, 별도 목적으로 이용하지 않습니다.)",
      submit: "사전 알림 신청하기",
      loading: "등록 중…",
      successTitle: "신청이 완료되었습니다.",
      successMessage: "출시 시 입력하신 이메일로 한 번에 안내해 드립니다.",
      successNote: "지금 당장 확인 메일이 발송되지 않습니다.",
      errorRequired: "이메일을 입력해 주세요.",
      errorInvalid: "올바른 이메일 형식이 아닙니다.",
      errorAgree: "개인정보 수집·이용에 동의해 주세요.",
      errorService:
        "현재 사전 등록 저장 기능이 꺼져 있습니다. 잠시 후 다시 시도해 주세요.",
      errorSubmit: "제출에 실패했습니다. 다시 시도해 주세요.",
      errorNetwork: "네트워크 오류입니다. 다시 시도해 주세요.",
      formNote:
        "지금 당장 확인 메일이 발송되지 않습니다. 출시 시 입력하신 이메일로 한 번에 안내해 드립니다.",
    },
    footer: {
      tagline: "예배의 본질은 그대로, 준비는 더 깊고 빠르게",
    },
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];
