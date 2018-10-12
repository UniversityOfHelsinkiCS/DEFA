import { StudentModel } from '../models'
import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql'
import { IEditableStudentDocument, IQuery } from './interface'

const type = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    university: { type: GraphQLString },
    studentNumber: { type: GraphQLString }
  })
})

// Defining a query.
const getOne: IQuery = {
  type,
  args: { id: { type: GraphQLString } },
  resolve(parent: null, args: { id: string }) {
    return StudentModel.findById(args.id)
  }
}

const getMany: IQuery = {
  type: new GraphQLList(type),
  args: {
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  },
  resolve(parent: null, args: { [key: string]: string, id: string, name: string }) {
    return StudentModel.find({})
  }
}

const create: IQuery = {
  type,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    university: { type: GraphQLString },
    studentNumber: { type: GraphQLString }
  },
  resolve(parent: null, args: { name: string, university: string, studentNumber: string }) {
    const { name, university, studentNumber } = args
    const newStudent = new StudentModel({ name, university, studentNumber })
    return newStudent.save()
  }
}

const update: IQuery = {
  type,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    university: { type: GraphQLString },
    studentNumber: { type: GraphQLString }
  },
  async resolve(parent: null, args: { id: string, name: string, university: string, studentNumber: string }) {
    const toUpdate: IEditableStudentDocument = await StudentModel.findById(args.id)
    if (!toUpdate) { return null }
    toUpdate.name = args.name
    toUpdate.studentNumber = args.studentNumber
    toUpdate.university = args.university
    return toUpdate.save()
  }
}

const deleteStudent: IQuery = {
  type,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parent: null, args: { id: string }) {
    return StudentModel.findByIdAndDelete(args.id)
  }
}

// Export the type in the form that schema.ts expects.
export const Student = {
  queries: {
    student: getOne,
    students: getMany
  },
  mutations: {
    createStudent: create,
    updateStudent: update,
    deleteStudent
  }
}
