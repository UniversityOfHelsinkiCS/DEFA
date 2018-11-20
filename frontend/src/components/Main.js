import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Credits from './Credits'
import NavBar from './NavBar'
import Welcome from './Welcome'
import UploadCreditsContainer from './UploadCredits/UploadCreditsContainer'

const Main = () => (
  <main>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
    />
    <NavBar />
    <Switch>
      <Route exact path="/upload-credits" component={UploadCreditsContainer} />
      <Route exact path="/student" />
      <Route exact path="/" component={Welcome} />
      <Route exact path="/admin" component={Credits} />
    </Switch>
  </main>
)

export default withRouter(Main)
