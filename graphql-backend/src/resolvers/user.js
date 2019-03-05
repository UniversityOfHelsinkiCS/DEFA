const jwt = require('jsonwebtoken')
const { Types } = require('mongoose')
const { SECRET, JWT_OPTIONS } = require('../config')
const { checkLoggedIn, checkAdmin, checkPrivileged } = require('../utils/helpers')
const { UserModel, SubmissionModel } = require('../models')

const me = (parent, args, context) => {
  checkLoggedIn(context)
  return UserModel.findById(context.authorization.id)
}

const users = (parent, args, context) => {
  checkPrivileged(context)
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
  checkAdmin(context)
  let loggedIn = await UserModel.findOne({
    username: args.username
  })
  if (!loggedIn) {
    loggedIn = await UserModel.create({ ...args, role: 'STUDENT' })
  } else if (Object.entries(args).reduce(
    (acc, [key, value]) => acc || loggedIn[key] !== value,
    false
  )) {
    Object.entries(args).forEach(([key, value]) => {
      loggedIn[key] = value
    })
    await loggedIn.save()
  }
  return jwt.sign({
    id: loggedIn.id,
    role: loggedIn.role,
    name: loggedIn.name
  }, SECRET, JWT_OPTIONS)
}

const refreshToken = async (parent, args, context) => {
  checkLoggedIn(context)
  const loggedIn = await UserModel.findById(args.id)

  return jwt.sign({
    id: loggedIn.id,
    role: loggedIn.role,
    name: loggedIn.name
  }, SECRET, JWT_OPTIONS)
}

const editUser = async (parent, args, context) => {
  checkAdmin(context)
  const toModify = await UserModel.findById(args.id)
  const modified = Object.assign(toModify, args.values)
  modified.save()
  return modified
}

const submissions = parent => SubmissionModel.find({
  user: Types.ObjectId(parent.id)
})

module.exports = {
  Query: {
    me,
    users,
    refreshToken
  },
  Mutation: {
    login,
    editUser
  },
  User: {
    submissions
  }
}
