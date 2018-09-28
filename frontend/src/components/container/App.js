import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getHello } from '../../util/redux/reducer'
import Main from './Main'

const { func } = PropTypes

const App = ({ getHelloFn }) => {
  getHelloFn()
  return (
    <div>
      <h1>
        Defa on valmis
      </h1>
      <Main />
    </div>
  )
}


App.propTypes = {
  getHelloFn: func.isRequired
}

const mapDispatchToProps = dispatch => ({
  getHelloFn: () => dispatch(getHello())
})

export default connect(null, mapDispatchToProps)(App)
