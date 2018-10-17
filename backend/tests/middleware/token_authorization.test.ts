import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { IRequestWithUser } from '../../src/middleware/token_authorization'
import tokenAuth from '../../src/middleware/token_authorization'

dotenv.config()

describe('token authorization middleware', () => {
  let req: IRequestWithUser
  const next = jest.fn()
  const user = { legit_user_object: true }
  const token = jwt.sign(user, process.env.SECRET)
  beforeEach(() => {
    req = {
      headers: {
        authorization: token
      }
    } as IRequestWithUser
    next.mockClear()
  })

  it('applies encoded user in user field on request.', () => {
    expect(req.user).toBeFalsy()
    tokenAuth(req, null, next)
    expect(req.user).toMatchObject(user)
  })
  it('sets user as null when token is missing.', () => {
    req.headers.authorization = undefined
    expect(req.user).toBeFalsy()
    tokenAuth(req, null, next)
    expect(req.user).toEqual(null)
  })
  it('sets user as null when token is invalid.', () => {
    req.headers.authorization = jwt.sign(
      user,
      process.env.SECRET.substring(0, process.env.SECRET.length - 1)
    )
    expect(req.user).toBeFalsy()
    tokenAuth(req, null, next)
    expect(req.user).toEqual(null)
  })
})
