import { Request, Response, Router } from 'express'
import { GetAssertOptions } from 'saml2-js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { sp, idp } from '../utils/saml'

dotenv.config()

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
  const relay = {
    redirect_url: req.query.redirect_url
  }
  sp.create_login_request_url(
    idp,
    { relay_state: JSON.stringify(relay) },
    // tslint:disable-next-line:variable-name
    (err: object, login_url: string, request_id: string) => {
      if (err != null) {
        return res.send(500)
      }
      res.redirect(login_url)
    }
  )
})

// Possible redirects must be limited so as not to allow reflected XSS attacks.
const allowedRedirects: RegExp[] = [
  /^http:\/\/localhost/
]
const defaultRedirect: string = 'http://localhost:8080/login'
const validateRedirect = (url: string | void): boolean => url ? allowedRedirects.reduce(
  (acc: boolean, regex: RegExp) => acc || Boolean(url.match(regex)),
  false
) : false

interface ISamlResponse {
  type: string,
  user: object
}

router.post('/assert', (req: Request, res: Response): void => {
  const relay: { redirect_url?: string } = JSON.parse(req.body.RelayState)
  const options: GetAssertOptions = { request_body: req.body }
  // tslint:disable-next-line:variable-name
  sp.post_assert(idp, options, (err: object, saml_response: ISamlResponse): void => {
    if (err != null) {
      console.log(err, idp, options)
    }
    if (saml_response.type === 'authn_response') {
      console.log(saml_response.user)
    }
    const redirectUrl: string = validateRedirect(relay.redirect_url) ? (
      relay.redirect_url
    ) : (
      defaultRedirect
    )
    const token: string = jwt.sign(saml_response.user, process.env.SECRET)
    res.redirect(`${redirectUrl}?token=${token}`)
  })
})

export const DefaultController: Router = router
