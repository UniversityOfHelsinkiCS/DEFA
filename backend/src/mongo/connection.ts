import mongoose from 'mongoose'

export const connect = () => mongoose.connect(`mongodb://${process.env.DATABASE_URI}`)
