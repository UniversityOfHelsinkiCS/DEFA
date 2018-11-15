
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './util/store'
import App from './components/App'

try {
  Raven.config('https://ad0a23a76e3540d9980dc9115fd2f89d@toska.cs.helsinki.fi/11').install() // eslint-disable-line
} catch (e) {} // eslint-disable-line

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

if (module.hot) {
  module.hot.accept()
}
