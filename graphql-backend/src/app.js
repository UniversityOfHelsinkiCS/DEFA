const { ApolloServer } = require('apollo-server')
const schema = require('./schema')
const resolvers = require('./resolvers')

const app = new ApolloServer({
  typeDefs: schema,
  resolvers
})

module.exports = app
