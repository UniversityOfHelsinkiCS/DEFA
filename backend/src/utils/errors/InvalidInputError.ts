class InvalidInputError extends Error {
  public extensions: {
    toastable: true,
    code: 'InvalidInputError'
  }
}

export default InvalidInputError
