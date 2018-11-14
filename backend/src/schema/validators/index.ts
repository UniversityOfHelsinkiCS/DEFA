import applyAccess, { validateResolver } from './applyAccess'
import publicAccess from './publicAccess'
import userAccess from './userAccess'
import privilegedAccess from './privilegedAccess'
import adminAccess from './adminAccess'

export {
  validateResolver,
  publicAccess,
  userAccess,
  privilegedAccess,
  adminAccess
}

export default applyAccess
