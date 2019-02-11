const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  url: String,
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }
})

const SubmissionModel = mongoose.model('Submission', schema)

module.exports = SubmissionModel
