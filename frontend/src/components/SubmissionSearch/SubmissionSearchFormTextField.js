import React, { PureComponent } from 'react'
import { func, string } from 'prop-types'
import { connect } from 'react-redux'
import { TextField } from '@material-ui/core'
import { changeInput } from '../../util/actions/submissionSearch'

export class SubmissionSearchFormTextFieldComponent extends PureComponent {
  onFieldChange = event => {
    const { name, dispatchChangeInput } = this.props
    dispatchChangeInput({
      [name]: event.target.value
    })
  }

  render() {
    const { label, name } = this.props
    return (
      <TextField
        label={label}
        name={name}
        onChange={this.onFieldChange}
        variant="outlined"
      />
    )
  }
}

SubmissionSearchFormTextFieldComponent.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  dispatchChangeInput: func.isRequired
}

const mapStateToProps = ({ submissionSearch }) => ({
  inputs: submissionSearch.inputs
})

const mapDispatchToProps = {
  dispatchChangeInput: changeInput
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionSearchFormTextFieldComponent)
