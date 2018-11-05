import { IUser, IvalidatorFunction } from '../../schema/types/interface'
import LoginRequiredError from '../../utils/errors/LoginRequiredError'

// Validates that the user is logged in, as in not anonymous.

const checkUser = (user?: IUser): void => {
  if (!user) {
    throw new LoginRequiredError()
  }
}

const checkLoggedIn: IvalidatorFunction = (...inputs) => checkUser(inputs[2].user)

export default checkLoggedIn
