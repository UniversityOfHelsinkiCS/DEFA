import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { getHello } from '../../util/redux/reducer'
import Main from './Main'

const palette = {
  primary: {
    main: '#4DD0E1',
    light: '#88ffff',
    dark: '#009faf'
  },
  secondary: {
    main: '#FFB74D',
    light: '##ffe97d',
    dark: '#c88719'
  }
}
const themeName = 'Turquoise Blue Texas Rose Bandicoot'

const theme = createMuiTheme({ palette, themeName, typography: { useNextVariants: true } })

const client = new ApolloClient({ uri: `${process.env.API_URL}/query` })

const App = ({ getHelloFn }) => {
  getHelloFn()

  return (
    <MuiThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Main />
      </ApolloProvider>
    </MuiThemeProvider>
  )
}

const { func } = PropTypes

App.propTypes = {
  getHelloFn: func.isRequired
}

const mapDispatchToProps = dispatch => ({
  getHelloFn: () => dispatch(getHello())
})

export default connect(null, mapDispatchToProps)(App)
