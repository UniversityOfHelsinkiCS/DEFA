import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import parseQueryParams from '../../util/parseQueryParams'
import { parseUser } from '../../util/actions/user'

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
  }

  render() {
    const { user } = this.props
    const url = `${process.env.API_URL}/login?redirect_url=${process.env.REDIRECT_URL}`
    if (!user) {
      return (
        <Button href={url} color="inherit">Login</Button>
      )
    }
    return (
      <div>
        <Typography variant="subheading">{user.name_id}</Typography>
      </div>
    )
  }
}

Login.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired,
  user: PropTypes.shape({
    name_id: PropTypes.string.isRequired
  }),
  dispatchParseUser: PropTypes.func.isRequired,
  token: PropTypes.string
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
