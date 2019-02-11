const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const testConnect = async () => {
  const mongoServer = new MongoMemoryServer()
  const mongoUri = await mongoServer.getConnectionString()
  await mongoose.connect(mongoUri, { useNewUrlParser: true }, (err) => {
    if (err) {
      console.error(err)
    }
  })
}

module.exports = testConnect
