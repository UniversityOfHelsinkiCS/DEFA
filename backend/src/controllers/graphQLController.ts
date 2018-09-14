import graphQLHTTP from 'express-graphql'
import schema from '../schema/schema'

export const GraphQLController: graphQLHTTP.Middleware = graphQLHTTP({
  graphiql: true,
  schema
})