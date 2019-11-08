FROM nginx:alpine
ARG PUBLIC_URL
ARG API_BASEURL
ARG CLIENT_ID
# COPY . /usr/share/nginx/html

RUN apk add --update nodejs nodejs-npm
RUN echo environment variables PUBLIC_URL=${PUBLIC_URL} CLIENT_ID=${CLIENT_ID} PUBLIC_URL=${API_BASEURL} \
  && node -v \
  && npm -v

WORKDIR /usr/app/
COPY . /usr/app/
RUN npm install 
RUN PUBLIC_URL=${PUBLIC_URL} CLIENT_ID=${CLIENT_ID} PUBLIC_URL=${API_BASEURL} npm run build
RUN mv ./build /usr/share/nginx/html
