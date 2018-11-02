import express from 'express'
import routes from './routes'
import cors from 'cors'
import tokenAuth from './middleware/token_authorization'
import applyBodyParser from './middleware/body_parser'

const app: express.Express = express()

app.use(cors())

app.use(tokenAuth)

applyBodyParser(app)

routes(app)

export default app
