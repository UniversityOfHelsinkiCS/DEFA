const jwt = require('jsonwebtoken')
const { SECRET } = require('../config')

const authenticate = async (parent, args, context) => {
  const decoded = jwt.verify(args.token, SECRET)
  if (decoded && decoded.id && decoded.role) {
    context.authorization = decoded
    return true
  }
  return null
}

module.exports = {
  Query: {
    authenticate
  },
  Mutation: {
    authenticate
  }
}
