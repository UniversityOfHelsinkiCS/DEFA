import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const EXPIRED_TOKEN_MESSAGE: string = 'Your session has expired. Please log in again to start a new session.'
export const INVALID_TOKEN_MESSAGE: string = 'Your session is invalid. Please log in again to start a valid session.'

// This interface is yet to be decided.
// It should mirror whatever user object is encoded into tokens.
interface IUser {
  id: string
}

export interface IRequestWithUser extends Request {
  user?: IUser
}

const parseToken = (token: string): [IUser?, Error?] => {
  if (!token || token === 'null') { return [null, null] }
  try {
    return [jwt.verify(token, process.env.SECRET) as IUser, null]
  } catch (e) {
    return [null, e]
  }
}

const handleError = (res: Response, error: Error): void => {
  if (error.name === 'TokenExpiredError') {
    res.status(403).json({
      message: EXPIRED_TOKEN_MESSAGE,
      actions: ['logout']
    })
  } else {
    res.status(403).json({
      message: INVALID_TOKEN_MESSAGE,
      actions: ['logout']
    })
  }
}

const applyToken = (req: IRequestWithUser, res: Response, next: NextFunction): void => {
  const token: string = req.headers.authorization
  const [user, error]: [IUser?, Error?] = parseToken(token)
  if (error) {
    handleError(res, error)
  } else {
    req.user = user
    next()
  }
}

export default applyToken
