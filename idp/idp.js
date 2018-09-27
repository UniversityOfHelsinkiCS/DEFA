const { runServer } = require('saml-idp');

runServer({
  acsUrl: `http://localhost:3000/api/assert`,
  audience: `http://localhost:3000/`,
});