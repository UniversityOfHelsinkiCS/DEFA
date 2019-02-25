const { GraphQLScalarType } = require('graphql')

const NAME = 'Date'
const DESCRIPTION = 'MongoDB and javascript compatible date.'

const serialize = value => {
  if (value instanceof Date) {
    return Number(value)
  }
  return null
}

const parseValue = value => {
  if (value) {
    return new Date(value)
  }
  return null
}

const parseLiteral = ast => parseValue(ast.value)

module.exports = {
  Query: {},
  Mutation: {},
  Date: new GraphQLScalarType({
    name: NAME,
    description: DESCRIPTION,
    serialize,
    parseValue,
    parseLiteral
  })
}