import { Schema, model, Document, Model } from 'mongoose'

const schema: Schema = new Schema({
  name: String,
  role: String,
  identifiers: [
    {
      id: String,
      student_number: String,
      university: String
    }
  ]
})

export const UserModel: Model<Document> = model('User', schema)