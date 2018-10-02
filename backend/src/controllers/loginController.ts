import { Request, Response, Router } from 'express'
import { GetAssertOptions, CreateLoginRequestUrlOptions } from 'saml2-js'
import { sp, idp } from '../utils/saml'
import { responseUrl, Irelay, ISamlResponse } from '../utils/controller_helpers/login'

const router: Router = Router()

router.get('/', (req: Request, res: Response): void => {
  const relay: Irelay = {
    redirect_url: req.query.redirect_url
  }
  const options: CreateLoginRequestUrlOptions = {
    relay_state: JSON.stringify(relay)
  }
  sp.create_login_request_url(
    idp,
    options,
    (err: object, loginUrl: string, requestId: string): void => {
      if (err != null) {
        res.send(500)
        return
      }
      res.redirect(loginUrl)
    }
  )
})

router.post('/assert', (req: Request, res: Response): void => {
  const relay: Irelay = JSON.parse(req.body.RelayState)
  const options: GetAssertOptions = { request_body: req.body }
  sp.post_assert(idp, options, (err: object, samlResponse: ISamlResponse): void => {
    if (err != null) {
      console.log(err, idp, options)
    }
    res.redirect(responseUrl(samlResponse, relay))
  })
})

export const LoginController: Router = router
