import { CreditModel } from '../models'
import { teacherType, getByIdResolver } from './User'
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} from 'graphql'
import { IQuery, IUser, Iresolve } from './interface'
import { Document, Types } from 'mongoose'
import applyAccess, { privilegedAccess, adminAccess, creditOwnershipAccess } from '../validators'

const type: GraphQLObjectType = new GraphQLObjectType({
  name: 'Credit',
  fields: () => ({
    id: { type: GraphQLString },
    student_number: { type: GraphQLString },
    teacher: {
      type: teacherType,
      resolve: getByIdResolver
    },
    course_name: { type: GraphQLString },
    course_code: { type: GraphQLString },
    date: { type: GraphQLString },
    study_credits: { type: GraphQLInt },
    grade: { type: GraphQLInt },
    language: { type: GraphQLString },
    university: { type: GraphQLString }
  })
})

const input = new GraphQLInputObjectType({
  name: 'InputCredit',
  fields: {
    student_number: { type: new GraphQLNonNull(GraphQLString) },
    course_name: { type: GraphQLString },
    course_code: { type: GraphQLString },
    date: { type: GraphQLString },
    study_credits: { type: new GraphQLNonNull(GraphQLInt) },
    grade: { type: GraphQLInt },
    language: { type: GraphQLString }
  }
})

const editInput = new GraphQLInputObjectType({
  name: 'EditInputCredit',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  }
})

const getMany: IQuery = {
  type: new GraphQLList(type),
  args: {},
  resolve(parent: null, args: {}) {
    return CreditModel.find()
  },
  access: adminAccess
}

interface ICredit {
  student_number: string,
  course_name: string,
  course_code: string,
  date: string,
  study_credits: number,
  grade: number,
  language: string
}

export interface ICreditWithUni extends ICredit {
  university: string,
  teacher: string
}

export interface IEditCredit {
  id: string
}

const unversityMapper = (user: IUser) => (credit: ICredit): ICreditWithUni => ({
  ...credit,
  teacher: user.id,
  university: user.attributes.schacHomeOrganization
})

const createMany: IQuery = {
  type: new GraphQLList(type),
  args: {
    credits: { type: new GraphQLNonNull(new GraphQLList(input)) }
  },
  async resolve(parent: null, args: { credits: ICredit[] }, context) {
    const newCredits: Document[] = args.credits
      .map(unversityMapper(context.user))
      .map(credit => new CreditModel(credit))
    const created = await CreditModel.create(newCredits)
    return created
  },
  access: privilegedAccess
}

const myUploads: IQuery = {
  type: new GraphQLList(type),
  args: {},
  async resolve(parent: null, args: {}, context) {
    const { user } = context
    return await CreditModel.find({
      teacher: user.id
    })
  },
  access: privilegedAccess
}

const organizationUploads: IQuery = {
  type: new GraphQLList(type),
  args: {},
  async resolve(parent: null, args: {}, context) {
    const { user } = context
    return await CreditModel.find({
      university: user.attributes.schacHomeOrganization
    })
  },
  access: privilegedAccess
}

const deleteMany: IQuery = {
  type: new GraphQLList(type),
  args: {
    credits: { type: new GraphQLNonNull(new GraphQLList(editInput)) }
  },
  async resolve(parent: null, args: { credits: IEditCredit[] }) {
    return await CreditModel.deleteMany({
      _id: {
        $in: args.credits.map(credit => Types.ObjectId(credit.id))
      }
    })
  },
  access: creditOwnershipAccess
}

export const getByIdentifier: Iresolve = (parent: { university: string, student_number: string }, args: {}) => {
  if (!parent) { return null }
  return CreditModel.find({
    university: parent.university,
    student_number: parent.student_number
  })
}

export const CreditType = type

export default applyAccess({
  queries: {
    credits: getMany,
    myUploads,
    organizationUploads
  },
  mutations: {
    createCredits: createMany,
    deleteCredits: deleteMany
  }
})
