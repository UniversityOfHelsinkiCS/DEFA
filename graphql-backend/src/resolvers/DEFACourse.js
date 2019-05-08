const { DEFACourseModel } = require('../models')
const { checkPrivileged } = require('../utils/helpers')

const DEFACourses = (parent, args, context) => {
  checkPrivileged(context)
  return DEFACourseModel.find({})
}

const createDEFACourse = (parent, args, context) => {
  checkPrivileged(context)
  return DEFACourseModel.create(args)
}
const deleteDEFACourse = async (parent, args, context) => {
  checkPrivileged(context)
  const deleted = await DEFACourseModel.findByIdAndDelete(args.id)
  return deleted
}
const updateDEFACourse = async (parent, args, context) => {
  checkPrivileged(context)
  const toEdit = await DEFACourseModel.findById(args.id)
  if (args.name) toEdit.name = args.name
  if (args.required) toEdit.required = args.required
  toEdit.save()
  return toEdit
}

module.exports = {
  Query: {
    DEFACourses
  },
  Mutation: {
    createDEFACourse,
    deleteDEFACourse,
    updateDEFACourse
  }
}
