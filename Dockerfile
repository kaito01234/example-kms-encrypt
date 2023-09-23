FROM node:20-alpine3.17
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY prisma ./
RUN npm run db:generate
COPY . .
RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main.js" ]