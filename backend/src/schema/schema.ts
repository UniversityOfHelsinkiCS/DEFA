import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import * as models from './models'

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: Object.values(models).reduce(
    (acc: Object, model: { queries: Object }) => ({ ...acc, ...model.queries }),
    {}
  )
})

const schema = new GraphQLSchema({
  query: RootQuery
})

export default schema
