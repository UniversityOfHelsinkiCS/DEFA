const jwt = require('jsonwebtoken')
const { SECRET } = require('../config')
const { UserModel } = require('../models')
const { connect } = require('../mongo/connection')

connect()

const ADMIN_USER_DATA = {
  username: 'adminuser',
  name: 'Admin User',
  role: 'ADMIN',
  cn: 'Admin User',
  studentNumber: '000000000',
  email: 'admin@admin.admin'
}

const tokenCallback = adminUser => {
  const token = jwt.sign({
    id: adminUser.id,
    role: adminUser.role
  }, SECRET)
  console.log(token)
  process.exit(0)
}

UserModel.findOne(ADMIN_USER_DATA).then((loggedIn) => {
  if (loggedIn) {
    tokenCallback(loggedIn)
  } else {
    UserModel.create(ADMIN_USER_DATA).then(tokenCallback).catch(() => {})
  }
}).catch(() => {})

setTimeout(() => {
  process.exit(1)
}, 5000)
