import { Request, Response, Router } from 'express'
import { sp, idp } from '../utils/saml'
const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
  // tslint:disable-next-line:variable-name
  sp.create_login_request_url(idp, {}, (err: object, login_url: string, request_id: string) => {
    if (err != null) {
      return res.send(500)
    }
    res.redirect(login_url)
  })
})

router.post('/assert', (req, res) => {
  console.log(req.body)
  const options = { request_body: req.body }
  // tslint:disable-next-line:variable-name
  sp.post_assert(idp, options, (err: object, saml_response: object) => {
    if (err != null) {
      console.log(err)
    }
    return res.sendStatus(500)

    console.log(saml_response)
    res.send('Hello #{saml_response.user.name_id}!')
  })
})

export const DefaultController: Router = router
