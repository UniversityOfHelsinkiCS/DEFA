import express from 'express'
import bodyParser from 'body-parser'
import { connect } from './mongo/connection'
import routes from './routes'

const app: express.Express = express()

app.use(bodyParser.urlencoded({
  extended: true
}))

routes(app)

connect()

export default app
