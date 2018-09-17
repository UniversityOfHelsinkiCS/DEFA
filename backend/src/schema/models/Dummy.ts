import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: String
})

export const DummyModel = model('Dummy', schema)
