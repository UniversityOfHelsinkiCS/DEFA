const { GraphQLScalarType } = require('graphql')
const ValidationError = require('../utils/errors/ValidationError')

const NAME = 'KoskiURL'
const DESCRIPTION = 'String representation of a URL link to the Koski service publication.'
const KOSKI_URL_REGEXP = new RegExp('^(http://|https://|)(www\\.|)opintopolku\\.fi/koski/opinnot/[0-9a-f]+$')

const serialize = value => value

const parseValue = value => {
  if (!KOSKI_URL_REGEXP.test(value)) {
    throw new ValidationError('Annettu URL osoite ei vastaa Koski-palvelun URL osoitteille määrättyä muotoa.')
  }
  return value
}

const parseLiteral = ast => parseValue(ast.value)

module.exports = {
  Query: {},
  Mutation: {},
  KoskiURL: new GraphQLScalarType({
    name: NAME,
    description: DESCRIPTION,
    serialize,
    parseValue,
    parseLiteral
  })
}
