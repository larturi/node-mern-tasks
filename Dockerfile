FROM node:12

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4004
ENV DB_MONGO=${DB_MONGO}
ENV JWT_SECRET=${JWT_SECRET}

EXPOSE 4004

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
