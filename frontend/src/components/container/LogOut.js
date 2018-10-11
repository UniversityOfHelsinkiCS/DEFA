import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { logout } from '../../util/actions/user'

class LogOut extends PureComponent {
  handleLogout = () => {
    const { dispatchLogout } = this.props
    dispatchLogout()
  }

  render() {
    const { loggedIn } = this.props
    return (
      <nav>
        {loggedIn ? (
          <Button
            color="inherit"
            onClick={() => this.handleLogout()}
          >
            Log out
          </Button>
        ) : null}
      </nav>
    )
  }
}

LogOut.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  dispatchLogout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  loggedIn: state.user.user !== null
})

const mapDispatchToProps = {
  dispatchLogout: logout
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut)
