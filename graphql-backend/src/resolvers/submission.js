const { Types } = require('mongoose')
const { UserModel, SubmissionModel } = require('../models')

const createSubmission = (parent, args, context) => {
  if (!context.authorization) {
    return null
  }
  return SubmissionModel.create({
    ...args,
    user: Types.ObjectId(context.authorization.id)
  })
}

const user = (parent) => UserModel.findById(parent.user)

module.exports = {
  Query: {},
  Mutation: {
    createSubmission
  },
  Submission: {
    user
  }
}
