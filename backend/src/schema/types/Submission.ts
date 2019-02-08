import { Types } from 'mongoose'
import { SubmissionModel } from '../models'
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql'
import { IQuery, IUser, Iresolve } from '../../utils/typescript'
import applyAccess, { userAccess, adminAccess } from '../validators'

const type: GraphQLObjectType = new GraphQLObjectType({
  name: 'Submission',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) }
  })
})

export const getByUserResolver: Iresolve = (parent: { id: string }) => {
  // TODO: error handling
  return SubmissionModel.find({
    user: Types.ObjectId(parent.id)
  })
}

const getAll: IQuery = {
  type: new GraphQLList(type),
  args: {},
  resolve() {
    return SubmissionModel.find({})
  },
  access: adminAccess
}

const create: IQuery = {
  type,
  args: {
    url: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parent, args: { url: string }, context: { user: IUser }) {
    // TODO: error handling
    return SubmissionModel.create({
      user: context.user.id,
      url: args.url,
      date: new Date()
    })
  },
  access: userAccess
}

const adminCreate: IQuery = {
  type,
  args: {
    url: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parent, args: { url: string, user: string }) {
    // TODO: error handling
    return SubmissionModel.create({
      user: args.user,
      url: args.url,
      date: new Date()
    })
  },
  access: adminAccess
}

export const submissionType = type

export default applyAccess({
  queries: {
    submissions: getAll
  },
  mutations: {
    createSubmission: create,
    adminCreateSubmission: adminCreate
  }
})
