import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Login from './Login'
import LogOut from './LogOut'
import { parseClasses } from '../../util/propTypes'

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
          <Typography variant="h6" color="inherit" className={classes.grow}>
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
  classes: parseClasses(styles).isRequired
}

export default withStyles(styles)(NavBar)
