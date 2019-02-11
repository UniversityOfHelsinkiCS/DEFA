const { ApolloServer } = require('apollo-server')
const schema = require('./schema/schema')
const resolvers = require('./resolvers')

const app = new ApolloServer({
  typeDefs: schema,
  resolvers,
  graphiql: true
})

module.exports = app
