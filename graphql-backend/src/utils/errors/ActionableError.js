class ActionableError extends Error {
  /**
   * @param {string} message
   * @param {{ toastable: boolean, code: string }} extensions
   */
  constructor(message, extensions) {
    super(message)
    this.extensions = extensions
  }
}

module.exports = ActionableError
