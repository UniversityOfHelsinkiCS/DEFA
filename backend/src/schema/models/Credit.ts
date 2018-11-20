import { Schema, model, Document, Model } from 'mongoose'

export interface ICreditModel extends Document {
  student_number: string,
  course_name?: string,
  course_code: string,
  date?: string,
  study_credits: number,
  grade: number,
  language?: string,
  university: string,
  teacher: string
}

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
