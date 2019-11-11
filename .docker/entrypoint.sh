
rm -rf .env
echo NODE_ENV=${NODE_ENV} >> .env
echo PUBLIC_URL=${PUBLIC_URL} >> .env
echo API_BASEURL=${API_BASEURL} >> .env
echo CLIENT_ID=${CLIENT_ID} >> .env
cat .env
j2 --format=env  index.template.html .env > /usr/share/nginx/html/index.html