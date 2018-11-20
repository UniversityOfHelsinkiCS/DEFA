import { Credit } from '../../../src/schema/types'
import { CreditModel, UserModel } from '../../../src/schema/models'
import { IContext, IUser } from '../../../src/schema/types/interface'
import { IUserModel } from '../../../src/schema/models/User'
import { connect } from '../../../src/mongo/connection'
import { ICreditModel } from '../../../src/schema/models/Credit'

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
  afterAll(async () => {
    await UserModel.findByIdAndDelete(user.id)
  })

  describe('createCredits mutation resolver', () => {
    afterEach(done => {
      CreditModel.deleteMany({}).then(() => done())
    })

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

  describe('uploads query resolvers', () => {
    const dbValues: {
      otheruser?: string,
      credits: Array<{
        id: string,
        mine: boolean,
        organization: boolean
      }>
    } = {
      otheruser: null,
      credits: []
    }
    beforeAll(async () => {
      dbValues.otheruser = (await UserModel.create({
        name: 'Test Teacher',
        role: 'PRIVILEGED'
      })).id
      dbValues.credits = ((await Promise.all([
        CreditModel.create({
          student_number: '012345678',
          course_code: 'TKT0000',
          study_credits: 5,
          grade: 5,
          university: 'uni.fi',
          teacher: user.id
        }),
        CreditModel.create({
          student_number: '012345678',
          course_code: 'TKT0000',
          study_credits: 5,
          grade: 5,
          university: 'uni.fi',
          teacher: dbValues.otheruser
        }),
        CreditModel.create({
          student_number: '012345678',
          course_code: 'TKT0000',
          study_credits: 5,
          grade: 5,
          university: 'otheruni.fi',
          teacher: dbValues.otheruser
        })
      ])) as unknown as ICreditModel[] ).map(
        (credit: ICreditModel) => ({
          id: String(credit.id),
          mine: String(credit.teacher) === user.id,
          organization: credit.university === user.attributes.schacHomeOrganization
        })
      )
    })
    afterAll(async () => {
      await Promise.all([
        CreditModel.deleteMany({}),
        UserModel.findByIdAndDelete(dbValues.otheruser)
      ])
    })

    describe('myUploads query resolver', () => {
      let result: ICreditModel[]
      let myUploads: string[]
      beforeAll(async () => {
        result = (
          await Credit.queries.myUploads.resolve(null, { credits: dbValues.credits }, { user } as IContext)
        ) as ICreditModel[]
        myUploads = dbValues.credits.filter(credit => credit.mine).map(credit => credit.id)
      })
      it('finds only credits uploaded by user.', async () => {
        result.forEach(credit => {
          expect(myUploads).toContain(credit.id)
        })
      })

      it('finds all credits uploaded by user.', async () => {
        expect(result.length).toEqual(myUploads.length)
      })
    })

    describe('organizationUploads query resolver', () => {
      let result: ICreditModel[]
      let orgUploads: string[]
      beforeAll(async () => {
        result = (
          await Credit.queries.organizationUploads.resolve(null, { credits: dbValues.credits }, { user } as IContext)
        ) as ICreditModel[]
        orgUploads = dbValues.credits.filter(credit => credit.organization).map(credit => credit.id)
      })
      it('finds only credits uploaded by user\'s organization members.', async () => {
        result.forEach(credit => {
          expect(orgUploads).toContain(credit.id)
        })
      })

      it('finds all credits uploaded by user\'s organization members.', async () => {
        expect(result.length).toEqual(orgUploads.length)
      })
    })
  })
})
