import { GraphQLObjectType, GraphQLString } from 'graphql'

const dummies: Array<{ id: string, name: string }> = [
  { id: '1', name: 'AAA' },
  { id: '2', name: 'BBB' },
  { id: '3', name: 'CCC' }
]

const type = new GraphQLObjectType({
  name: 'Dummy',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  })
})

const getOne = {
  type,
  args: { id: { type: GraphQLString } },
  resolve(parent: null, args: { id: string }) {
    return dummies.find(dummy => dummy.id === args.id)
  }
}

export const Dummy = {
  type,
  queries: {
    dummy: getOne
  }
}
