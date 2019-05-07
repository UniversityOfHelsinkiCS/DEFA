const authenticate = require('./authenticate')
const user = require('./user')
const submission = require('./submission')
const date = require('./date')
const koskiURL = require('./koskiURL')
const DEFACourse = require('./DEFACourse')

const resolvers = [
  authenticate,
  user,
  submission,
  date,
  koskiURL,
  DEFACourse
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
