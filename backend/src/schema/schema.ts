import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql'
import * as types from './types' // All types are imported.
import { IQueries } from './types/interface'

type IqueryReducer = (field: string) => (
  acc: IQueries,
  type: { [field: string]: IQueries }
) => IQueries

const queryReducer: IqueryReducer = (field: string) => (
  acc: IQueries,
  type: { [field: string]: IQueries }
) => ({ ...acc, ...type[field] })

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
  name: 'RootQuery',
  // Types have their queries automatically included
  fields: Object.values(types).reduce(
    queryReducer('queries'),
    {}
  )
})

const Mutation: GraphQLObjectType = new GraphQLObjectType({
  name: 'Mutation',
  // Types have their mutations automatically included
  fields: Object.values(types).reduce(
    queryReducer('mutations'),
    {}
  )
})

const schema: GraphQLSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

export default schema
