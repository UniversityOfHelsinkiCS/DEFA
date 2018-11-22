import { UserModel } from '../models'
import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql'
import { IQuery, Iresolve } from '../../utils/typescript'
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

const userType = new GraphQLObjectType({
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

export const teacherType = new GraphQLObjectType({
  name: 'Teacher',
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString }
  })
})

// Defining a query.
const getOne: IQuery = {
  type: userType,
  args: { id: { type: GraphQLString } },
  resolve(parent: null, args: { id: string }) {
    return UserModel.findById(args.id)
  },
  access: adminAccess
}

const getMany: IQuery = {
  type: new GraphQLList(userType),
  args: {
    id: { type: GraphQLString }
  },
  resolve(parent: null, args: { [key: string]: string, id: string }) {
    return UserModel.find({})
  },
  access: adminAccess
}

const getMe: IQuery = {
  type: userType,
  args: {},
  resolve(parent, args: {}, context) {
    return UserModel.findById(context.user.id)
  },
  access: userAccess
}

export const getByIdResolver: Iresolve = (parent: { teacher: string }) => {
  return UserModel.findById(parent.teacher)
}

const create: IQuery = {
  type: userType,
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
  type: userType,
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
