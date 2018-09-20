import express from 'express'
import { DefaultController, GraphQLController } from './controllers'
import bodyParser from 'body-parser'

const app = express()

const port: number = 3000

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())
app.use('/api', DefaultController)

// Right now only one route for GraphQL.
// More routes will be defined when privileges become an issue.
app.use('/query', GraphQLController)

app.listen(port, () => console.log(`App listening on port ${port}`))
