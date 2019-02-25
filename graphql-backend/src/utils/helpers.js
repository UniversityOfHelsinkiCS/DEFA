const UnauthorizedError = require('./errors/UnauthorizedError')

const roleValues = {
  'STUDENT': 1,
  'PRIVILEGED': 2, // teachers
  'ADMIN': 3
}

const isLoggedIn = (context) =>
context.authorization &&
roleValues[context.authorization.role] >= roleValues['STUDENT']

const isPrivileged = (context) =>
  context.authorization &&
  roleValues[context.authorization.role] >= roleValues['PRIVILEGED']

const isAdmin = (context) =>
  context.authorization &&
  roleValues[context.authorization.role] >= roleValues['ADMIN']

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

module.exports = {
  roleValues,
  checkLoggedIn,
  checkPrivileged,
  checkAdmin
}