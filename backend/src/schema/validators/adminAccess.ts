import { IUser, IvalidatorFunction } from '../types/interface'
import PrivilegeRequiredError from '../../utils/errors/PrivilegeRequiredError'
import userAccess from './userAccess'

// Validates that user is an administrator.

const checkUser = (user: IUser): void => {
  if (user.role !== 'ADMIN') {
    throw new PrivilegeRequiredError()
  }
}

const checkAdmin: IvalidatorFunction = (...inputs) => {
  userAccess(...inputs)
  checkUser(inputs[2].user)
}

export default checkAdmin
