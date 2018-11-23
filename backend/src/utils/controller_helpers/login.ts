import { UserModel } from '../../schema/models'
import jwt, { SignOptions } from 'jsonwebtoken'
import dotenv from 'dotenv'
import axios, { AxiosResponse } from 'axios'
import { Document } from 'mongoose'
import { IUser, IUserAttributes, IUserModel, ISamlResponse, IProtoUser } from '../typescript'

dotenv.config()

const JWT_OPTIONS: SignOptions = {
  expiresIn: '24h'
}

export const getMetadata = async (entityId: string): Promise<string> => {
  const response: AxiosResponse = await axios.get(entityId)
  return response.data
}

const parseUser = (a: { [index: string]: string }): IProtoUser => {
  const attributes: IUserAttributes = Object.keys(samlResponseAttributes).reduce(
    (acc: IUserAttributes, curr: string) => ({
      ...acc,
      [curr]: a[samlResponseAttributes[curr]]
    }),
    {} as IUserAttributes
  )
  return { attributes }
}

const applyParam = (url: string, key: string, value: string): string => {
  const paramChar: string = url.includes('?') ? '&' : '?'
  return `${url}${paramChar}${key}=${value}`
}

const parseStudentNumber = (user: IProtoUser | IUser): string => (
  user.attributes.schacPersonalUniqueCode.split(':').pop()
)
const findOrCreateUser = async (user: IProtoUser | IUser): Promise<Document> => {
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
  const { attributes } = response.extract
  const protoUser: IProtoUser = parseUser(attributes)
  const databaseUser: IUserModel = await findOrCreateUser(protoUser) as IUserModel
  const user: IUser = {
    ...protoUser,
    id: databaseUser.id,
    name: databaseUser.name,
    role: databaseUser.role
  }
  return jwt.sign(user, process.env.SECRET, JWT_OPTIONS)
}
export const responseUrl = (token: string): string => applyParam(process.env.FRONTEND_LOGIN, 'token', token)

const samlResponseAttributes: { [index: string]: string } = {
  cn: 'urn:oid:2.5.4.3',
  displayName: 'urn:oid:2.16.840.1.113730.3.1.241',
  eduPersonPrincipalName: 'urn:oid:1.3.6.1.4.1.5923.1.1.1.6',
  mail: 'urn:oid:0.9.2342.19200300.100.1.3',
  schacHomeOrganization: 'urn:oid:1.3.6.1.4.1.25178.1.2.9',
  schacPersonalUniqueCode: 'urn:oid:1.3.6.1.4.1.25178.1.2.14'
}
