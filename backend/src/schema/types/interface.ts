import { GraphQLObjectType, GraphQLList, GraphQLScalarType, GraphQLNonNull } from 'graphql'
import { Document, DocumentQuery } from 'mongoose'

type Iresolve = (
  parent: null,
  args: { [key: string]: string }
) => DocumentQuery<Document[] | Document, Document> | Promise<Document | Document[]>

export interface IQuery {
  [key: string]: object
  type: GraphQLObjectType | GraphQLList<GraphQLObjectType>
  args: { [key: string]: { type: GraphQLScalarType | GraphQLNonNull<GraphQLScalarType> } }
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
