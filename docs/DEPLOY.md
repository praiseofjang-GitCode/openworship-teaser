# 오픈워십 티저 사이트 배포 가이드

이 문서는 `openworship-teaser` 프로젝트를 실제 웹사이트로 올리는 방법을 설명합니다.

---

## 배포 전 준비

1. **프로젝트가 로컬에서 정상 동작하는지 확인**
   ```bash
   cd openworship-teaser
   npm install
   npm run build
   npm run start
   ```
   - `http://localhost:3000` 에서 화면이 뜨고, 빌드 에러가 없어야 합니다.

2. **Git 저장소에 올려두기 (권장)**
   - GitHub / GitLab / Bitbucket 등에 저장소를 만들고, 프로젝트를 push 해 두면 대부분의 호스팅이 “저장소 연결 → 자동 배포”를 지원합니다.

3. **사전 알림 이메일 저장을 쓸 경우**
   - Supabase에서 `pre_registrations` 테이블 생성 (`data-pipeline/sql/003_pre_registrations.sql` 실행)
   - 배포 플랫폼에서 **환경 변수** 설정:
     - `SUPABASE_URL` = Supabase 프로젝트 URL  
     - `SUPABASE_SERVICE_ROLE_KEY` = Supabase 서비스 롤 키  

---

## 방법 1: Vercel로 배포 (가장 간단, 추천)

Next.js를 만든 Vercel에 올리면 설정이 거의 없고, 무료 플랜으로도 충분합니다.

### 1단계: Vercel 가입 및 프로젝트 연결

1. [vercel.com](https://vercel.com) 에 가입 후 로그인.
2. **Add New… → Project** 선택.
3. **Import Git Repository** 에서 GitHub 등에 올려둔 `openworship-teaser` 저장소를 선택 (또는 **Import** 로 업로드).
4. **Root Directory** 가 `openworship-teaser` 인지 확인. (저장소 루트가 이 폴더라면 비워 둠.)
5. **Environment Variables** 에 다음 추가 (사전 알림 저장 사용 시):
   - `SUPABASE_URL`  
   - `SUPABASE_SERVICE_ROLE_KEY`  
6. **Deploy** 클릭.

### 2단계: 배포 후

- 배포가 끝나면 `https://프로젝트이름.vercel.app` 형태의 URL이 생깁니다.
- **Settings → Domains** 에서 본인 도메인(예: `teaser.openworship.com`)을 연결할 수 있습니다.

### 3단계: 커스텀 도메인 연결 (GoDaddy 예: openworship.co)

티저 사이트를 **openworship.co** (또는 **www.openworship.co**) 로 열리게 하려면 아래 순서대로 진행하면 됩니다.

#### 1) Vercel에서 도메인 추가

1. Vercel 대시보드 → **openworship-teaser** 프로젝트 선택.
2. **Settings** → **Domains** 이동.
3. **Add** 란에 `openworship.co` 입력 후 **Add**.
4. 같은 방식으로 `www.openworship.co` 도메인도 추가 (선택).
5. 추가한 각 도메인 옆에 Vercel이 **어떤 DNS 설정을 하라고 안내**하는지 확인합니다. (아래 2)에서 사용)

#### 2) GoDaddy에서 DNS 설정

