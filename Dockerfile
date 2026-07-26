# ── Stage 1: Install dependencies & build ──────────────────────────
FROM oven/bun:1 AS builder

WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# ── Stage 2: Production ────────────────────────────────────────────
FROM oven/bun:1-slim

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock ./bun.lock

RUN bun install --frozen-lockfile --production

COPY server.ts ./server.ts

EXPOSE 8080

CMD ["bun", "run", "server.ts"]
