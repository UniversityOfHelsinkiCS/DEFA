import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql'
import * as types from './types' // All types are imported.
import { IQueries } from './types/interface'

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  // Types have their queries automatically included
  fields: Object.values(types).reduce(
    (acc: IQueries, type: { queries: IQueries }) => ({ ...acc, ...type.queries }),
    {}
  )
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  // Types have their mutations automatically included
  fields: Object.values(types).reduce(
    (acc: IQueries, type: { mutations: IQueries }) => ({ ...acc, ...type.mutations }),
    {}
  )
})

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

export default schema
