// This Dummy type is just for demonstration purposes.
// Remove this when real types are added.

import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'

// Dummy data.
const dummies: Array<{ id: string, name: string }> = [
  { id: '1', name: 'AAA' },
  { id: '2', name: 'BBB' },
  { id: '3', name: 'CCC' }
]

// Defining the Dummy type.
const type = new GraphQLObjectType({
  name: 'Dummy',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  })
})

// Defining a query.
const getOne = {
  type,
  args: { id: { type: GraphQLString } },
  resolve(parent: null, args: { id: string }) {
    // For most types this would be some kind of database query.
    return dummies.find(dummy => dummy.id === args.id)
  }
}

const getMany = {
  type: new GraphQLList(type),
  args: {
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  },
  resolve(parent: null, args: { id: string, name: string }) {
    return dummies.filter(dummy => Object.keys(args).filter(key => args[key]).reduce(
        (acc, key) => {
          if (dummy[key] !== args[key]) { return false }
          return acc
        },
        true
      )
    )
  }
}

// Export the type in the form that schema.ts expects.
export const Dummy = {
  queries: {
    dummy: getOne,
    dummies: getMany
  },
  mutations: {}
}
