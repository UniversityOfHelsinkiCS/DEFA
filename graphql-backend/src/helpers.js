const roleValues = {
  'STUDENT': 1,
  'PRIVILEGED': 2, // teachers
  'ADMIN': 3
}

const isPrivileged = (context) =>
  context.authorization &&
  roleValues[context.authorization.role] >= roleValues['PRIVILEGED']

const isAdmin = (context) =>
  context.authorization &&
  roleValues[context.authorization.role] >= roleValues['ADMIN']


module.exports = {
  roleValues,
  isPrivileged,
  isAdmin
}