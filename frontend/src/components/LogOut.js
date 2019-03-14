import React, { PureComponent } from 'react'
import { bool, func } from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { logout } from '../util/actions/user'
import { primary } from '../common/colors'
import withLocalize from '../util/tieredLocalize'

class LogOut extends PureComponent {
  handleLogout = () => {
    const { dispatchLogout } = this.props
    dispatchLogout({ displayToast: true })
  }

  render() {
    const { loggedIn, translate } = this.props
    return (
      <nav>
        {loggedIn ? (
          <Button
            style={{
              background: primary.light,
              marginLeft: '12px'
            }}
            onClick={() => this.handleLogout()}
          >
            {translate('log_out')}
          </Button>
        ) : null}
      </nav>
    )
  }
}

LogOut.propTypes = {
  loggedIn: bool.isRequired,
  dispatchLogout: func.isRequired,
  translate: func.isRequired
}

const mapStateToProps = state => ({
  loggedIn: state.user.user !== null
})

const mapDispatchToProps = {
  dispatchLogout: logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withLocalize('LogOut')(LogOut)
)
