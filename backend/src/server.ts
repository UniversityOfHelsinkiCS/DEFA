import express from 'express'
import dotenv from 'dotenv'
import { DefaultController, GraphQLController } from './controllers'
import { connect } from './mongo/connection'

dotenv.config()

const app = express()

const port: number = 3000

app.use('/api', DefaultController)

// Right now only one route for GraphQL.
// More routes will be defined when privileges become an issue.
app.use('/query', GraphQLController)

connect()

app.listen(port, () => console.log(`App listening on port ${port}`))
