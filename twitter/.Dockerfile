FROM node:slim

WORKDIR /usr

COPY package.json ./
COPY tsconfig.json ./

COPY src ./src
RUN ls -a
RUN npm install

EXPOSE 4001

CMD ["npm","run","dev"]