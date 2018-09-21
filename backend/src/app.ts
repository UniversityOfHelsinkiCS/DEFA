import express from 'express'
import { DefaultController, GraphQLController } from './controllers'
import { connect } from './mongo/connection'

const app: express.Express = express()

app.use('/api', DefaultController)

// Right now only one route for GraphQL.
// More routes will be defined when privileges become an issue.
app.use('/query', GraphQLController)

connect()

export default app
