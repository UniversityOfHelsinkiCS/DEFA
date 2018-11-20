import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { userProp } from '../util/propTypes'


import Login from './Login'
import LogOut from './LogOut'
import { parseClasses } from '../util/propTypes'

const { object } = PropTypes

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  lastButton: {
    marginRight: '5px'
  }
}

const NavBar = ({ classes, history, user }) => {
  const getRoutes = role => (
    <div>
      {role === 'ADMIN' || role === 'PRIVILEGED' ? <Button color="inherit" onClick={() => history.push('/upload-credits')}>Upload Credits</Button> : null}
      {role === 'ADMIN' ? <Button onClick={() => history.push('/admin')}>All credits (ADMIN)</Button> : null}
      <Button className={classes.lastButton} onClick={() => history.push('/')}>My Credits</Button>
    </div>
  )

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow} onClick={() => history.push('/')}>
            DEFA
          </Typography>
          {user.user ? getRoutes(user.user.role) : null}
          <Login />
          <LogOut />
        </Toolbar>
      </AppBar>
    </div>
  )
}

NavBar.propTypes = {
  classes: parseClasses(styles).isRequired,
  history: object.isRequired, // eslint-disable-line react/forbid-prop-types,
  user: userProp.isRequired
}

export default withRouter(withStyles(styles)(NavBar))
