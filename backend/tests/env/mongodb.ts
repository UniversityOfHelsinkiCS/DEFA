import mongoose from 'mongoose'
import MongoMemoryServer from 'mongodb-memory-server'
import { MongoError } from 'mongodb'

const testConnect = async () => {
  const mongoServer = new MongoMemoryServer()
  const mongoUri = await mongoServer.getConnectionString()
  await mongoose.connect(mongoUri, { useNewUrlParser: true }, (err: MongoError) => {
    if (err) {
      console.error(err)
    }
  })
}

export default testConnect
