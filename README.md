# Vpl ++ Web client

This software is a client for VPL ++  to allow to moodle teachers creates projects, test and test cases. Also, the teacher can generate reports about the projects and students. In the other hand, the Moodle manager can manage the topics and the access of VPL ++ JLib Runner 

## Manual serving

### Before all

1. run ` npm install `
2. run `mv .env.example .env`
3. Open `.env` file and configure the environment variables. (Go to building section to know what variables are needed)

### Requeriments 

1. npx
2. node v8 or greater

### Running

1. run `npm start`

### Building

1. run `npm run build`

### Serving local

After install you can serve the client using serve package. That package mount a simple web server ready to go.

1. install serve: `npm install -g serve`
2. run: `npm install $PATH_TO_BUILD_FOLDER`


## Docker version

The container only exposes the port 80, if you want to open another port please use port mapping.

#### Build

```yaml
version: "3.3"
services:
  client:
    container_name: vplclient
    build: ./vplplusplus_client
    ports:
      - "3000:80"
```
`docker-compose build client`

### Running

#### Env vars

1. NODE_ENV: environment name
2. REACT_APP_ENV: the same that NODE_ENV
3. REACT_APP_PUBLIC_URL: public url
4. REACT_APP_API_BASEURL: VPL api url
5. REACT_APP_CLIENT_ID: google api key for your app. Required to use gAuth

### Docker-compose

```yaml
version: "3.3"
services:
  client:
    container_name: vplclient
    build: ./vplplusplus_client
    environment:
      NODE_ENV: production
      REACT_APP_ENV: production
      REACT_APP_PUBLIC_URL: /
      REACT_APP_API_BASEURL: http://api:1337/api/v1
      REACT_APP_CLIENT_ID: your-g-key.apps.googleusercontent.com
    ports:
      - "3000:80"
```