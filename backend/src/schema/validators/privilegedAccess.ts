import { IUser, IvalidatorFunction } from '../../utils/typescript'
import PrivilegeRequiredError from '../../utils/errors/PrivilegeRequiredError'
import userAccess from './userAccess'

const PRIVILEGED_ROLES: string[] = [
  'PRIVILEGED',
  'ADMIN'
]

// Validates that user is in a privileged role.

const checkUser = (user: IUser): void => {
  if (PRIVILEGED_ROLES.indexOf(user.role) === -1) {
    throw new PrivilegeRequiredError()
  }
}

const checkPrivileged: IvalidatorFunction = (...inputs) => {
  userAccess(...inputs)
  checkUser(inputs[2].user)
}

export default checkPrivileged
