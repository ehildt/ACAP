# Setup corepack
FROM node:20-slim AS base
RUN corepack enable pnpm

FROM base AS local
WORKDIR /app
ENV PORT 5173
EXPOSE ${PORT}
ENTRYPOINT ["pnpm", "run", "start:dev"]

FROM base AS bundle
WORKDIR /app
COPY ./ ./
RUN pnpm i --ignore-scripts && pnpm run build:prod

FROM nginx:alpine AS production
ENV NGINX_HOST 127.0.0.1
ENV NGINX_PORT 80
EXPOSE ${NGINX_PORT}
COPY --from=bundle /app/dist/ /usr/share/nginx/html
