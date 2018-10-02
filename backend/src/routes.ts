import { Express } from 'express'
import * as controllers from './controllers'

type Iroutes = (app: Express) => void

const routes: Iroutes = (app: Express) => {
  app.use('/api/login', controllers.LoginController)
  app.use('/api/query', controllers.GraphQLController)
}

export default routes
