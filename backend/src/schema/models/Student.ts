import { Schema, model, Document, Model } from 'mongoose'

const schema: Schema = new Schema({
  name: String,
  university: String,
  studentNumber: String
})

export const StudentModel: Model<Document> = model('Student', schema)
