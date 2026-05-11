FROM node:22.12-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS build
WORKDIR /app
COPY . .
RUN npm run build

FROM node:22.12-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/out ./out
COPY --from=build /app/server ./server
# Railway PORT ortam değişkeni ile atanır; EXPOSE yalnızca belgelendirme amaçlı
EXPOSE 8080
ENV HOST=0.0.0.0
CMD ["npm", "run", "start"]
