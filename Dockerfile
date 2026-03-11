# Node.js 24 Alpine (Docker에서 설치한 것과 동일)
FROM node:24-alpine

WORKDIR /app

# 패키지 파일 복사 후 의존성 설치
COPY package.json package-lock.json* ./
RUN npm install

# 소스 복사
COPY . .

# 개발 서버 실행 (0.0.0.0으로 listen 해야 Docker 외부에서 접속 가능)
EXPOSE 3000
ENV HOSTNAME=0.0.0.0
CMD ["npm", "run", "dev"]
