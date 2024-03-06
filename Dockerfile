FROM node:21.6.2

WORKDIR /user/src/app

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]