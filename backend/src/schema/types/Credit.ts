import { Iidentifier } from '../models/User'
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
import { Document } from 'mongoose'
import applyAccess, { privilegedAccess, adminAccess } from '../validators'

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
  grade: string,
  language: string
}

export interface ICreditWithUni extends ICredit {
  university: string,
  teacher: string
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

export const getByIdentifier: Iresolve = (parent: Iidentifier, args: {}) => {
  if (!parent) { return null }
  return CreditModel.find({
    university: parent.university,
    student_number: parent.student_number
  })
}

export const getByUniversity: Iresolve = (parent: { university: string, student_number: string }, args: {}) => {
  if (!parent) { return null }
  return CreditModel.find({
    university: parent.university
  })
}

export const CreditType = type

export default applyAccess({
  queries: {
    credits: getMany
  },
  mutations: {
    createCredits: createMany
  }
})
