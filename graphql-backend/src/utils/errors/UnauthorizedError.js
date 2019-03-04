const ActionableError = require('./ActionableError')

const MESSAGE = 'Access denied.'
const EXTENSIONS = {
  toastable: true,
  code: 'UnauthorizedError'
}

class UnauthorizedError extends ActionableError {
  constructor(message, extensions) {
    super(
      message || MESSAGE,
      extensions || {
        ...EXTENSIONS,
        ...extensions
      }
    )
  }
}

module.exports = UnauthorizedError
