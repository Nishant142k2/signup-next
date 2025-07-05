FROM node:22 AS builder
WORKDIR /app
COPY package*.json ./

RUN  npm install --frozen-lockfile
FROM node:22 AS runner
ENV NODE_ENV production
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/ .next
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000

CMD ["node","start"]