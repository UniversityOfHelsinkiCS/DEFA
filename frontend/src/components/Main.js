import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { userProp } from '../util/propTypes'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './NavBar'
import Welcome from './Welcome'
import StudentContainer from './Student/StudentContainer'
import ProtectedRoute from '../util/ProtectedRoute'
import SubmissionSearchPage from './SubmissionSearch/SubmissionSearchPage'
import AdminPage from './Admin/AdminPage'

class Main extends React.PureComponent {
  tokenRefresher = () => {
    const intervalId = setInterval(() => {
      const { user } = this.props
      console.log('insert refresh request here, set interval to 15min', user)
      if (!user) clearInterval(intervalId)
    }, 5000)
  }

  render() {
    const { user } = this.props
    if (user) {
      this.tokenRefresher()
    }
    return (
      <main>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
        />
        <NavBar user={user} />
        <Switch>
          <ProtectedRoute requiredRole={['ADMIN']} exact path="/admin" component={AdminPage} />
          <ProtectedRoute requiredRole={['ADMIN', 'PRIVILEGED']} exact path="/submissions" component={SubmissionSearchPage} />
          <ProtectedRoute requiredRole={['ADMIN', 'PRIVILEGED', 'STUDENT']} exact path="/student" component={StudentContainer} />
          <Route exact path="/" component={Welcome} />
        </Switch>
      </main>

    )
  }
}
const mapStateToProps = state => ({
  user: state.user.user
})

Main.defaultProps = {
  user: null
}

Main.propTypes = {
  user: userProp
}

export default withRouter(connect(mapStateToProps, null)(Main))
