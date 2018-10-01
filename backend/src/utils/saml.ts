import saml2 from 'saml2-js'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

// tslint:disable-next-line:class-name
interface Isp_options {
  entity_id: string
  private_key: string
  certificate: string
  assert_endpoint: string
  force_authn: boolean
  auth_context: {
    comparison: string
    class_refs: string[]
  }
  nameid_format: string
  sign_get_request: boolean
  allow_unencrypted_assertion: boolean
  [key: string]: string | {
    comparison: string
    class_refs: string[]
  } | boolean
}

// tslint:disable-next-line:variable-name
const sp_options: Isp_options = {
  entity_id: process.env.ENTITY_ID,
  private_key: fs.readFileSync('./src/utils/key.pem').toString(),
  certificate: fs.readFileSync('./src/utils/cert.pem').toString(),
  assert_endpoint: process.env.ASSERT_ENDPOINT,
  force_authn: true,
  auth_context: { comparison: 'exact', class_refs: ['urn:oasis:names:tc:SAML:1.0:am:password'] },
  nameid_format: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
  sign_get_request: false,
  allow_unencrypted_assertion: true
}

// tslint:disable-next-line:variable-name
const idp_options = {
  sso_login_url: process.env.SSO_LOGIN_URL,
  sso_logout_url: process.env.SSO_LOGOUT_URL,
  certificates: [fs.readFileSync('./src/utils/idp-public-cert.pem').toString()]
}

export const idp = new saml2.IdentityProvider(idp_options)

// Call service provider constructor with options
export const sp = new saml2.ServiceProvider(sp_options)

// Example use of service provider.
// Call metadata to get XML metatadata used in configuration.
const metadata = sp.create_metadata()
