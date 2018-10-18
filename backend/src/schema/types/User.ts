import { UserModel, CreditModel } from '../models'
import { Credit } from '../types'
import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql'
import { IQuery } from './interface'

const identifierType = new GraphQLObjectType({
  name: 'Identifier',
  fields: () => ({
    id: { type: GraphQLString },
    university: { type: GraphQLString },
    student_number: { type: GraphQLString }
   })
})

const type = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    role: { type: GraphQLString },
    email: { type: GraphQLString },
    university: { type: GraphQLString },
    identifiers: { type: new GraphQLList(identifierType) }
  })
})

// Defining a query.
const getOne: IQuery = {
  type,
  args: { id: { type: GraphQLString } },
  resolve(parent: null, args: { id: string }) {
    return UserModel.findById(args.id)
  }
}

const getMany: IQuery = {
  type: new GraphQLList(type),
  args: {
    id: { type: GraphQLString }
  },
  resolve(parent: null, args: { [key: string]: string, id: string }) {
    return UserModel.find({})
  }
}

// const getCredits: IQuery = {
//   type: new GraphQLList(type),
//   args: {
//     id: { type: GraphQLString }
//   },
//   async resolve(parent: null, args: { [key: string]: string, id: string}) {
//     const user: type = await UserModel.findById(args.id)
//     console.log(user.identifiers[0].student_number)
//     console.log(Credit.queries.credits)
//     return CreditModel.find({ student_number: user.identifiers[0].student_number})
//   }
// }

const create: IQuery = {
  type,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: GraphQLString },
    identifierId: { type: GraphQLString },
    university: { type: GraphQLString },
    student_number: { type: GraphQLString }
  },
  resolve(parent: null, args: {
    name: string,
    role: string,
    university: string,
    identifierId: string,
    student_number: string
  }) {
    const { name, university, role, identifierId, student_number } = args
    const newUser = new UserModel({ name, role, identifiers: [{ id: identifierId, university, student_number }]})
    return newUser.save()
  }
}

const deleteUser: IQuery = {
  type,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parent: null, args: { id: string }) {
    return UserModel.findByIdAndDelete(args.id)
  }
}

// Export the type in the form that schema.ts expects.
export const User = {
  queries: {
    user: getOne,
    users: getMany
    // userCredits: getCredits
  },
  mutations: {
    createUser: create,
    deleteUser
  }
}
