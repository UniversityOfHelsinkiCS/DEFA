class PrivilegeRequiredError extends Error {
  public message = 'You are not allowed to perform this action. Ask an administrator to grant you the privilege.'
  public extensions = {
    toastable: true,
    code: 'PrivilegeRequiredError'
  }
}

export default PrivilegeRequiredError
