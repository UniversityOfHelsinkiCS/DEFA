const { Types } = require('mongoose')
const { UserModel, SubmissionModel } = require('../models')
const { checkLoggedIn, checkPrivileged } = require('../utils/helpers')

const submissions = async (parent, args, context) => {
  checkPrivileged(context)
  const databaseSubmissions = await SubmissionModel.find({}).populate('user')
  return databaseSubmissions.filter(submission => Object.entries(args.user || {}).reduce(
    (acc, [key, value]) => acc && submission.user[key].includes(value),
    true
  ))
}

const createSubmission = (parent, args, context) => {
  checkLoggedIn(context)
  return SubmissionModel.create({
    ...args,
    date: Number(new Date()),
    user: Types.ObjectId(context.authorization.id)
  })
}

const approveSubmission = async (parent, args, context) => {
  checkPrivileged(context)
  const submission = await SubmissionModel.findByIdAndUpdate(args.submission, {
    approval: args.approval
  })
  if (!submission) {
    return null
  }
  submission.approval = args.approval
  return submission
}

const user = (parent) => UserModel.findById(parent.user)

module.exports = {
  Query: {
    submissions
  },
  Mutation: {
    createSubmission,
    approveSubmission
  },
  Submission: {
    user
  }
}
