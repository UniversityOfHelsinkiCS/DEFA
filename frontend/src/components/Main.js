import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { userProp } from '../util/propTypes'
import 'react-toastify/dist/ReactToastify.css'
import Credits from './Credits'
import NavBar from './NavBar'
import Welcome from './Welcome'
import UploadCreditsContainer from './UploadCredits/UploadCreditsContainer'
import StudentContainer from './Student/StudentContainer'
import TeacherContainer from './Teacher/TeacherContainer'
import ProtectedRoute from '../util/ProtectedRoute'
import SubmissionSearchPage from './SubmissionSearch/SubmissionSearchPage'
import AdminPage from './Admin/AdminPage'


class Main extends React.PureComponent {
  render() {
    const { user } = this.props
    const userRole = user ? user.role : null
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
          <ProtectedRoute requiredRole={['ADMIN', 'PRIVILEGED']} exact path="/upload-credits" component={UploadCreditsContainer} />
          <ProtectedRoute requiredRole={['ADMIN', 'PRIVILEGED']} exact path="/my-uploads" component={TeacherContainer} />
          <ProtectedRoute requiredRole={['ADMIN', 'PRIVILEGED', 'STUDENT']} exact path="/student" component={StudentContainer} />
          <Route exact path="/" component={Welcome} />
          <ProtectedRoute requiredRole={['ADMIN']} userRole={userRole} exact path="/admin" component={Credits} />
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
