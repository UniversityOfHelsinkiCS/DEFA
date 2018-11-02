import { Express } from 'express'
import bodyParser from 'body-parser'

const applyBodyParser = (app: Express): void => {
  app.use(bodyParser.json({
    type: 'application/json'
  }))
  app.use(bodyParser.text({
    type: 'application/graphql'
  }))
  app.use(bodyParser.urlencoded({
    extended: true
  }))
}

export default applyBodyParser
