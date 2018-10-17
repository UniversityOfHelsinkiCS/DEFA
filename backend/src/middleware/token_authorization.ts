import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

// This interface is yet to be decided.
// It should mirror whatever user object is encoded into tokens.
interface IUser {
  id: string
}

export interface IRequestWithUser extends Request {
  user?: IUser
}

const parseToken = (token: string): IUser => {
  if (!token) { return null }
  try {
    return jwt.verify(token, process.env.SECRET) as IUser
  } catch (e) {
    return null
  }
}

const applyToken = (req: IRequestWithUser, res: Response, next: NextFunction): void => {
  const token: string = req.headers.authorization
  req.user = parseToken(token)
  next()
}

export default applyToken
