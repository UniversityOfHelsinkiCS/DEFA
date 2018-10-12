import express from 'express'
import bodyParser from 'body-parser'
import { noParseRoutes, bodyParseRoutes } from './routes'
import cors from 'cors'

const app: express.Express = express()

app.use(cors())

noParseRoutes(app)

app.use(bodyParser.urlencoded({
  extended: true
}))

bodyParseRoutes(app)

export default app
