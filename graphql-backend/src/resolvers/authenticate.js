const jwt = require('jsonwebtoken')
const { SECRET } = require('../config')

const authenticate = async (parent, args, context) => {
  let decoded
  try {
    decoded = jwt.verify(args.token, SECRET)
  } catch(e) {
    return null
  }
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
