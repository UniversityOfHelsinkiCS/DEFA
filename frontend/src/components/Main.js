import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { string, shape } from 'prop-types'
import { Query } from 'react-apollo'
import { refreshToken } from '../util/queries/refreshToken'
import { userProp } from '../util/propTypes'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './NavBar'
import Welcome from './Welcome'
import StudentPage from './Student/StudentPage'
import ProtectedRoute from '../util/ProtectedRoute'
import SubmissionSearchPage from './SubmissionSearch/SubmissionSearchPage'
import AdminPage from './Admin/AdminPage'

class Main extends React.PureComponent {
  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { user, token } = this.props.user
    return (
      <main>
        {user ? (
          <Query
            query={refreshToken}
            variables={{ token, id: user.id }}
            pollInterval={300000}
          >
            {({ data, stopPolling }) => {
              if (!user) stopPolling()
              if (!data || !data.authenticate) return null // refactor to bubble error
              window.localStorage.setItem('DEFA-token', data.authenticate.refreshToken)
              return null
            }}
          </Query>
        )
          : null}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
        />
        <NavBar user={user} />
        <Switch>
          <ProtectedRoute requiredRole={['ADMIN']} exact path="/admin" component={AdminPage} />
          <ProtectedRoute requiredRole={['ADMIN', 'PRIVILEGED']} exact path="/submissions" component={SubmissionSearchPage} />
          <ProtectedRoute requiredRole={['ADMIN', 'PRIVILEGED', 'STUDENT']} exact path="/student" component={StudentPage} />
          <Route exact path="/" component={Welcome} />
        </Switch>
      </main>

    )
  }
}
const mapStateToProps = state => ({
  user: state.user
})

Main.defaultProps = {
  user: { user: null, token: null }
}

Main.propTypes = {
  user: shape({ token: string, user: userProp })
}

export default withRouter(connect(mapStateToProps, null)(Main))
