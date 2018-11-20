import { creditOwnershipAccess } from '../../../src/schema/validators'
import InvalidInputError from '../../../src/utils/errors/InvalidInputError'
import LoginRequiredError from '../../../src/utils/errors/LoginRequiredError'
import { IUser, IContext, IUserAttributes } from '../../../src/schema/types/interface'
import { IEditCredit, ICreditWithUni } from '../../../src/schema/types/Credit'
import { UserModel, CreditModel } from '../../../src/schema/models'
import { IUserModel } from '../../../src/schema/models/User'
import { ICreditModel } from '../../../src/schema/models/Credit'
import { connect } from '../../../src/mongo/connection'

connect()

describe('creditOwnershipAccess validator', () => {
  let user: IUser
  let otherUser: IUserModel
  let credits: IEditCredit[]
  let forbiddenCredits: IEditCredit[]
  const attributes: IUserAttributes = {
    schacHomeOrganization: 'organization.fi'
  } as IUserAttributes

  beforeAll(async done => {
    const dbUser: IUserModel = (await UserModel.create({
      role: 'PRIVILEGED',
      name: 'User'
    })) as IUserModel
    otherUser = (await UserModel.create({
      role: 'PRIVILEGED',
      name: 'User'
    })) as IUserModel
    const newCredits: ICreditWithUni[] = [
      {
        student_number: 'sn',
        course_name: 'cn',
        course_code: 'cc',
        date: 'd',
        study_credits: 5,
        grade: 5,
        language: 'l',
        university: attributes.schacHomeOrganization,
        teacher: dbUser.id
      },
      {
        student_number: 'sn2',
        course_name: 'cn2',
        course_code: 'cc2',
        date: 'd2',
        study_credits: 4,
        grade: 4,
        language: 'l2',
        university: attributes.schacHomeOrganization,
        teacher: dbUser.id
      },
      {
        student_number: 'sn2',
        course_name: 'cn2',
        course_code: 'cc2',
        date: 'd2',
        study_credits: 4,
        grade: 4,
        language: 'l2',
        university: attributes.schacHomeOrganization,
        teacher: otherUser.id
      }
    ]
    credits = ((await CreditModel.create(newCredits)) as ICreditModel[]).map(
      (credit: ICreditModel): IEditCredit => ({ id: credit.id })
    )
    forbiddenCredits = [credits.pop()]
    user = {
      id: dbUser.id,
      role: dbUser.role,
      name: dbUser.name,
      attributes
    }
    done()
  })

  afterAll(async done => {
    await Promise.all([
      CreditModel.deleteMany({
        id: {
          $in: [...credits.map(credit => credit.id), ...forbiddenCredits.map(credit => credit.id)]
        }
      }),
      UserModel.findByIdAndDelete(user.id),
      UserModel.findOneAndDelete(otherUser.id)
    ])
    done()
  })

  it('when user is missing rejects with a LoginRequiredError.', () => {
    expect(
      creditOwnershipAccess(null, { credits }, { user: null } as IContext)
    ).rejects.toEqual(expect.any(LoginRequiredError))
  })

  it('when credits are missing rejects with an InvalidInputError.', () => {
    expect(
      creditOwnershipAccess(null, {}, { user } as IContext)
    ).rejects.toEqual(expect.any(InvalidInputError))
  })

  it('when credits is empty rejects with an InvalidInputError.', () => {
    expect(
      creditOwnershipAccess(null, { credits: [] }, { user } as IContext)
    ).rejects.toEqual(expect.any(InvalidInputError))
  })

  it('when credits have been uploaded by user it resolves.', () => {
    expect(
      creditOwnershipAccess(null, { credits }, { user } as IContext)
    ).resolves.toBe(undefined)
  })

  it('when credits have not been uploaded by user it rejects with an InvalidInputError.', () => {
    expect(
      creditOwnershipAccess(null, { credits: forbiddenCredits }, { user } as IContext)
    ).rejects.toEqual(expect.any(InvalidInputError))
  })
})
