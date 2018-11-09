import graphQLHTTP, { Middleware, Options } from 'express-graphql'
import schema from '../schema/schema'

export const options: Options = {
  graphiql: process.env.NODE_ENV === 'development',
  schema
}

const GraphQLController: Middleware = graphQLHTTP(options)

export default GraphQLController
