// This Dummy type is just for demonstration purposes.
// Remove this when real types are added.

interface IDummy {
  [key: string]: string
  id: string
  name: string
}

import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql'

// Dummy data.
const dummies: IDummy[] = [
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
  resolve(parent: null, args: { [key: string]: string, id: string, name: string }) {
    return dummies.filter((dummy: IDummy) => Object.keys(args).filter((key: string) => args[key]).reduce(
        (acc: boolean, key: string) => {
          if (dummy[key] !== args[key]) { return false }
          return acc
        },
        true
      )
    )
  }
}

// Define a mutation
const create = {
  type,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parent: null, args: { name: string }) {
    const newDummy: IDummy = {
      id: (dummies.length + 1).toString(),
      name: args.name
    }
    dummies.push(newDummy)
    return newDummy
  }
}

const update = {
  type,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parent: null, args: { id: string, name: string }) {
    const toUpdate: IDummy | null = dummies.find(dummy => dummy.id === args.id)
    if (toUpdate) { toUpdate.name = args.name }
    return toUpdate
  }
}

const deleteDummy = {
  type,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parent: null, args: { id: string }) {
    const index: number = dummies.findIndex(dummy => dummy.id === args.id)
    const toDelete: IDummy | undefined = dummies[index]
    if (toDelete) { dummies.splice(index, 1) }
    return toDelete
  }
}

// Export the type in the form that schema.ts expects.
export const Dummy = {
  queries: {
    dummy: getOne,
    dummies: getMany
  },
  mutations: {
    createDummy: create,
    updateDummy: update,
    deleteDummy
  }
}
