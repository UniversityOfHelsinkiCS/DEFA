import express from 'express'
import { connect } from './mongo/connection'
import routes from './routes'

const app: express.Express = express()

routes(app)

connect()

export default app
