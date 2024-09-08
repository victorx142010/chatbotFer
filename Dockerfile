FROM node:18-bullseye as bot
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
ARG RAILWAY_STATIC_URL
ARG PUBLIC_URL
ARG PORT
CMD ["npm", "start"]
# Instala eslint globalmente
RUN npm uninstall eslint
RUN npm install -g eslint@5.52.0
