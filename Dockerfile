FROM nginx:alpine
ARG PUBLIC_URL
ARG API_BASEURL
ARG CLIENT_ID
# COPY . /usr/share/nginx/html

RUN apk add --update nodejs nodejs-npm
RUN echo environment variables PUBLIC_URL=${PUBLIC_URL} CLIENT_ID=${CLIENT_ID} PUBLIC_URL=${API_BASEURL}  URL_REGISTRY=${URL_REGISTRY} \
  && node -v \
  && npm -v

WORKDIR /tmp/
COPY ./.nginx/default.conf /etc/nginx/conf.d/
COPY package.json package.json
RUN npm install 
WORKDIR /usr/app/
COPY . .
# Copy the installed dependencies
RUN mv /tmp/node_modules ./node_modules  \
# Run build script
&& npm run build \
# Remove the nginx html folder
&& rm -rf /usr/share/nginx/html \
# Create a new html folder 
&& mkdir /usr/share/nginx/html  \
# Move the app to the ngingx public folder
&& mv ./build/* /usr/share/nginx/html 

