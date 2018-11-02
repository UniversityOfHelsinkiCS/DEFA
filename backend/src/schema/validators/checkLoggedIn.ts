import { IUser } from '../../schema/types/interface'
import LoginRequiredError from '../../utils/errors/LoginRequiredError'

const checkLoggedIn = (user?: IUser): void => {
  if (!user) {
    throw new LoginRequiredError()
  }
}

export default checkLoggedIn
