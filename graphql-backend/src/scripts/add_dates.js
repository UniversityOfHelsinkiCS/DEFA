const { SubmissionModel } = require('../models')
const { connect } = require('../mongo/connection')

connect()

const callback = () => {
  process.exit(0)
}

SubmissionModel.updateMany({}, {
  date: Number(new Date())
}, callback)
