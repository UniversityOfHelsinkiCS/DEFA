import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import Login from './Login'
import NavBar from './NavBar'
import LogOut from './LogOut'

const Main = () => (
  <main>
    <NavBar />
    <LogOut />
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route component={null} />
    </Switch>
  </main>
)

export default withRouter(Main)
