var saml2 = require('saml2-js')
var fs = require('fs')

interface Isp_options {
  entity_id: string
  privatE_key: string
  certificate: string
  assert_endpoint: string
  force_authn: string
  auth_context: {
    comparison: string
    class_refs: string[]
  }
  nameid_format: string
  sign_get_request: boolean
  allow_unencrypted_assertion: boolean
  key: string
}

const sp_options = {
  entity_id: "http://localhost:3000/",
  private_key: fs.readFileSync("./src/utils/key.pem").toString(),
  certificate: fs.readFileSync("./src/utils/cert.pem").toString(),
  assert_endpoint: "http://localhost:3000/api/assert",
  force_authn: true,
  auth_context: { comparison: "exact", class_refs: ["urn:oasis:names:tc:SAML:1.0:am:password"] },
  nameid_format: "urn:oasis:names:tc:SAML:2.0:nameid-format:transient",
  sign_get_request: false,
  allow_unencrypted_assertion: true
}

const idp_options = {
  sso_login_url: "http://localhost:4000/saml/auth",
  sso_logout_url: "http://localhost:4000/saml/auth",
  certificates: [fs.readFileSync("./src/utils/cert.pem").toString()]
}

export const idp = new saml2.IdentityProvider(idp_options)


// Call service provider constructor with options
export const sp = new saml2.ServiceProvider(sp_options);

// Example use of service provider.
// Call metadata to get XML metatadata used in configuration.
const metadata = sp.create_metadata();
