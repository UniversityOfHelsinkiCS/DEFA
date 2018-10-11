import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { getHello } from '../../util/redux/reducer'
import Main from './Main'

const palette = {
  primary: { main: '#4DD0E1' },
  secondary: { main: '#B2DFDB' }
}

const themeName = 'Turquoise Blue Aqua Island Gayal'

const theme = createMuiTheme({ palette, themeName, typography: { useNextVariants: true } })

const { func } = PropTypes

const App = ({ getHelloFn }) => {
  getHelloFn()

  return (
    <MuiThemeProvider theme={theme}>
      <Main />
    </MuiThemeProvider>
  )
}


App.propTypes = {
  getHelloFn: func.isRequired
}

const mapDispatchToProps = dispatch => ({
  getHelloFn: () => dispatch(getHello())
})

export default connect(null, mapDispatchToProps)(App)
