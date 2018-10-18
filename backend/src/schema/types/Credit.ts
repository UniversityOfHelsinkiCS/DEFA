import { CreditModel } from '../models'
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} from 'graphql'
import { IQuery } from './interface'

const type: GraphQLObjectType = new GraphQLObjectType({
  name: 'Credit',
  fields: () => ({
    id: { type: GraphQLString },
    student_number: { type: GraphQLString },
    course_code: { type: GraphQLString },
    date: { type: GraphQLString },
    study_credits: { type: GraphQLInt },
    grade: { type: GraphQLInt },
    language: { type: GraphQLString },
    teacher: { type: GraphQLString },
    university: { type: GraphQLString }
  })
})

const input = new GraphQLInputObjectType({
  name: 'InputCredit',
  fields: {
    student_number: { type: new GraphQLNonNull(GraphQLString) },
    course_code: { type: GraphQLString },
    date: { type: GraphQLString },
    study_credits: { type: new GraphQLNonNull(GraphQLInt) },
    grade: { type: GraphQLString },
    language: { type: GraphQLString },
    teacher: { type: GraphQLString },
    university: { type: new GraphQLNonNull(GraphQLString) }
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
  course_code: string,
  date: string,
  study_credits: number,
  grade: string,
  language: string,
  teacher: string,
  university: string
}

const createMany: IQuery = {
  type: new GraphQLList(type),
  args: {
    credits: { type: new GraphQLNonNull(new GraphQLList(input)) }
  },
  async resolve(parent: null, args: { credits: ICredit[] } ) {
    const newCredits = args.credits.map(credit => new CreditModel(credit))
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
