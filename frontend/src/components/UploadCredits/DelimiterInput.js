import React, { Component } from 'react'
import { string, func } from 'prop-types'
import { connect } from 'react-redux'
import { changeDelimiter } from '../../util/actions/credits'

class DelimiterInput extends Component {
  handleChange = event => {
    const { changeValue } = this.props
    changeValue(event.target.value)
  }

  render() {
    const { value } = this.props
    return (
      <div>
        <input
          type="text"
          name="delimiter"
          value={value}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

DelimiterInput.propTypes = {
  value: string.isRequired,
  changeValue: func.isRequired
}

const mapStateToProps = state => ({
  value: state.credits.delimiter
})

const mapDispatchToProps = {
  changeValue: changeDelimiter
}

export default connect(mapStateToProps, mapDispatchToProps)(DelimiterInput)
