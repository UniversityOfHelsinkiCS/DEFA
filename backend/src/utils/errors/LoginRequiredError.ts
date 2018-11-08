class LoginRequiredError extends Error {
  public message = 'You must be logged in to take this action.'
  public extensions = {
    toastable: true,
    code: 'LoginRequiredError'
  }
}

export default LoginRequiredError
