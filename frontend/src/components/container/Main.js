import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import Login from './Login'

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route component={null} />
    </Switch>
  </main>
)

export default withRouter(Main)
