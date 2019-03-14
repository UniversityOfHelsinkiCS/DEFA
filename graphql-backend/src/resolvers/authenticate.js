const jwt = require('jsonwebtoken')
const { SECRET } = require('../config')
const UnauthorizedError = require('../utils/errors/UnauthorizedError')

const TOKEN_ERROR_EXTENSIONS = {
  toastable: true,
  code: 'TokenError'
}

const authenticate = async (parent, args, context) => {
  let decoded
  try {
    decoded = jwt.verify(args.token, SECRET)
  } catch (e) {
    throw new UnauthorizedError(
      'Istuntosi on aikakatkaistu.',
      TOKEN_ERROR_EXTENSIONS
    )
  }
  if (decoded && decoded.id && decoded.role) {
    // Mutating context is the whole point of this query.
    // eslint-disable-next-line no-param-reassign
    context.authorization = decoded
    return true
  }
  throw new UnauthorizedError(
    'Tunnistautumisavaimesi oli virheellinen. Kirjaudu sisään uudelleen saadaksesi uuden avaimen.',
    TOKEN_ERROR_EXTENSIONS
  )
}

module.exports = {
  Query: {
    authenticate
  },
  Mutation: {
    authenticate
  }
}
