import { IUser, IvalidatorFunction } from '../types/interface'
// import PrivilegeRequiredError from '../../utils/errors/PrivilegeRequiredError'
import checkLoggedIn from './userAccess'

// Not implemented. When implemented, will only let users in privileged roles through.

const checkUser = (user?: IUser): void => {
  // TODO check your privilege
  /* if (user.role !== 'privileged') {
    throw new PrivilegeRequiredError
  } */
}

const checkPrivileged: IvalidatorFunction = (...inputs) => {
  checkLoggedIn(...inputs)
  checkUser(inputs[2].user)
}

export default checkPrivileged
