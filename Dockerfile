FROM nginx:alpine

RUN apk add --update nodejs nodejs-npm python py-pip  && pip install j2cli


WORKDIR /tmp/
COPY ./.nginx/default.conf /etc/nginx/conf.d/
COPY package.json package.json
RUN npm install 
WORKDIR /usr/app/

COPY . .

# Copy the installed dependencies
RUN mkdir -p ./build  &&  mv /tmp/node_modules ./node_modules  \
  # remove env file
  && rm -rf .env \
  # Create a env file, each variable will be a variable that j2 will replace with real env keys later
  && echo REACT_APP_ENV={{REACT_APP_ENV}} >> .env \
  && echo REACT_APP_PUBLIC_URL={{REACT_APP_PUBLIC_URL}} >> .env \
  && echo REACT_APP_API_BASEURL={{REACT_APP_API_BASEURL}} >> .env \
  && echo REACT_APP_CLIENT_ID={{REACT_APP_CLIENT_ID}} >> .env \
  # Run build script
  && npm run build \
  # Remove the nginx html folder
  && rm -rf /usr/share/nginx/html \
  # Create a new html folder 
  && mkdir /usr/share/nginx/html  \
  # Move the app to the ngingx public folder
  && mv ./build/* /usr/share/nginx/html 

RUN echo "#!/bin/sh" >> entrypoint.sh \
  && echo "cd /usr/app/" >> entrypoint.sh \
  && echo "# remove envars" >> entrypoint.sh \
  && echo "rm -rf .env" >> entrypoint.sh \
  && echo "# create a env file from envars" >> entrypoint.sh \
  && echo "printenv >> .env" >> entrypoint.sh \
  && echo "# The index html is a template to create a new index.html" >> entrypoint.sh \
  && echo "# So, create and replace the index.html fullfilled with all the environments that i need" >> entrypoint.sh \
  && echo "j2 --format=env  /usr/share/nginx/html/index.html .env > /usr/share/nginx/html/index.full.html" >> entrypoint.sh \
  && echo "rm -rf  /usr/share/nginx/html/index.html" >> entrypoint.sh \
  && echo "mv  /usr/share/nginx/html/index.full.html  /usr/share/nginx/html/index.html" >> entrypoint.sh \
  && echo "# Start the daemon" >> entrypoint.sh \
  && echo "echo Serving application" >> entrypoint.sh \
  && echo "nginx -g 'daemon off;'" >> entrypoint.sh \
  && chmod +x  entrypoint.sh

ENTRYPOINT ["/usr/app/entrypoint.sh"]


