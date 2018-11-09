import { UserModel } from '../models'
import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql'
import { IQuery } from './interface'
import { getByIdentifier, CreditType } from './Credit'
import applyAccess, { userAccess, adminAccess } from '../validators'

const identifierType = new GraphQLObjectType({
  name: 'Identifier',
  fields: () => ({
    id: { type: GraphQLString },
    university: { type: GraphQLString },
    student_number: { type: GraphQLString },
    credits: { type: new GraphQLList(CreditType), resolve: getByIdentifier }
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
  },
  access: adminAccess
}

const getMany: IQuery = {
  type: new GraphQLList(type),
  args: {
    id: { type: GraphQLString }
  },
  resolve(parent: null, args: { [key: string]: string, id: string }) {
    return UserModel.find({})
  },
  access: adminAccess
}

const getMe: IQuery = {
  type,
  args: {},
  resolve(parent, args: {}, context) {
    return UserModel.findOne({
      id: context.user.id
    })
  },
  access: userAccess
}

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
  },
  access: adminAccess
}

const deleteUser: IQuery = {
  type,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parent: null, args: { id: string }) {
    return UserModel.findByIdAndDelete(args.id)
  },
  access: adminAccess
}

// Export the type in the form that schema.ts expects.
export default applyAccess({
  queries: {
    user: getOne,
    users: getMany,
    me: getMe
  },
  mutations: {
    createUser: create,
    deleteUser
  }
})
