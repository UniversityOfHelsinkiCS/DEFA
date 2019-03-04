const jwt = require('jsonwebtoken')
const { SECRET } = require('../config')
const ActionableError = require('../utils/errors/ActionableError')

const TOKEN_ERROR_EXTENSIONS = {
  toastable: true,
  code: 'TokenError'
}

const authenticate = async (parent, args, context) => {
  let decoded
  try {
    decoded = jwt.verify(args.token, SECRET)
  } catch (e) {
    throw new ActionableError('Failed to authenticate: expired token.', TOKEN_ERROR_EXTENSIONS)
  }
  if (decoded && decoded.id && decoded.role) {
    // Mutating context is the whole point of this query.
    // eslint-disable-next-line no-param-reassign
    context.authorization = decoded
    return true
  }
  throw new ActionableError('Failed to authenticate: invalid token.', TOKEN_ERROR_EXTENSIONS)
}

module.exports = {
  Query: {
    authenticate
  },
  Mutation: {
    authenticate
  }
}
