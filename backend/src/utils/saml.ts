import saml2 from 'saml2-js'
import fs from 'fs'
import dotenv from 'dotenv'
import { getMetadata } from './controller_helpers/login'
import { IspOptions } from './typescript'
// tslint:disable-next-line:no-var-requires
const samlify = require('samlify')
dotenv.config()

// tslint:disable-next-line:variable-name
const sp_options: IspOptions = {
  entity_id: process.env.ENTITY_ID,
  private_key: fs.readFileSync('./src/utils/samldata/key.pem').toString(),
  certificate: fs.readFileSync('./src/utils/samldata/cert.pem').toString(),
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
  certificates: [fs.readFileSync('./src/utils/samldata/idp-public-cert.pem').toString()]
}

export const generateLocalIdp = async () => {
  const m = await getMetadata('http://localhost:7000/metadata')
  return samlify.IdentityProvider({
    metadata: m,
    signatureConfig: {
      prefix: 'ds',
      location: {
        reference: '/samlp:Response/saml:Issuer',
        action: 'after'
      }
    }
  })
}

export const idp = new saml2.IdentityProvider(idp_options)

// Call service provider constructor with options
export const sp = new saml2.ServiceProvider(sp_options)

// Example use of service provider.
// Call metadata to get XML metatadata used in configuration.
const metadata = sp.create_metadata()
