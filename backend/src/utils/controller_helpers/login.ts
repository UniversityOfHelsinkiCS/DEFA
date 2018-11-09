import { UserModel, IUserModel } from '../../schema/models'
import jwt, { SignOptions } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Document } from 'mongoose'
import { IUser } from '../../schema/types/interface'

dotenv.config()

const JWT_OPTIONS: SignOptions = {
  expiresIn: '24h'
}

export interface ISamlResponse {
  type: string,
  user: IUser
}
export interface Irelay {
  login_url?: string,
  redirect_url?: string
}
// Possible redirects must be limited so as not to allow reflected XSS attacks.
const allowedRedirects: RegExp[] = process.env.ALLOWED_REDIRECTS.split(',').map(
  (str: string): RegExp => str[0] === '^' ? RegExp(str) : RegExp(`^${str}`)
)
export const defaultRedirect: string = '/todo-404-page'
const validateRedirect = (url: string | void): boolean => url ? allowedRedirects.reduce(
  (acc: boolean, regex: RegExp) => acc || Boolean(url.match(regex)),
  false
) : false

const applyParam = (url: string, key: string, value: string): string => {
  const paramChar: string = url.includes('?') ? '&' : '?'
  return `${url}${paramChar}${key}=${value}`
}

const parseStudentNumber = (user: IUser): string => user.attributes.schacPersonalUniqueCode[0].split(':').pop()
const findOrCreateUser = async (user: IUser): Promise<Document> => {
  const databaseUser: IUserModel = await UserModel.findOne({
    identifiers: {
      $elemMatch: {
        university: user.attributes.schacHomeOrganization,
        student_number: parseStudentNumber(user)
      }
    }
  }) as IUserModel
  if (databaseUser) { return databaseUser }
  return await UserModel.create({
    name: user.attributes.cn,
    role: 'STUDENT',
    identifiers: [
      {
        university: user.attributes.schacHomeOrganization,
        student_number: parseStudentNumber(user)
      }
    ]
  })
}
export const signToken = async (samlResponse: ISamlResponse): Promise<string | void> => {
  if (samlResponse.type !== 'authn_response') {
    console.warn(`Expected saml response to be of type 'authn_response', but was '${samlResponse.type}'`)
    return null
  }
  if (!samlResponse.user) {
    console.warn('Could not find required field \'user\' in saml response.')
    return null
  }
  const user = samlResponse.user
  const databaseUser: IUserModel = await findOrCreateUser(user) as IUserModel
  user.name = databaseUser.name
  user.role = databaseUser.role
  return jwt.sign(user, process.env.SECRET, JWT_OPTIONS)
}
export const responseUrl = (token: string, relay: Irelay): string => {
  const redirectUrl: string = validateRedirect(relay.login_url) ? (
    relay.login_url
  ) : (
    defaultRedirect
  )
  return applyParam(
    applyParam(redirectUrl, 'token', token),
    'redirect',
    relay.redirect_url
  )
}

export const errorUrl = (relay: Irelay): string => validateRedirect(relay.login_url) ? (
  relay.login_url
) : (
  defaultRedirect
)
