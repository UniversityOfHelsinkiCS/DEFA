import { Credit, User } from '../../../src/schema/types'
import { Iidentifier } from '../../../src/schema/models/User'

import { getByIdentifier, ICreditWithUni } from '../../../src/schema/types/Credit'
import { CreditModel, UserModel } from '../../../src/schema/models'
import { IContext, IUser } from '../../../src/schema/types/interface'
import { IUserModel } from '../../../src/schema/models/User'
import { Document } from 'mongoose'
import { connect } from '../../../src/mongo/connection'

connect()
const exampleCredits = [
  {
    student_number: '11123457',
    course_name: 'Esimerkkikurssi',
    course_code: 'TKT00000.2018.K.K.1',
    date: '2018-09-25',
    study_credits: 5,
    grade: 5,
    language: 'suomi'
  },
  {
    student_number: '11123456',
    course_name: 'Esimerkkikurssi',
    course_code: 'TKT00000.2018.K.K.1',
    date: '2018-09-25',
    study_credits: 5,
    grade: 4,
    language: 'suomi'
  }
]

describe('User GraphQL type', () => {
  let studentUser: IUser
  let teacherUser: IUser
  beforeAll(async () => {
    const dbSUser = (await UserModel.create({
      name: 'Test Student',
      role: 'STUDENT',
      identifiers: {
        student_number: '11123456',
        university: 'helsinki.fi'
      }
    })) as IUserModel
    const dbTUser = (await UserModel.create({
      name: 'Test Teacher',
      role: 'PRIVILEGED',
      identifiers: {
        student_number: null,
        university: 'helsinki.fi'
      }
    })) as IUserModel
    studentUser = {
      id: dbSUser.id, role: dbSUser.role, attributes: {
        schacHomeOrganization: dbSUser.identifiers[0].university
      }
    } as unknown as IUser
    teacherUser = {
      id: dbTUser.id, role: dbTUser.role, attributes: {
        schacHomeOrganization: dbTUser.identifiers[0].university
      }
    } as unknown as IUser
    await CreditModel.deleteMany({})
    const credits = await Credit.mutations.createCredits.resolve(
      null,
      {
        credits: exampleCredits
      },
      { user: teacherUser } as IContext
    )
  })

  describe('User', () => {
    it('has access to own credits.', async () => {
      const student = (await User.queries.me.resolve(
        null,
        null,
        { user: studentUser } as IContext
      )) as IUserModel
      const credits = (await getByIdentifier(student.identifiers[0], {})) as []
      expect(student.name).toEqual('Test Student')
      expect(credits.length).toEqual(1)
    })
  })
  afterEach(async () => {
    await CreditModel.deleteMany({})
  })
})
