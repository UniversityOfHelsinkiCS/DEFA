import { Schema, model, Document, Model } from 'mongoose'

const schema: Schema = new Schema({
  name: String
})

export const DummyModel: Model<Document> = model('Dummy', schema)
