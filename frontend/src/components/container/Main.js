import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './NavBar'
import Credits from './Credits'

const Main = () => (
  <main>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
    />
    <NavBar />
    <Switch>
      <Route exact path="/credits" component={Credits} />
      <Route component={null} />
    </Switch>
  </main>
)

export default withRouter(Main)
