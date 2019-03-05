const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const options = {
  useNewUrlParser: true,
  authSource: 'admin',
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASS,
  dbName: process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_NAME : process.env.DATABASE_NAME
}
const connect = (
  (extraOptions = {}) => mongoose.connect(`mongodb://${process.env.DATABASE_URI}`, { ...options, ...extraOptions })
)

module.exports = {
  connect
}
