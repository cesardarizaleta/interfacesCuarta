# ./server/Dockerfile
FROM node:24-alpine3.21
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --omit=dev # Instala solo dependencias de producción
COPY . .
EXPOSE 3000
CMD ["node", "server.js"] # O el archivo principal de tu app Express