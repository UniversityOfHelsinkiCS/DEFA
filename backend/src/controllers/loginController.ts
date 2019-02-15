import { Request, Response, Router } from 'express'
import { DOMParser, XMLSerializer } from 'xmldom'
import {
  responseUrl,
  getMetadata,
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
  try {
    const metadata = await getMetadata(req.query.entityID)
    const parsedMetaData = new DOMParser().parseFromString(metadata, 'text/xml')
    console.log('parsedMD:', parsedMetaData)
    parsedMetaData.getElementsByTagName('IDPSSODescriptor')[0].setAttribute('WantAuthnRequestsSigned', 'true')
    console.log('parsedMD setattribute OK')

    idp = samlify.IdentityProvider({
      metadata: new XMLSerializer().serializeToString(parsedMetaData),
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
    console.log('idp:', idp)

    const { id, context } = sp.createLoginRequest(idp, 'redirect')
    console.log('sp createloginRQ: ', id, context)
    return res.redirect(context)
  } catch (e) {
    console.log('login failed, error: ', e)
  }
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
