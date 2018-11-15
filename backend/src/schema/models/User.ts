import { Schema, model, Document, Model } from 'mongoose'

interface Iidentifier {
  id: string,
  student_number: string,
  university: string
}

export interface IUserModel extends Document {
  name: string,
  role: string,
  identifiers: Iidentifier[]
}

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

const UserModel: Model<Document> = model('User', schema)

export default UserModel
