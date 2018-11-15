import express from 'express'
import routes from './routes'
import cors from 'cors'
import tokenAuth from './middleware/token_authorization'
import applyBodyParser from './middleware/body_parser'
import graphiqlUser from './middleware/graphiql_user'

const app: express.Express = express()

app.use(cors())

app.use(tokenAuth)

if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode.')
  app.use(graphiqlUser) // Gives admin privileges to graphiql queries. Absolutely do not use in production.
}

applyBodyParser(app)

routes(app)

export default app
