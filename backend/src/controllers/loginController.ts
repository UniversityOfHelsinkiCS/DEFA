import { Request, Response, Router } from 'express'
import { DOMParser, XMLSerializer } from 'xmldom'
import {
  responseUrl,
    ISamlResponse,
  getMetadata,
  samlResponseAttributes,
  signToken
} from '../utils/controller_helpers/login'
// tslint:disable-next-line:no-var-requires
const samlify = require('samlify')
import fs from 'fs'
import { generateLocalIdp } from '../utils/saml'

const router: Router = Router()

const sp = samlify.ServiceProvider({
  metadata: fs.readFileSync('./src/utils/samldata/metadata.xml'),
  encPrivateKey: fs.readFileSync('./src/utils/samldata/key.pem'),
  privateKey: fs.readFileSync('./src/utils/samldata/key.pem'),
  loginNameIDFormat: 'transient'
})

// tslint:disable-next-line:no-any
let idp: any = null

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const metadata = await getMetadata(req.query.entityID)
  const d = new DOMParser().parseFromString(metadata, 'text/xml')
  d.getElementsByTagName('IDPSSODescriptor')[0].setAttribute('WantAuthnRequestsSigned', 'true')

  idp = samlify.IdentityProvider({
    metadata: new XMLSerializer().serializeToString(d),
    isAssertionEncrypted: true,
    wantMessageSigned: true,
    messageSigningOrder: 'encrypt-then-sign',
    signatureConfig: {
      prefix: 'ds',
      location: {
        reference: '/samlp:Response/saml:Issuer',
        action: 'after'
      }
    }
  })
})

router.post('/assert', async (req: Request, res: Response): Promise<void> => {
  idp = process.env.NODE_ENV === 'development' ? await generateLocalIdp() : idp
  try {
    const response = await sp.parseLoginResponse(idp, 'post', req)
    const token: string | void = await signToken(response)
    if (!token) {
      res.redirect(process.env.FRONTEND_LOGIN)
      return
    }
    res.redirect(responseUrl(token))

  } catch (error) {
    console.log(error)
  }
})

router.get('/metadata', (req, res) => {
  res.header('Content-Type', 'text/xml').send(sp.getMetadata())
})
const LoginController: Router = router

export default LoginController
