import { IUser, IContext } from '../../../src/schema/types/interface'
import { publicAccess } from '../../../src/schema/validators'

// These tests are largely taking the piss, but they're here for documentation's sake.

describe('userAccess validator', () => {
  let user: IUser
  describe('when user is missing', () => {
    beforeEach(() => {
      user = null
    })

    it('does not throw an error.', () => {
      expect(() => publicAccess(null, null, { user } as IContext)).not.toThrowError()
    })
  })

  describe('when user is defined', () => {
    beforeEach(() => {
      user = {} as IUser
    })

    it('does not throw an error.', () => {
      expect(() => publicAccess(null, null, { user } as IContext)).not.toThrowError()
    })
  })
})
