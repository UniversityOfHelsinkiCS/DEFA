import { Request, Response, Router } from 'express'
// import { sp, idp } from '../utils/saml'
import {
  responseUrl,
  errorUrl,
  Irelay,
  ISamlResponse,
  getMetadata,
  samlResponseAttributes
} from '../utils/controller_helpers/login'
// tslint:disable-next-line:no-var-requires
const samlify = require('samlify')
import fs from 'fs'

const router: Router = Router()

const sp = samlify.ServiceProvider({
  metadata: fs.readFileSync('./src/utils/metadata.xml'),
  encPrivateKey: fs.readFileSync('./src/utils/key.pem'),
  privateKey: fs.readFileSync('./src/utils/key.pem'),
  loginNameIDFormat: 'transient'
})
// tslint:disable-next-line:no-any
let idp: any = null

router.get('/', async (req: Request, res: Response): Promise<void> => {
  // const relay: Irelay = {
  //   redirect_url: req.query.redirect_url
  // }
  // const options: CreateLoginRequestUrlOptions = {
  //   relay_state: JSON.stringify(relay)
  // }
  const metadata = await getMetadata(req.query.entityID)
  idp = samlify.IdentityProvider({
    metadata: fs.readFileSync(metadata),
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
  sp.entitySetting.relayState = { redirect_url: process.env.RELAY_STATE }
  const { id, context } = sp.createLoginRequest(idp, 'redirect')
  return res.redirect(context)

  //   sp.create_login_request_url(
  //     idp,
  //     options,
  //     (err: object, loginUrl: string, requestId: string): void => {
  //       if (err !== null) {
  //         res.status(500).send('The login service is currently unavailable.')
  //         return
  //       }
  //       console.log(loginUrl, 'loginurl')
  //       res.redirect(loginUrl)
  //     }
  //   )
})

// router.get('/metadata', (req: Request, res: Response): void => {
// res.type('application/xml')
// res.send(sp.create_metadata())
// })

router.post('/assert', async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await sp.parseLoginResponse(idp, 'post', req)
    const { relayState } = sp.entitySetting
    const { attributes } = response.extract
    res.redirect(responseUrl(attributes, relayState))

  } catch (error) {
    console.log(error)
    //res.redirect(errorUrl(error, sp.relayState))
  }
  // const relay: Irelay = JSON.parse(req.body.RelayState)
  // const options: GetAssertOptions = { request_body: req.body }
  // sp.post_assert(idp, options, (err: { message: string }, samlResponse: ISamlResponse): void => {
  //   if (err !== null) {
  //     res.redirect(errorUrl(err, relay))
  //     return
  //   }
  //   res.redirect(responseUrl(samlResponse, relay))
  // })
})

export const LoginController: Router = router
