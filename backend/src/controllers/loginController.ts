import { Request, Response, Router } from 'express'
import { GetAssertOptions, CreateLoginRequestUrlOptions } from 'saml2-js'
import { sp, idp } from '../utils/saml'
import { responseUrl, signToken, errorUrl, Irelay, ISamlResponse } from '../utils/controller_helpers/login'

const router: Router = Router()

router.get('/', (req: Request, res: Response): void => {
  const relay: Irelay = {
    login_url: req.query.login_url,
    redirect_url: req.headers.referer as string
  }
  const options: CreateLoginRequestUrlOptions = {
    relay_state: JSON.stringify(relay)
  }
  sp.create_login_request_url(
    idp,
    options,
    (err: object, loginUrl: string, requestId: string): void => {
      console.log(err)
      if (err !== null) {
        res.status(500).send('The login service is currently unavailable.')
        return
      }
      res.redirect(loginUrl)
    }
  )
})

router.post('/assert', (req: Request, res: Response): void => {
  const relay: Irelay = JSON.parse(req.body.RelayState)
  const options: GetAssertOptions = { request_body: req.body }
  sp.post_assert(idp, options, async (err: { message: string }, samlResponse: ISamlResponse): Promise<void> => {
    if (err !== null) {
      res.redirect(errorUrl(relay))
      return
    }
    const token: string | void = await signToken(samlResponse)
    if (!token) {
      res.redirect(errorUrl(relay))
      return
    }
    res.redirect(responseUrl(token, relay))
  })
})

export const LoginController: Router = router
