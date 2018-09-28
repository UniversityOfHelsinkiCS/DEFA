import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import parseQueryParams from '../../util/parseQueryParams'

class Login extends PureComponent {
  componentDidMount() {
    const { location } = this.props
    const queryParams = parseQueryParams(location).query_params
    if (queryParams.token) {
      window.localStorage.setItem('DEFA-token', queryParams.token)
    }
  }

  render() {
    return (
      <div>
        <a href="http://127.0.0.1:3000/api?redirect_url=http://localhost:8080/login">Kirjaudu sisään</a>
      </div>
    )
  }
}

Login.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired
}

export default withRouter(Login)
