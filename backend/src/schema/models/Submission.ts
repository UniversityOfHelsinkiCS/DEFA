import { Schema, model, Document, Model } from 'mongoose'

const schema: Schema = new Schema({
  url: String,
  date: Date,
  user: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
})

const SubmissionModel: Model<Document> = model('Submission', schema)

export default SubmissionModel
