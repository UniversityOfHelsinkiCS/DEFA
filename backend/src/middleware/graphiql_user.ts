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
      id: '',
      name: 'name',
      role: 'ADMIN',
      attributes: {
        cn: 'name',
        schacHomeOrganization: 'yliopisto.fi',
        schacPersonalUniqueCode: 'A:0'
      }
    }
  }
  next()
}

export default graphiqlUser