module.exports = matcher => ({
  $$typeof: Symbol.for('jest.asymmetricMatcher'),
  asymmetricMatch: matcher
})
