import React, { Component } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import { changeFile } from '../../util/actions/credits'

class FileInput extends Component {
  handleChange = event => {
    const { changeValue } = this.props
    changeValue(event.target.files[0])
  }

  render() {
    return (
      <div>
        <input
          type="file"
          name="credits"
          accept=".csv"
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

FileInput.propTypes = {
  changeValue: func.isRequired
}

const mapDispatchToProps = {
  changeValue: changeFile
}

export default connect(null, mapDispatchToProps)(FileInput)
