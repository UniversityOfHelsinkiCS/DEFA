import express from 'express'
import routes from './routes'
import cors from 'cors'
import applyBodyParser from './middleware/body_parser'

const app: express.Express = express()

app.use(cors())

applyBodyParser(app)

routes(app)

export default app
