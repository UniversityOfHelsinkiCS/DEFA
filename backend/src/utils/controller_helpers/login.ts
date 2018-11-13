import { UserModel } from '../../schema/models'
import { IUserModel } from '../../schema/models/User'
import jwt, { SignOptions } from 'jsonwebtoken'
import dotenv from 'dotenv'
import axios, { AxiosResponse } from 'axios'
import { Document } from 'mongoose'
import { IUser } from '../../schema/types/interface'

dotenv.config()

const JWT_OPTIONS: SignOptions = {
  expiresIn: '24h'
}

export interface ISamlResponse {
  type?: string,
  user?: IUser,
  extract: {
    attributes: Iattributes
  }
}

export interface Iattributes {
  [key: string]: string
}

export const getMetadata = async (entityId: string): Promise<string> => {
  const response = await axios.get(entityId)
  return response.data
}

const parseUser = (a: { [index: string]: string }): IUser => {
  const attributes: { [index: string]: string } = {}
  const user: IUser = { attributes } as IUser
  Object.keys(samlResponseAttributes).forEach(attribute => (
    user.attributes[attribute] = a[samlResponseAttributes[attribute]]
  ))
  return user
}

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
export const signToken = async (response: ISamlResponse): Promise<string | void> => {
  if (response.type !== 'authn_response') {
    console.warn(`Expected saml response to be of type 'authn_response', but was '${response.type}'`)
  }
  if (!response.user) {
    console.warn('Could not find required field \'user\' in saml response.')
  }
  const { attributes } = response.extract
  const user = parseUser(attributes)
  const databaseUser: IUserModel = await findOrCreateUser(user) as IUserModel
  user.id = databaseUser.id
  user.name = databaseUser.name
  user.role = databaseUser.role
  return jwt.sign(user, process.env.SECRET, JWT_OPTIONS)
}
export const responseUrl = (token: string): string => applyParam(process.env.FRONTEND_LOGIN, 'token', token)

export const samlResponseAttributes: { [index: string]: string } = {
  cn: 'urn:oid:2.5.4.3',
  displayName: 'urn:oid:2.16.840.1.113730.3.1.241',
  eduPersonPrincipalName: 'urn:oid:1.3.6.1.4.1.5923.1.1.1.6',
  mail: 'urn:oid:0.9.2342.19200300.100.1.3',
  schacHomeOrganization: 'urn:oid:1.3.6.1.4.1.25178.1.2.9',
  schacPersonalUniqueCode: 'urn:oid:1.3.6.1.4.1.25178.1.2.14'
}
