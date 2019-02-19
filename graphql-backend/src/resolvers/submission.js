const { Types } = require('mongoose')
const { UserModel, SubmissionModel } = require('../models')
const { isPrivileged } = require('../helpers')

const submissions = async (parent, args, context) => {
  if (!isPrivileged(context)) {
    return null
  }
  const submissions = await SubmissionModel.find({}).populate('user')
  return submissions.filter(submission => Object.entries(args.user || {}).reduce(
    (acc, [key, value]) => acc && submission.user[key].includes(value),
    true
  ))
}

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
  Query: {
    submissions
  },
  Mutation: {
    createSubmission
  },
  Submission: {
    user
  }
}
