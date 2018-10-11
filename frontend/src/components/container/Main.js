import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './NavBar'
import Welcome from '../Welcome'
import UploadCredits from './UploadCredits'

const Main = () => (
  <main>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
    />
    <NavBar />
    <Switch>
      <Route exact path="/upload-credits" component={UploadCredits} />
      <Route component={Welcome} />
    </Switch>
  </main>
)

export default withRouter(Main)
