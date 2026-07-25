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

# Install Chromium system dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates fonts-liberation libasound2 libatk-bridge2.0-0 \
    libatk1.0-0 libcups2 libdrm2 libgbm1 libnss3 libnspr4 \
    libpango-1.0-0 libxcomposite1 libxdamage1 libxfixes3 \
    libxkbcommon0 libxrandr2 xdg-utils libu2f-udev \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Copy built frontend
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock ./bun.lock

# Install runtime dependencies (includes @sparticuz/chromium + playwright-core)
RUN bun install --frozen-lockfile --production

# Copy server (compiled by bun at runtime — it's TypeScript)
COPY server.ts ./server.ts

EXPOSE 8080

CMD ["bun", "run", "server.ts"]
