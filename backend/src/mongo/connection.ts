import mongoose, { ConnectionOptions } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const options: ConnectionOptions = {
  useNewUrlParser: true,
  authSource: 'admin',
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASS,
  dbName: process.env.DATABASE_NAME
}
export const connect: () => Promise<typeof mongoose> = (
  () => mongoose.connect(`mongodb://${process.env.DATABASE_URI}`, options)
)
