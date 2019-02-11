const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  role: String,
  studentNumber: String,
  username: String,
  cn: String,
  email: String
})

const UserModel = mongoose.model('User', schema)

module.exports = UserModel
