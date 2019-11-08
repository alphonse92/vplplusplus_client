FROM nginx:alpine
ARG PUBLIC_URL
ARG API_BASEURL
ARG CLIENT_ID
ARG URL_REGISTRY
# COPY . /usr/share/nginx/html

RUN apk add --update nodejs nodejs-npm
RUN echo environment variables PUBLIC_URL=${PUBLIC_URL} CLIENT_ID=${CLIENT_ID} PUBLIC_URL=${API_BASEURL}  URL_REGISTRY=${URL_REGISTRY} \
  && node -v \
  && npm -v

WORKDIR /tmp/
COPY package.json package.json
RUN npm install 
WORKDIR /usr/app/
COPY . .
RUN mv /tmp/node_modules ./node_modules \
  &&  PUBLIC_URL=${PUBLIC_URL} API_BASEURL=${API_BASEURL} CLIENT_ID=${CLIENT_ID} URL_REGISTRY=${URL_REGISTRY} npm run build
RUN rm -rf /usr/share/nginx/html && mkdir /usr/share/nginx/html && mv ./build/* /usr/share/nginx/html
