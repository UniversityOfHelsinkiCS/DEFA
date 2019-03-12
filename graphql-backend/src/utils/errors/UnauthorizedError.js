const ActionableError = require('./ActionableError')

const MESSAGE = 'Pääsy estetty.'
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
