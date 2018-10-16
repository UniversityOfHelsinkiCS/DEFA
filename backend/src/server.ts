import app from './app'
import { connect } from './mongo/connection'

connect()

const port: number = 3000

app.listen(port, () => console.log(`App listening on port ${port}`))
