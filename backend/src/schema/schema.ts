import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import * as types from './types' // All types are imported.

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  // Types have their queries automatically included
  fields: Object.values(types).reduce(
    (acc: object, model: { queries: { queries: object } }) => ({ ...acc, ...model.queries }),
    {}
  )
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  // Types have their mutations automatically included
  fields: Object.values(types).reduce(
    (acc: object, model: { mutations: object }) => ({ ...acc, ...model.mutations }),
    {}
  )
})

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

export default schema
