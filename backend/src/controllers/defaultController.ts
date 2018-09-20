import { Request, Response, Router } from 'express'
import { sp, idp } from '../utils/saml'
const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
  sp.create_login_request_url(idp, {}, (err: object, login_url: string, request_id: string) => {
    if (err != null)
      return res.send(500);
    res.redirect(login_url);
  })
})

router.post("/assert", function (req, res) {
  console.log(req.body)
  var options = { request_body: req.body };
  sp.post_assert(idp, options, function (err, saml_response) {
    if (err != null)
    console.log(err)
      return res.sendStatus(500)

    console.log(saml_response)
    res.send("Hello #{saml_response.user.name_id}!");
  });
});



export const DefaultController: Router = router
