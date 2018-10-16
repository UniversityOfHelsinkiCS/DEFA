import { GraphQLObjectType, GraphQLList, GraphQLInputType, GraphQLNonNull } from 'graphql'
import { Document, DocumentQuery } from 'mongoose'

type Iresolve = (
  parent: null,
  // tslint:disable-next-line:no-any
  args: { [key: string]: any | any[] }
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

export interface IEditableStudentDocument extends Document {
  name?: string
  university?: string
  studentNumber?: string
}
