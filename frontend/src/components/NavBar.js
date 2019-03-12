import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Select,
  MenuItem
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { shape, func } from 'prop-types'
import { userProp, parseClasses } from '../util/propTypes'
import { getLanguage, saveLanguage } from '../util/language'
import Login from './Login'
import LogOut from './LogOut'
import withLocalize from '../util/tieredLocalize'

const styles = {
  root: {
    display: 'flex'
  },
  grow: {
    flexGrow: 1
  },
  lastButton: {
    marginRight: '5px'
  },
  homeHeader: {
    cursor: 'pointer'
  },
  languageContainer: {
    marginLeft: '30px'
  }
}

const NavBar = ({ classes, history, user, setActiveLanguage, translate }) => {
  const getRoutes = role => (
    <React.Fragment>
      {role === 'ADMIN' ? <Button color="inherit" onClick={() => history.push('/admin')}>{translate('admin')}</Button> : null}
      {role === 'ADMIN' || role === 'PRIVILEGED' ? <Button color="inherit" onClick={() => history.push('/submissions')}>{translate('submissions')}</Button> : null}
      <Button className={classes.lastButton} onClick={() => history.push('/student')}>{translate('student')}</Button>
    </React.Fragment>
  )

  const changeLanguage = ({ target }) => {
    const { value } = target
    setActiveLanguage(value)
    saveLanguage(value)
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div className={`${classes.grow} ${classes.root}`}>
            <Typography className={classes.homeHeader} variant="h6" color="inherit" onClick={() => history.push('/')}>
              DEFA
            </Typography>
            <div>
              <Select
                className={classes.languageContainer}
                value={getLanguage() || 'eng'}
                autoWidth
                onChange={changeLanguage}
              >
                <MenuItem value="eng">English</MenuItem>
                <MenuItem value="fin">suomi</MenuItem>
              </Select>
            </div>
            <div className={classes.grow} />
          </div>
          {user ? getRoutes(user.role) : null}
          <Login />
          <LogOut />
        </Toolbar>
      </AppBar>
    </div>
  )
}

NavBar.defaultProps = {
  user: null
}

NavBar.propTypes = {
  classes: parseClasses(styles).isRequired,
  history: shape({
    push: func.isRequired
  }).isRequired,
  user: userProp,
  setActiveLanguage: func.isRequired,
  translate: func.isRequired
}

export default withLocalize('NavBar')(
  withRouter(
    withStyles(styles)(NavBar)
  )
)
