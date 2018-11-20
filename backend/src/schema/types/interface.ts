import { GraphQLObjectType, GraphQLList, GraphQLInputType, GraphQLNonNull, GraphQLType } from 'graphql'
import { Document, DocumentQuery } from 'mongoose'
import { Request, Response } from 'express'

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
  parent: null,
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
