import React, { PureComponent } from 'react'
import { shape, string, func } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import parseQueryParams from '../util/parseQueryParams'
import { parseUser } from '../util/actions/user'
import { primary } from '../common/colors'
import { userProp } from '../util/propTypes'
import withLocalize from '../util/tieredLocalize'


class Login extends PureComponent {
  componentDidMount() {
    const { location, dispatchParseUser, token } = this.props
    const queryParams = parseQueryParams(location).query_params
    if (queryParams.token) {
      window.localStorage.setItem('DEFA-token', queryParams.token)
    }
    const storageToken = window.localStorage.getItem('DEFA-token')
    if (storageToken) {
      if (storageToken !== token) { dispatchParseUser(storageToken) }
    }
    this.redirect()
  }

  redirect = () => {
    const { history, location } = this.props
    const path = window.localStorage.getItem('DEFA-redirect')
    if (path) {
      window.localStorage.removeItem('DEFA-redirect')
      if (location.pathname === '/login') {
        history.push(path)
      }
    }
  }

  prepareRedirect = () => {
    const { location } = this.props
    window.localStorage.setItem('DEFA-redirect', location.pathname)
  }

  render() {
    const { user, translate } = this.props
    const url = process.env.MODE === 'development' ? 'http://localhost:7000' : `${process.env.DS_URL}?entityID=${process.env.ENTITY_ID}&return=${process.env.LOGIN_URL}`
    if (!user) {
      return (
        <Button
          href={url}
          style={{ background: primary.light }}
          onClick={this.prepareRedirect}
        >
          {translate('log_in')}
        </Button>
      )
    }
    return (
      <div>
        <Typography variant="subtitle1">{user.name}</Typography>
      </div>
    )
  }
}

Login.propTypes = {
  location: shape({
    search: string.isRequired,
    pathname: string.isRequired
  }).isRequired,
  user: userProp,
  dispatchParseUser: func.isRequired,
  token: string,
  history: shape({
    push: func.isRequired
  }).isRequired,
  translate: func.isRequired
}

Login.defaultProps = {
  user: null,
  token: null
}

const mapStateToProps = state => ({
  user: state.user.user,
  token: state.user.token
})

const mapDispatchToProps = {
  dispatchParseUser: parseUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(
  withLocalize('Login')(Login)
))
