import applyAccess, { validateResolver } from './applyAccess'
import publicAccess from './publicAccess'
import userAccess from './userAccess'
import privilegedAccess from './privilegedAccess'
import adminAccess from './adminAccess'
import creditOwnershipAccess from './creditOwnershipAccess'

export {
  validateResolver,
  publicAccess,
  userAccess,
  privilegedAccess,
  adminAccess,
  creditOwnershipAccess
}

export default applyAccess
