const { runServer } = require('saml-idp');
const { dotenv } = require('dotenv').config()

console.log(process.env.ASCURL, process.env.AUDIENCE)
runServer({
  acsUrl: process.env.ASCURL,
  audience: process.env.AUDIENCE,
});