FROM node:21.7-alpine
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=16384

COPY . .
RUN npm install
