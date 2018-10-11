import express from 'express'
import bodyParser from 'body-parser'
import { noParseRoutes, bodyParseRoutes } from './routes'

const app: express.Express = express()

noParseRoutes(app)

app.use(bodyParser.urlencoded({
  extended: true
}))

bodyParseRoutes(app)

export default app
