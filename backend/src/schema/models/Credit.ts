import { Schema, model, Document, Model } from 'mongoose'

const schema: Schema = new Schema({
  student_number: String,
  course_name: String,
  course_code: String,
  date: String,
  study_credits: Number,
  grade: Number,
  language: String,
  university: String,
  teacher: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
})

const CreditModel: Model<Document> = model('Credit', schema)

export default CreditModel
