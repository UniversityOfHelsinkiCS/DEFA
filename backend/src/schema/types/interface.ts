import { GraphQLObjectType, GraphQLList, GraphQLInputType, GraphQLNonNull } from 'graphql'
import { Document, DocumentQuery } from 'mongoose'
import { Request, Response } from 'express'

export interface IUser {
  name: string,
  role: string,
  attributes: {
    cn: string,
    schacHomeOrganization: string,
    schacPersonalUniqueCode: string
  }
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
) => void

export interface IQuery {
  type: GraphQLObjectType | GraphQLList<GraphQLObjectType>
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
