FROM node:18-alpine as builder
WORKDIR /app

COPY --chown=node:node package*.json ./
RUN npm ci 

COPY --chown=node:node . .
RUN sed -i s'API_URL: "https:\/\/todo-back.fly.dev"' \
    ./src/environments/environment.prod.ts; \
    npm run build --omit=dev;

FROM nginx:mainline-alpine
COPY --from=builder /app/dist/todo-app /usr/share/nginx/html
COPY nginx.fly.conf /etc/nginx/conf.d/default.conf