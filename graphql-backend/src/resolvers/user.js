const jwt = require('jsonwebtoken')
const { Types } = require('mongoose')
const { SECRET, JWT_OPTIONS } = require('../config')
const { UserModel, SubmissionModel } = require('../models')

const me = (parent, args, context) => {
  if (!context.authorization) {
    return null
  }
  return UserModel.findById(context.authorization.id)
}

const login = async (parent, args, context) => {
  if (!context.authorization || context.authorization.role !== 'ADMIN') {
    return null
  }
  let loggedIn = await UserModel.findOne({
    username: args.username
  })
  if (!loggedIn) {
    loggedIn = await UserModel.create(args)
  }
  return jwt.sign({
    id: loggedIn.id,
    role: loggedIn.role,
    name: loggedIn.name
  }, SECRET, JWT_OPTIONS)
}

const submissions = (parent) => {
  return SubmissionModel.find({
    user: Types.ObjectId(parent.id)
  })
}

module.exports = {
  Query: {
    me
  },
  Mutation: {
    login
  },
  User: {
    submissions
  }
}
