import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../util/actions/user'

class Nav extends PureComponent {
  logoutButton = (
    <button
      type="button"
      onClick={() => this.handleLogout()}
    >
      Kirjaudu ulos
    </button>
  )

  handleLogout = () => {
    console.log('AAAA')
    const { dispatchLogout } = this.props
    dispatchLogout()
  }

  render() {
    const { loggedIn } = this.props
    return (
      <nav>
        <span>DEFA on valmis!</span>
        {loggedIn ? this.logoutButton : null}
      </nav>
    )
  }
}

Nav.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  dispatchLogout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  loggedIn: state.user.user !== null
})

const mapDispatchToProps = {
  dispatchLogout: logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
