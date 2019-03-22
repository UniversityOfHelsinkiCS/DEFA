const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    en: String,
    fi: String,
    sv: String
  },
  required: {
    type: Boolean,
    default: false
  }
})

const SubmissionModel = mongoose.model('DEFACourse', schema)

module.exports = SubmissionModel
