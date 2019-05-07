const Levenshtein = require('levenshtein')
const UnauthorizedError = require('./errors/UnauthorizedError')

const roleValues = {
  STUDENT: 1,
  PRIVILEGED: 2, // teachers
  ADMIN: 3
}

const isLoggedIn = (context) => (
  context.authorization
  && roleValues[context.authorization.role] >= roleValues.STUDENT
)

const isPrivileged = (context) => (
  context.authorization
  && roleValues[context.authorization.role] >= roleValues.PRIVILEGED
)

const isAdmin = (context) => (
  context.authorization
  && roleValues[context.authorization.role] >= roleValues.ADMIN
)

const checkLoggedIn = (context) => {
  if (!isLoggedIn(context)) {
    throw new UnauthorizedError('Access denied: you must be logged in.')
  }
}

const checkPrivileged = (context) => {
  if (!isPrivileged(context)) {
    throw new UnauthorizedError('Access denied: you must be a privileged user.')
  }
}

const checkAdmin = (context) => {
  if (!isAdmin(context)) {
    throw new UnauthorizedError('Access denied: you must be an administrator.')
  }
}

const parseKoskiModel = json => {
  switch (json.type) {
    case 'object':
      return json.value.properties.reduce(
        (acc, property) => ({
          ...acc,
          [property.key]: parseKoskiModel(property.model)
        }),
        {}
      )
    case 'array':
      return json.value.map(element => parseKoskiModel(element))
    case 'enum':
      if (!json.value.title) {
        throw new Error('Enum without title')
      }
      return json.value.totle
    case 'date':
      return json.value.data
    case 'string':
      return json.value.data
    case 'number':
      return json.value.data
    case 'boolean':
      return json.value.data
    default:
      if (!json.optional) {
        throw new Error(`Unknown model type: ${json.type}`)
      }
      return null
  }
}

const levenshteinMatch = (string, matcher) => ['en', 'fi', 'sv'].reduce(
  (acc, key) => (
    Math.min(
      (new Levenshtein(string, matcher[key])).distance,
      acc === null ? Number.MAX_SAFE_INTEGER : acc
    )
  ),
  null
)

const parseKoskiName = name => {
  if (name.fi) return name.fi
  if (name.en) return name.en
  if (name.sv) return name.sv
  return name
}

module.exports = {
  roleValues,
  checkLoggedIn,
  checkPrivileged,
  checkAdmin,
  parseKoskiModel,
  parseKoskiName,
  levenshteinMatch
}
