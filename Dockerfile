FROM node:22.12-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS build
WORKDIR /app
ARG VITE_SITE_URL=https://hacettepeisitme.com.tr
ARG VITE_GTM_ID=
ARG VITE_GA_MEASUREMENT_ID=G-5HBR604GT5
ARG VITE_META_PIXEL_ID=
ENV VITE_SITE_URL=$VITE_SITE_URL
ENV VITE_GTM_ID=$VITE_GTM_ID
ENV VITE_GA_MEASUREMENT_ID=$VITE_GA_MEASUREMENT_ID
ENV VITE_META_PIXEL_ID=$VITE_META_PIXEL_ID
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
