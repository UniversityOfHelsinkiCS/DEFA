import { Credit } from '../../../src/schema/types'
import { CreditModel, UserModel } from '../../../src/schema/models'
import { IContext, IUser } from '../../../src/schema/types/interface'
import { IUserModel } from '../../../src/schema/models/User'
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

describe('Credit GraphQL type', () => {
  let user: IUser
  beforeAll(async done => {
    const dbUser = (await UserModel.create({
      name: 'Test Teacher',
      role: 'PRIVILEGED'
    })) as IUserModel
    user = { id: dbUser.id, role: dbUser.role, attributes: {
        schacHomeOrganization: 'yliopisto.fi'
      }
    } as unknown as IUser
    CreditModel.deleteMany({}).then(() => done())
  })
  afterEach(done => {
    CreditModel.deleteMany({}).then(() => done())
  })

  describe('createCredits mutation resolver', () => {
    it('throws an error when user is unauthorized.', async done => {
      const unauthorizedUser = {
        ...user,
        role: 'STUDENT'
      }
      try {
        await Credit.mutations.createCredits.resolve(
          null,
          {
            credits: exampleCredits
          },
          { user: unauthorizedUser } as IContext
        )
        done('resolver did not throw an error.')
      } catch (e) {
        expect(e).toEqual(expect.any(Error))
        done()
      }
    })
    it('returns an array of created credits.', async () => {
      const credits = await Credit.mutations.createCredits.resolve(
        null,
        {
          credits: exampleCredits
        },
        { user } as IContext
      )
      expect(credits).toEqual([
        expect.objectContaining(exampleCredits[0]),
        expect.objectContaining(exampleCredits[1])
      ])
    })
    it('applies user\'s university on the credits.', async () => {
      const credits = await Credit.mutations.createCredits.resolve(
        null,
        {
          credits: exampleCredits
        },
        { user } as IContext
      )
      expect(credits).toEqual(exampleCredits.map(credit => expect.objectContaining({
        ...credit,
        university: user.attributes.schacHomeOrganization
      })))
    })
    it('creates database rows.', async () => {
      await Credit.mutations.createCredits.resolve(
        null,
        {
          credits: exampleCredits
        },
        { user } as IContext
      )
      const found = await CreditModel.find({})
      expect(found).toContainEqual(expect.objectContaining(exampleCredits[0]))
      expect(found).toContainEqual(expect.objectContaining(exampleCredits[1]))
    })
  })
})
