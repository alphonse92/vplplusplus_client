console.clear()

const chalk = require('chalk')


const {
  PUBLIC_URL,
  API_BASEURL,
  CLIENT_ID
} = process.env

const REQUIRED_PARAMS = `

  ${chalk.red("ERROR:")} ${chalk.yellow("Required the next parameters, passed as environment parameters")}

  ${chalk.yellow("PUBLIC_URL  : ")} where your client will be mounted (http://mydomain.com/myClient/)
  ${chalk.yellow("API_BASEURL : ")} Url to the Vpl ++ API
  ${chalk.yellow("CLIENT_ID   : ")} the client id for your application in your google projects. More information: https://developers.google.com/identity/sign-in/web/sign-in

  ${chalk.yellow("You can run For example:")}

  ${chalk.yellow("PUBLIC_URL")}="/myClient" ${chalk.yellow("API_BASEURL")}="http://localhost:1337/api/v1" ${chalk.yellow("CLIENT_ID")}="yourTokenIsHere.apps.googleusercontent.com" npm run build

`

if (!API_BASEURL || !CLIENT_ID || !PUBLIC_URL) {
  console.log(REQUIRED_PARAMS)
  process.exit(1)
}

require('./scripts/build')