1. [godaddy.com](https://www.godaddy.com) 로그인 → **My Products** → **openworship.co** 옆 **DNS** 클릭.
2. **Records** 탭에서 아래와 같이 추가·수정합니다.

| Type | Name | Value | TTL |
|------|------|--------|-----|
| **A** | `@` | `76.76.21.21` | 600 (또는 기본값) |
| **CNAME** | `www` | `cname.vercel-dns.com` | 600 (또는 기본값) |

- **루트 도메인 (openworship.co)**  
  - Type: **A**  
  - Name: **@** (또는 비워 두기, GoDaddy에 따라 다름)  
  - Value: **76.76.21.21** (Vercel이 안내하는 IP가 다르면 그 값 사용)

- **www (www.openworship.co)**  
  - Type: **CNAME**  
  - Name: **www**  
  - Value: **cname.vercel-dns.com**

3. 기존에 `@` 또는 `www` 에 대한 A/CNAME 레코드가 있으면 **삭제하거나** 위 값으로 **수정**합니다.
4. 저장 후 **몇 분~최대 48시간** 정도 기다리면 전파됩니다. 보통 10~30분 내에 반영되는 경우가 많습니다.

#### 3) Vercel에서 SSL 확인

- **Settings → Domains** 에서 `openworship.co`, `www.openworship.co` 옆 상태가 **Valid Configuration** 이고, SSL이 자동 발급되면 완료입니다.
- 브라우저에서 **https://openworship.co** 로 접속해 보면 됩니다.

> **참고:** Vercel이 도메인 추가 시 화면에 표시하는 **정확한 IP 또는 CNAME 값**이 위와 다르면, 그때 안내하는 값으로 설정하세요.

### 참고

- 저장소에 push 할 때마다 자동으로 다시 배포됩니다.
- 환경 변수는 **Vercel 대시보드 → Project → Settings → Environment Variables** 에서 수정할 수 있습니다.

---

## 방법 2: Netlify로 배포

1. [netlify.com](https://netlify.com) 가입 후 로그인.
2. **Add new site → Import an existing project** → GitHub 등 연결 후 `openworship-teaser` 저장소 선택.
3. 빌드 설정:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next` 가 아니라 **그대로 비우고**, Netlify가 Next.js 런타임을 쓰도록 둡니다.  
     (Netlify는 Next.js 플러그인으로 서버 기능도 지원합니다.)
4. **Environment variables** 에 `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` 추가 (필요 시).
5. **Deploy site** 로 배포.
6. 주소는 `https://랜덤이름.netlify.app` 이며, **Domain settings** 에서 커스텀 도메인 연결 가능.

---

## 방법 3: 직접 서버(VPS)에 올리기 (Coolify / Docker)

이미 Coolify나 Docker를 쓰는 서버가 있다면, 같은 방식으로 올릴 수 있습니다.

### 1단계: 빌드용 Dockerfile (선택)

- 현재 `Dockerfile` 은 **개발 서버** (`npm run dev`) 기준입니다.
- **운영(production)** 에서는 `npm run build` 후 `npm run start` 로 띄우는 것이 좋습니다.

**운영용 Dockerfile 예시** (프로젝트 루트에 `Dockerfile.prod` 등으로 저장):

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
EXPOSE 3000
CMD ["node", "server.js"]
```

- 이 구성을 쓰려면 `next.config.js` 에 `output: 'standalone'` 를 추가해야 합니다.

### 2단계: Coolify에서 배포

1. Coolify 대시보드에서 **새 프로젝트** 생성.
2. **Git** 저장소 연결 후 `openworship-teaser` 선택.
3. **Dockerfile** 경로 지정 (예: `Dockerfile` 또는 위에서 만든 `Dockerfile.prod`).
4. **Environment** 에 `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` 설정.
5. 배포 후 서버 IP 또는 연결한 도메인으로 접속.

- 기존 `Dockerfile`(dev)만 쓸 경우: 서버에서 `docker build -t openworship-teaser .` 후 `docker run -p 3000:3000 -e SUPABASE_URL=... -e SUPABASE_SERVICE_ROLE_KEY=... openworship-teaser` 로 실행할 수 있습니다. (개발 모드라 성능/안정성은 운영보다 낮을 수 있습니다.)

---

## 방법 4: 정적(Static) 내보내기 후 아무 호스팅에 올리기

- **사전 알림 API** (`/api/preregister`) 를 쓰지 않고, **화면만** 공개해도 된다면:
  1. Next.js를 정적 내보내기하도록 설정하고  
  2. 생성된 `out` (또는 `build`) 폴더를 GitHub Pages, AWS S3, Cloudflare Pages 등 **정적 호스팅**에 올리면 됩니다.

- 단, 현재 프로젝트는 `getServerSideProps`나 API 라우트를 쓰므로, 정적 내보내기를 쓰려면:
  - `/api/preregister` 를 제거하거나, 폼 제출을 외부 서비스(예: Google Form, Typeform)로 바꾸고  
  - `next.config.js` 에 `output: 'export'` 를 넣은 뒤 `npm run build` 하면 `out` 폴더가 생깁니다.  
  - 이 `out` 폴더 전체를 호스팅 업체의 “정적 사이트” 루트로 업로드하면 됩니다.

---

## 요약

| 방법 | 난이도 | 비용 | 적합한 경우 |
|------|--------|------|-------------|
| **Vercel** | ★ 쉬움 | 무료 플랜 있음 | Next.js 그대로, API까지 쓰고 싶을 때 |
| **Netlify** | ★ 쉬움 | 무료 플랜 있음 | Vercel과 비슷, 선호 서비스가 Netlify일 때 |
| **Coolify/Docker** | ★★ 보통 | VPS 비용 | 이미 서버가 있거나, 자체 호스팅이 필요할 때 |
| **정적 내보내기** | ★★ 보통 | 호스팅에 따라 무료~ | API 없이 화면만 공개할 때 |

**처음 웹에 올리는 경우**라면 **Vercel + GitHub** 조합을 추천합니다.  
저장소만 연결하고 환경 변수만 넣으면, 이후에는 **코드를 push 할 때마다 자동으로 사이트가 갱신**됩니다.
