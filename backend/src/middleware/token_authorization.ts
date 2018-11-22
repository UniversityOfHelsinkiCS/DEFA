import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { IUser, IRequestWithUser, IErrorResponse } from '../utils/typescript'

dotenv.config()

export const EXPIRED_TOKEN_MESSAGE: string = 'Your session has expired. Please log in again to start a new session.'
export const INVALID_TOKEN_MESSAGE: string = 'Your session is invalid. Please log in again to start a valid session.'

const parseToken = (token: string): [IUser?, Error?] => {
  if (!token) { return [null, null] }
  try {
    return [jwt.verify(token, process.env.SECRET) as IUser, null]
  } catch (e) {
    return [null, e]
  }
}

const handleError = (res: Response, error: Error): void => {
  const response: IErrorResponse = error.name === 'TokenExpiredError' ? {
    message: EXPIRED_TOKEN_MESSAGE,
    code: 'TokenError'
  } : {
    message: INVALID_TOKEN_MESSAGE,
    code: 'TokenError'
  }
  res.status(403).json(response)
}

// Sets req.user as null if no token is provided.
// Sets req.user as the user object if valid token is provided.
// Responds 403 and stops otherwise.
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
