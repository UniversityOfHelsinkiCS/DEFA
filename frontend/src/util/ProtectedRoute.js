import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { parseUser, loginError } from './actions/user'

export class ProtectedRouteComponent extends React.PureComponent {
  async componentDidMount() {
    const storageToken = window.localStorage.getItem('DEFA-token')
    const { dispatchErrorToast, dispatchParseUser, user } = this.props

    if (!storageToken && !user) {
      dispatchErrorToast('Log in to view the page')
    }

    if (storageToken && !user) {
      await dispatchParseUser(storageToken)
    }
  }

  render() {
    const { requiredRole, user, ...props } = this.props

    if (!user) {
      return null
    }
    const { role } = user
    if (!role) {
      return (
        <Redirect to="/" />
      )
    }
    return (
      requiredRole.includes(role)
        ? <Route {...props} />
        : <Redirect to="/" />
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = {
  dispatchParseUser: parseUser,
  dispatchErrorToast: loginError
}
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRouteComponent)
