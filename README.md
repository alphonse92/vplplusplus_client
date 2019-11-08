# Vpl ++ Web client (Vwc)

Vwc is a client to allow to moodle teachers to get all VPL ++ information related to the students summaries. 

# Development

## Requeriments 

1. npx
2. node v8 or greater

## Installation

1. run ` npm install `
2. run `mv .env.example .env`
3. Open `.env` file and configure the environment variables. (Go to building section to know what variables are needed)

## Run 

1. run `npm start`

# Building

## Requeriments

1. Node V8 or greater
2. npm

## Steps

You need pass down the next variables as enviroment variables when you run `npm run build`

1. PUBLIC_URL: this env var configure where is the web application mounted. For example: for the domain `www.mydomain.com/theClient/` you need set the PUBLIC_URL to `/theClient/`

2. API_BASEURL: the URL where is the VPL ++ api
3. CLIENT_ID: the client id for your application in your google projects. More information: https://developers.google.com/identity/sign-in/web/sign-in

All variables are a mandatory

For example :

```
PUBLIC_URL="/" API_BASEURL="http://localhost:1337/api/v1" CLIENT_ID="126760867544-k1es3tqiho46b0g831cmsvgokvl0npqu.apps.googleusercontent.com" npm run build
```

The installation process will create a folder called "build" with all files of the webclient. Its ready to be deployed using apache, nginx  or other web server that you prefer.


## Serving local

After install you can serve the client using serve package. That package mount a simple web server ready to go.

1. install serve: `npm install -g serve`
2. run: `npm install {PATH_TO_BUILD_FOLDER}`

