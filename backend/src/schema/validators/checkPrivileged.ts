import { IUser } from '../../schema/types/interface'
// import PrivilegeRequiredError from '../../utils/errors/PrivilegeRequiredError'
import checkLoggedIn from './checkLoggedIn'

const checkPrivileged = (user?: IUser): void => {
  checkLoggedIn(user)
  // TODO check your privilege
  /* if (user.role !== 'privileged') {
    throw new PrivilegeRequiredError
  } */
}

export default checkPrivileged
