// This Dummy type is just for demonstration purposes.
// Remove this when real types are added.

import { DummyModel } from '../models'
import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql'

interface IDummy {
  [key: string]: string
  id: string
  name: string
}

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
    return DummyModel.findById(args.id)
  }
}

const getMany = {
  type: new GraphQLList(type),
  args: {
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  },
  resolve(parent: null, args: { [key: string]: string, id: string, name: string }) {
    return DummyModel.find({})
    /* return dummies.filter((dummy: IDummy) => Object.keys(args).filter((key: string) => args[key]).reduce(
        (acc: boolean, key: string) => {
          if (dummy[key] !== args[key]) { return false }
          return acc
        },
        true
      )
    )*/
  }
}

// Define a mutation
const create = {
  type,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parent: null, args: { name: string }) {
    const newDummy = new DummyModel({ name: args.name })
    return newDummy.save()
  }
}

const update = {
  type,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  async resolve(parent: null, args: { id: string, name: string }) {
    const toUpdate = await DummyModel.findById(args.id)
    if (!toUpdate) { return null }
    toUpdate.name = args.name
    return toUpdate.save()
  }
}

const deleteDummy = {
  type,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parent: null, args: { id: string }) {
    return DummyModel.findByIdAndDelete(args.id)
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
