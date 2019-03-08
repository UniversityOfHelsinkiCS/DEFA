const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  url: String,
  date: Date,
  approval: {
    type: String,
    default: 'PENDING'
  },
  comment: {
    type: String,
    default: ''
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }
})

const SubmissionModel = mongoose.model('Submission', schema)

module.exports = SubmissionModel
