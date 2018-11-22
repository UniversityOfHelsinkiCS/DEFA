import { Express, RequestHandler } from 'express'
import { IRouteMap } from './utils/typescript'
import * as controllers from './controllers'

const BASE_PATH = '/api'

const useRoutes = (app: Express, routeMap: IRouteMap): void => {
  Object.keys(routeMap).forEach((key: string) => {
    app.use(`${BASE_PATH}${key}`, routeMap[key])
  })
}

const routes = (app: Express): void => useRoutes(app, {
  '/login': controllers.LoginController,
  '/query': controllers.GraphQLController
})

export default routes
