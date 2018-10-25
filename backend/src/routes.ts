import { Express, RequestHandler } from 'express'
import * as controllers from './controllers'

const BASE_PATH = '/api'
type Iroutes = (app: Express) => void
interface IRouteMap {
  [key: string]: RequestHandler
}

const useRoutes = (app: Express, routeMap: IRouteMap): void => {
  Object.keys(routeMap).forEach((key: string) => {
    app.use(`${BASE_PATH}${key}`, routeMap[key])
  })
}

export const noParseRoutes: Iroutes = (app: Express): void => useRoutes(app, {
  '/query': controllers.GraphQLController
})

export const bodyParseRoutes: Iroutes = (app: Express): void => useRoutes(app, {
  '/login': controllers.LoginController
})
