import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import parseQueryParams from '../../util/parseQueryParams'
import { parseUser } from '../../util/actions/user'

class Login extends PureComponent {
  componentDidMount() {
    const { location, dispatchParseUser } = this.props
    const queryParams = parseQueryParams(location).query_params
    if (queryParams.token) {
      window.localStorage.setItem('DEFA-token', queryParams.token)
      dispatchParseUser()
    }
  }

  render() {
    const { user } = this.props
    if (!user) {
      return (
        <div>
          <a href="http://127.0.0.1:3000/api/login?redirect_url=http://localhost:8080/login">Kirjaudu sisään</a>
        </div>
      )
    }
    return (
      <div>
        <h2>Olet kirjautunut sisään.</h2>
        <p>{user.name_id}</p>
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
  dispatchParseUser: PropTypes.func.isRequired
}

Login.defaultProps = {
  user: null
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = {
  dispatchParseUser: parseUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
