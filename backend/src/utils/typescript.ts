import { Request, Response, RequestHandler } from 'express'

export interface IUserAttributes {
  cn: string,
  schacHomeOrganization: string,
  schacPersonalUniqueCode: string,
  displayName: string,
  eduPersonPrincipalName: string,
  mail: string
}

export interface IUser {
  id: string,
  name: string,
  role: string,
  attributes: IUserAttributes
}

export interface IContext {
  user: IUser,
  req: Request,
  res: Response
}

export interface IRequestWithUser extends Request {
  user?: IUser
}

export interface IErrorResponse {
  message: string,
  code: string
}

export interface IRouteMap {
  [key: string]: RequestHandler
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

export interface IProtoUser {
  name: string
  cn: string
  username: string
  email: string
  studentNumber: string
  role?: string
}

export interface IspOptions {
  entity_id: string
  private_key: string
  certificate: string
  assert_endpoint: string
  force_authn: boolean
  auth_context: {
    comparison: string
    class_refs: string[]
  }
  nameid_format: string
  sign_get_request: boolean
  allow_unencrypted_assertion: boolean
  [key: string]: string | {
    comparison: string
    class_refs: string[]
  } | boolean
}

export interface IMockResponse extends Response {
  statuses: number[],
  jsons: object[]
}
