const app = require('./app')
const { connect } = require('./mongo/connection')

connect()

const port = 3001

app.listen({ port }).then(() => console.log(`App listening on port ${port}`))
