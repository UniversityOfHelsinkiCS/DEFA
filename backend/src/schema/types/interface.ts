import { GraphQLObjectType, GraphQLList, GraphQLInputType, GraphQLNonNull } from 'graphql'
import { Document, DocumentQuery } from 'mongoose'

export interface IUser {
  id: string
}

interface IContext {
  user: IUser
}

type Iresolve = (
  parent: null,
  // tslint:disable-next-line:no-any
  args: { [key: string]: any | any[] },
  context?: IContext
) => DocumentQuery<Document[] | Document, Document> | Promise<Document | Document[]>

export interface IQuery {
  [key: string]: object
  type: GraphQLObjectType | GraphQLList<GraphQLObjectType>
  args: { [key: string]: { type: GraphQLInputType | GraphQLNonNull<GraphQLInputType> } }
  resolve: Iresolve
}

export interface IQueries {
  [key: string]: IQuery
}

export interface IEditableDummyDocument extends Document {
  name?: string
}
