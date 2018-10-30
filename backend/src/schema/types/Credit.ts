import { CreditModel } from '../models'
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} from 'graphql'
import { IQuery, IUser } from './interface'
import { Document } from 'mongoose'

const type: GraphQLObjectType = new GraphQLObjectType({
  name: 'Credit',
  fields: () => ({
    id: { type: GraphQLString },
    student_number: { type: GraphQLString },
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
  }
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

interface ICreditWithUni extends ICredit {
  university: string
}

// TODO: parse university from user info
const unversityMapper = (user: IUser) => (credit: ICredit): ICreditWithUni => ({ ...credit, university: 'placeholder' })

const createMany: IQuery = {
  type: new GraphQLList(type),
  args: {
    credits: { type: new GraphQLNonNull(new GraphQLList(input)) }
  },
  async resolve(parent: null, args: { credits: ICredit[] }, context) {
    const newCredits: Document[] = args.credits
      .map(unversityMapper(context.user))
      .map(credit => new CreditModel(credit))
    return CreditModel.create(newCredits)
  }
}

export const Credit = {
  queries: {
    credits: getMany
  },
  mutations: {
    createCredits: createMany
  }
}
