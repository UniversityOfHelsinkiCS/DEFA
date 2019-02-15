const authenticate = require('./authenticate')
const user = require('./user')
const submission = require('./submission')

const resolvers = [
  authenticate,
  user,
  submission
].reduce(
  (acc, typeResolver) => ({
    ...acc,
    ...typeResolver,
    Query: {
      ...acc.Query,
      ...typeResolver.Query
    },
    Mutation: {
      ...acc.Mutation,
      ...typeResolver.Mutation
    }
  }),
  {
    Query: {},
    Mutation: {}
  }
)

module.exports = resolvers
