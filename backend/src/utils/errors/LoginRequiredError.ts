import { IUser } from '../../schema/types/interface'

class LoginRequiredError extends Error {
  public message = 'You must be logged in to take this action.'
  public extensions = {
    toastable: true
  }
}

export const checkLoggedIn = (user?: IUser): void => {
  if (!user) {
    throw new LoginRequiredError()
  }
}

export default LoginRequiredError
