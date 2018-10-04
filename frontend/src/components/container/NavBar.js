import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Login from './Login'
import LogOut from './LogOut'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
}

const NavBar = props => {
  const { classes } = props

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.grow}>
            DEFA
          </Typography>
          <Login />
          <LogOut />
        </Toolbar>
      </AppBar>
    </div>
  )
}
NavBar.propTypes = {
  classes: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
}

export default withStyles(styles)(NavBar)
