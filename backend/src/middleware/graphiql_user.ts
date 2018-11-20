import { Response, NextFunction } from 'express'
import { IRequestWithUser } from './token_authorization'

// Identifies requests made through graphiql as opposed to from the frontend.
// Can be easily spoofed. Do not use this in production.
const graphiqlUser = (req: IRequestWithUser, res: Response, next: NextFunction): void => {
  if (!req.headers.host || !req.headers.origin) {
    next()
    return
  }
  if (req.headers.origin.includes(req.headers.host)) {
    req.user = {
      id: '111111111111111111111111',
      name: 'name',
      role: 'ADMIN',
      attributes: {
        cn: 'name',
        schacHomeOrganization: 'yliopisto.fi',
        schacPersonalUniqueCode: 'A:0',
        displayName: 'ADMIN',
        mail: 'a@b',
        eduPersonPrincipalName: 'edName'
      }
    }
  }
  next()
}

export default graphiqlUser
