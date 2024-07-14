FROM node:18-slim as base
FROM base as builder
WORKDIR /home/node/app
COPY package*.json ./
RUN npm ci
RUN apt-get update && apt-get -y install rsync
COPY . .
RUN npm run build

FROM base as runtime
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js
WORKDIR /home/node/app
COPY package*.json  ./
RUN npm ci --omit=dev

COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build
EXPOSE 3000
CMD ["npm", "run", "serve"]
