FROM node:alpine
RUN npm install -g nodemon
WORKDIR /app
COPY package.json package-lock.json ./
COPY src ./src
RUN npm install
EXPOSE 8003
CMD ["nodemon", "src/index.js"]
