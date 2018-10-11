import { Request, Response, Router } from 'express'
import { GetAssertOptions, CreateLoginRequestUrlOptions } from 'saml2-js'
// import { sp, idp } from '../utils/saml'
import { responseUrl, errorUrl, Irelay, ISamlResponse, getMetadata } from '../utils/controller_helpers/login'

// tslint:disable-next-line:no-var-requires
const samlify = require('samlify')
import fs from 'fs'

const router: Router = Router()

const sp = samlify.ServiceProvider({
  metadata: fs.readFileSync('./src/utils/metadata.xml')
})
let idp = null

router.get('/', async (req: Request, res: Response): Promise<void> => {
  // const relay: Irelay = {
  //   redirect_url: req.query.redirect_url
  // }
  // const options: CreateLoginRequestUrlOptions = {
  //   relay_state: JSON.stringify(relay)
  // }
  const metadata = await getMetadata(req.query.entityID)
  idp = samlify.IdentityProvider({
    metadata
  })
  sp.entitySetting.relayState = process.env.RELAY_STATE
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

router.get('/metadata', (req: Request, res: Response): void => {
  // res.type('application/xml')
  // res.send(sp.create_metadata())
})

router.post('/assert', (req: Request, res: Response): void => {
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
