FROM node:12

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4004
ENV DB_MONGO=mongodb://entriesdb:27017/merntasksdb
ENV JWT_SECRET=asdf1234zxcv

EXPOSE 4004

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
