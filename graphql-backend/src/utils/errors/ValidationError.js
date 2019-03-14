const ActionableError = require('./ActionableError')

const MESSAGE = 'Syötteet ovat epäkelpoja.'
const EXTENSIONS = {
  toastable: true,
  code: 'ValidationError'
}

class ValidationError extends ActionableError {
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

module.exports = ValidationError
