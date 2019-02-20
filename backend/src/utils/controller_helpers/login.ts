import dotenv from 'dotenv'
import axios, { AxiosResponse } from 'axios'
import { ISamlResponse, IProtoUser } from '../typescript'

dotenv.config()

const BACKEND_LOGIN_QUERY = `
mutation loginService(
  $token: String!
  $name: String!
  $studentNumber: String
  $role: String
  $username: String!
  $cn: String!
  $email: String!
) {
  authenticate(
    token: $token
  ) {
    login(
      name: $name,
      studentNumber: $studentNumber,
      role: $role,
      username: $username,
      cn: $cn,
      email: $email
    )
  }
}
`

export const getMetadata = async (): Promise<string> => {
  try {
  const response: AxiosResponse = await axios.get('https://haka.funet.fi/metadata/haka-metadata.xml')
  return response.data
  } catch (e) {
    console.log('metadata fetch errors,', e)
  }
}

export const getLocalMetadata = async (url: string): Promise<string> => {
  try {
  const response: AxiosResponse = await axios.get(url)
  return response.data
  } catch (e) {
    console.log('metadata fetch errors,', e)
  }
}

const parseUser = (a: { [index: string]: string }): IProtoUser => (
  Object.keys(samlResponseAttributes).reduce(
    (acc: IProtoUser, curr: string) => ({
      ...acc,
      [curr]: a[samlResponseAttributes[curr]]
    }),
    {} as IProtoUser
  )
)

const applyParam = (url: string, key: string, value: string): string => {
  const paramChar: string = url.includes('?') ? '&' : '?'
  return `${url}${paramChar}${key}=${value}`
}

const parseStudentNumber = (user: IProtoUser): string => (
  user.studentNumber.split(':').pop()
)
const backendLogin = async (user: IProtoUser): Promise<string> => {
  let response: AxiosResponse
  try {
    response = await axios.post(
      process.env.BACKEND_URL,
      {
        operationName: 'loginService',
        query: BACKEND_LOGIN_QUERY,
        variables: {
          ...user,
          token: process.env.BACKEND_TOKEN
        }
      },
      {}
    )
  } catch (e) {
    return null
  }
  return response.data.data.authenticate.login
}
export const signToken = async (response: ISamlResponse): Promise<string | void> => {
  const { attributes } = response.extract
  const user: IProtoUser = {
    ...parseUser(attributes),
    role: 'STUDENT'
  }
  user.studentNumber = parseStudentNumber(user)
  const token: string = await backendLogin(user)
  return token
}
export const responseUrl = (token: string): string => applyParam(process.env.FRONTEND_LOGIN, 'token', token)

const samlResponseAttributes: { [index: string]: string } = {
  cn: 'urn:oid:2.5.4.3', // cn
  name: 'urn:oid:2.16.840.1.113730.3.1.241', // displayName
  username: 'urn:oid:1.3.6.1.4.1.5923.1.1.1.6', // eduPersonPrincipalName
  email: 'urn:oid:0.9.2342.19200300.100.1.3', // mail
  // schacHomeOrganization: 'urn:oid:1.3.6.1.4.1.25178.1.2.9',
  studentNumber: 'urn:oid:1.3.6.1.4.1.25178.1.2.14' // schacPersonalUniqueCode
}
