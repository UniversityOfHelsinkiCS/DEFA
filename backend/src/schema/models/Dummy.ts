// This Dummy model is just for demonstration purposes.
// Remove this when real models are added.

import { GraphQLObjectType, GraphQLString } from 'graphql'

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
    // For most models this would be some kind of database query.
    return dummies.find(dummy => dummy.id === args.id)
  }
}

// Export the model in the form that schema.ts expects.
export const Dummy = {
  queries: {
    dummy: getOne
  }
}
