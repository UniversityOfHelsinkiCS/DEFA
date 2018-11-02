import { IUser, IContext } from '../../../src/schema/types/interface'
import userAccess from '../../../src/schema/validators/userAccess'
import LoginRequiredError from '../../../src/utils/errors/LoginRequiredError'

describe('checkLoggedIn validator', () => {
  let user: IUser
  describe('when user is missing', () => {
    beforeEach(() => {
      user = null
    })

    it('throws a LoginRequiredError.', () => {
      expect(() => userAccess(null, null, { user } as IContext)).toThrowError(LoginRequiredError)
    })
  })

  describe('when user is defined', () => {
    beforeEach(() => {
      user = {} as IUser
    })

    it('does not throw an error.', () => {
      expect(() => userAccess(null, null, { user } as IContext)).not.toThrowError()
    })
  })
})
