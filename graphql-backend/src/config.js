const dotenv = require('dotenv')

dotenv.config()

const JWT_OPTIONS = {
  expiresIn: '30m'
}

module.exports = {
  SECRET: process.env.SECRET,
  JWT_OPTIONS
}
