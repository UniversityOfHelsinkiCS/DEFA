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

interface IEntityAttribute { name: string, value: string }
interface IEntity { attributes: [IEntityAttribute] }

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { entityID } = req.query
    const metadata = await getMetadata()
    const parsedMetaData = new DOMParser().parseFromString(metadata, 'text/xml')
    const redirectMetadata = Array.prototype.find.call(parsedMetaData.getElementsByTagName('EntityDescriptor'),
      (entity: IEntity) =>
        Array.prototype.find.call(entity.attributes,
          (attr: IEntityAttribute) => attr.name === 'entityID')
          .value === entityID)
    redirectMetadata.getElementsByTagName('IDPSSODescriptor')[0].setAttribute('WantAuthnRequestsSigned', 'true')
    idp = samlify.IdentityProvider({
      metadata: new XMLSerializer().serializeToString(redirectMetadata),
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

    const { id, context } = sp.createLoginRequest(idp, 'redirect')
    return res.redirect(context)
  } catch (e) {
    console.log('login failed, error: ', e)
  }
})

router.post('/assert', async (req: Request, res: Response): Promise<void> => {
  idp = process.env.NODE_ENV === 'development' ? await generateLocalIdp() : idp
  try {
    const response = await sp.parseLoginResponse(idp, 'post', req)
    console.log('sp parseresponse /assert: ', response)
    const token: string | void = await signToken(response)
    console.log('signed token? : ', token)
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
