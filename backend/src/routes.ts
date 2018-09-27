import { Express } from 'express'
import * as controllers from './controllers'

type Iroutes = (app: Express) => void

const routes: Iroutes = (app: Express) => {
  app.use('/api', controllers.DefaultController)
  app.use('/query', controllers.GraphQLController)
}

export default routes
