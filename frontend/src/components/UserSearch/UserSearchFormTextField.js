import React, { PureComponent } from 'react'
import { func, string } from 'prop-types'
import { TextField } from '@material-ui/core'

export class UserSearchFormTextFieldComponent extends PureComponent {
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

UserSearchFormTextFieldComponent.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  dispatchChangeInput: func.isRequired
}

export const mapDispatchToPropsBuilder = changeInput => ({
  dispatchChangeInput: changeInput
})

export default UserSearchFormTextFieldComponent
