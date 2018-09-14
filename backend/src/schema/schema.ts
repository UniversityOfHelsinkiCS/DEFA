import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import * as models from './models' // All models are imported.

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  // Models have their queries automatically included
  fields: Object.values(models).reduce(
    (acc: object, model: { queries: { queries: object } }) => ({ ...acc, ...model.queries }),
    {}
  )
})

const schema = new GraphQLSchema({
  query: RootQuery
})

export default schema
