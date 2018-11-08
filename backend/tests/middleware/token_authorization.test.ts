import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Response } from 'express'
import { IRequestWithUser } from '../../src/middleware/token_authorization'
import tokenAuth, { INVALID_TOKEN_MESSAGE, EXPIRED_TOKEN_MESSAGE } from '../../src/middleware/token_authorization'

dotenv.config()

class MockResponse {
  public statuses: number[] = []
  public jsons: object[] = []

  public status = (statusCode: number): this => {
    this.statuses.push(statusCode)
    return this
  }
  public json = (json: object): this => {
    this.jsons.push(json)
    return this
  }
  public send = (message: string): this => this
}

interface IMockResponse extends Response {
  statuses: number[],
  jsons: object[]
}

describe('token authorization middleware', () => {
  let req: IRequestWithUser
  let res: IMockResponse
  const next = jest.fn()
  const user = { legit_user_object: true }
  const token = jwt.sign(user, process.env.SECRET)
  beforeEach(() => {
    req = {
      headers: {
        authorization: token
      }
    } as IRequestWithUser
    res = new MockResponse() as unknown as IMockResponse
    next.mockClear()
  })

  describe('when token is valid', () => {
    it('applies encoded user in user field on request.', () => {
      expect(req.user).toBeFalsy()
      tokenAuth(req, res, next)
      expect(req.user).toMatchObject(user)
    })
    it('next is called.', () => {
      expect(next).not.toHaveBeenCalled()
      tokenAuth(req, res, next)
      expect(next).toHaveBeenCalled()
    })
  })
  describe('when token is missing', () => {
    beforeEach(() => {
      req.headers.authorization = undefined
    })

    it('sets user as null.', () => {
      expect(req.user).toBeFalsy()
      tokenAuth(req, res, next)
      expect(req.user).toEqual(null)
    })
    it('next is called.', () => {
      expect(next).not.toHaveBeenCalled()
      tokenAuth(req, res, next)
      expect(next).toHaveBeenCalled()
    })
  })
  describe('when token is invalid', () => {
    beforeEach(() => {
      req.headers.authorization = jwt.sign(
        user,
        process.env.SECRET.substring(0, process.env.SECRET.length - 1)
      )
    })

    it('responds with invalid token error message.', () => {
      expect(res.statuses).toEqual([])
      expect(res.jsons).toEqual([])
      tokenAuth(req, res, next)
      expect(res.statuses).toEqual([403])
      expect(res.jsons).toEqual([
        expect.objectContaining({
          message: INVALID_TOKEN_MESSAGE
        })
      ])
    })
    it('next is not called.', () => {
      tokenAuth(req, res, next)
      expect(next).not.toHaveBeenCalled()
    })
  })
  describe('when token is expired', () => {
    beforeEach(done => {
      req.headers.authorization = jwt.sign(
        user,
        process.env.SECRET,
        {
          expiresIn: '1ms'
        }
      )
      setTimeout(done, 2)
    })

    it('responds with expired token error message.', () => {
      expect(res.statuses).toEqual([])
      expect(res.jsons).toEqual([])
      tokenAuth(req, res, next)
      expect(res.statuses).toEqual([403])
      expect(res.jsons).toEqual([
        expect.objectContaining({
          message: EXPIRED_TOKEN_MESSAGE
        })
      ])
    })
    it('next is not called.', () => {
      tokenAuth(req, res, next)
      expect(next).not.toHaveBeenCalled()
    })
  })
})
