import { adminAccess } from '../../../src/schema/validators'
import { IUser, IContext } from '../../../src/utils/typescript'
import PrivilegeRequiredError from '../../../src/utils/errors/PrivilegeRequiredError'
import LoginRequiredError from '../../../src/utils/errors/LoginRequiredError'

describe('privilegedAccess validator', () => {
  let user: IUser
  describe('when user is missing', () => {
    beforeEach(() => {
      user = null
    })

    it('throws a LoginRequiredError.', () => {
      expect(() => adminAccess(null, null, { user } as IContext)).toThrowError(LoginRequiredError)
    })
  })

  describe('when user is not privileged', () => {
    beforeEach(() => {
      user = {
        role: 'STUDENT'
      } as IUser
    })

    it('throws a PrivilegeRequiredError.', () => {
      expect(() => adminAccess(null, null, { user } as IContext)).toThrowError(PrivilegeRequiredError)
    })
  })

  describe('when user is privileged', () => {
    beforeEach(() => {
      user = {
        role: 'PRIVILEGED'
      } as IUser
    })

    it('throws a PrivilegeRequiredError.', () => {
      expect(() => adminAccess(null, null, { user } as IContext)).toThrowError(PrivilegeRequiredError)
    })
  })

  describe('when user is an admin', () => {
    beforeEach(() => {
      user = {
        role: 'ADMIN'
      } as IUser
    })

    it('does not throw an error.', () => {
      expect(() => adminAccess(null, null, { user } as IContext)).not.toThrowError()
    })
  })
})
