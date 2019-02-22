const jwt = require('jsonwebtoken')
const { Types } = require('mongoose')
const { SECRET, JWT_OPTIONS } = require('../config')
const { isAdmin } = require('../helpers')
const { UserModel, SubmissionModel } = require('../models')

const me = (parent, args, context) => {
  if (!context.authorization) {
    return null
  }
  return UserModel.findById(context.authorization.id)
}

const users = (parent, args, context) => {
  if (!isAdmin(context)) {
    return null
  }
  const matcher = Object.entries(args.user).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: new RegExp(value, 'i')
    }),
    {}
  )
  if (args.user.id) {
    matcher.id = args.user.id
  }
  return UserModel.find(matcher)
}

const login = async (parent, args, context) => {
  if (!context.authorization || context.authorization.role !== 'ADMIN') {
    return null
  }
  let loggedIn = await UserModel.findOne({
    username: args.username
  })
  if (!loggedIn) {
    loggedIn = await UserModel.create({ ...args, role: 'STUDENT' })
  }
  return jwt.sign({
    id: loggedIn.id,
    role: loggedIn.role,
    name: loggedIn.name
  }, SECRET, JWT_OPTIONS)
}

const editUser = async (parent, args, context) => {
  if (!isAdmin(context)) {
    return null
  }
  const toModify = await UserModel.findById(args.id)
  const modified = Object.assign(toModify, args.values)
  modified.save()
  return modified
}

const submissions = (parent) => {
  return SubmissionModel.find({
    user: Types.ObjectId(parent.id)
  })
}

module.exports = {
  Query: {
    me,
    users
  },
  Mutation: {
    login,
    editUser
  },
  User: {
    submissions
  }
}
