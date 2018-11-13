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


class Login extends PureComponent {
  componentDidMount() {
    const { location, dispatchParseUser, token } = this.props
    const queryParams = parseQueryParams(location).query_params
    if (queryParams.token) {
      window.localStorage.setItem('DEFA-token', queryParams.token)
    } else {
      // toast error
    }
    const storageToken = window.localStorage.getItem('DEFA-token')
    if (storageToken) {
      if (storageToken !== token) { dispatchParseUser(storageToken) }
    }
    if (queryParams.redirect) {
      const { history } = this.props
      history.push(new URL(queryParams.redirect).pathname)
    }
  }

  render() {
    const { user } = this.props
    const url = process.env.MODE === 'development' ? 'http://localhost:7000' : `${process.env.DS_URL}?entityID=${process.env.ENTITY_ID}&return=${process.env.LOGIN_URL}`
    if (!user) {
      return (
        <Button href={url} style={{ background: primary.light }}>Login</Button>
      )
    }
    return (
      <div>
        <Typography variant="subtitle1">{user.attributes.cn}</Typography>
      </div>
    )
  }
}

Login.propTypes = {
  location: shape({
    search: string.isRequired
  }).isRequired,
  user: userProp,
  dispatchParseUser: func.isRequired,
  token: string,
  history: shape({
    push: func.isRequired
  }).isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
