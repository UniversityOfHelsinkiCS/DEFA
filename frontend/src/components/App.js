import React from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'
import { LocalizeProvider } from 'react-localize-redux'
import ApolloContainer from './ApolloContainer'
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

const App = () => (
  <MuiThemeProvider theme={theme}>
    <ApolloContainer>
      <BrowserRouter>
        <LocalizeProvider>
          <Main />
        </LocalizeProvider>
      </BrowserRouter>
    </ApolloContainer>
  </MuiThemeProvider>
)

export default App
