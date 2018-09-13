const express = require('express')   
import { DefaultController, GraphQLController } from './controllers'


const app = express()

const port: number = 3000

app.use('/api', DefaultController)

app.use('/query', GraphQLController)

app.listen(port, () => console.log(`App listening on port ${port}`))