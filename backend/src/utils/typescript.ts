import { GraphQLObjectType, GraphQLList, GraphQLInputType, GraphQLNonNull, GraphQLType } from 'graphql'
import { Document, DocumentQuery } from 'mongoose'
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

export type Iresolve = (
  // tslint:disable-next-line:no-any
  parent: any,
  // tslint:disable-next-line:no-any
  args: { [key: string]: any | any[] },
  context?: IContext
) => DocumentQuery<Document[] | Document, Document> | Promise<Document | Document[]>

export type IvalidatorFunction = (
  parent: null,
  // tslint:disable-next-line:no-any
  args: { [key: string]: any | any[] },
  context?: IContext
) => void | Promise<void>

export interface IQuery {
  type: GraphQLObjectType | GraphQLList<GraphQLObjectType> | GraphQLList<GraphQLType>
  args: { [key: string]: { type: GraphQLInputType | GraphQLNonNull<GraphQLInputType> } }
  resolve: Iresolve
  access?: IvalidatorFunction
}

export interface IQueries {
  [key: string]: IQuery
}

export interface IEditableDummyDocument extends Document {
  name?: string
}

export interface ICredit {
  student_number: string,
  course_name: string,
  course_code: string,
  date: string,
  study_credits: number,
  grade: number,
  language: string
}

export interface ICreditWithUni extends ICredit {
  university: string,
  teacher: string
}

export interface IEditCredit {
  id: string
}

export interface ICreditModel extends Document {
  student_number: string,
  course_name?: string,
  course_code: string,
  date?: string,
  study_credits: number,
  grade: number,
  language?: string,
  university: string,
  teacher: string
}

export interface Iidentifier {
  id: string,
  student_number: string,
  university: string
}

export interface IUserModel extends Document {
  name: string,
  role: string,
  identifiers: Iidentifier[]
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
  attributes: IUserAttributes
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
