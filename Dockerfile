FROM node:18-alpine as builder

ENV NODE_ENV build

WORKDIR /

COPY package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npm run build \
  && npm prune --production

# ---

FROM node:18-alpine

ENV NODE_ENV production

WORKDIR /

COPY --from=builder --chown=node:node package*.json ./
COPY --from=builder --chown=node:node node_modules/ ./node_modules/
COPY --from=builder --chown=node:node dist/ ./dist/

CMD ["node", "dist/app.js"]