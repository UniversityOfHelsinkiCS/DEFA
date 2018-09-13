import React from 'react'
import { connect } from 'react-redux'

import { getHello } from '../../util/redux/reducer'

const App = (props) => {
  props.getHello()
  return (
    <div>
      <h1>Defa on valmis 
      </h1>
    </div>
)}


const mapDispatchToProps = dispatch => ({
  getHello: () => dispatch(getHello())
})

export default connect(null, mapDispatchToProps)(App)

