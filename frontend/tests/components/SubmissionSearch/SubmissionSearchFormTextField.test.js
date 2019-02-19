import React from 'react'
import { TextField } from '@material-ui/core'
import { SubmissionSearchFormTextFieldComponent } from '../../../src/components/SubmissionSearch/SubmissionSearchFormTextField'

SubmissionSearchFormTextFieldComponent.propTypes = {}

const label = 'Label'
const name = 'name'

describe('SubmissionSearchFormTextField component', () => {
  let wrapper
  const dispatchChangeInput = jest.fn()

  beforeAll(() => {
    wrapper = shallow(<SubmissionSearchFormTextFieldComponent
      classes={{}}
      label={label}
      name={name}
      dispatchChangeInput={dispatchChangeInput}
    />)
  })
  afterEach(() => {
    dispatchChangeInput.mockClear()
  })
  describe('TextField', () => {
    let textField

    beforeAll(() => {
      textField = wrapper.find(TextField)
    })

    it('has label and name props.', () => {
      expect(textField.prop('label')).toEqual(label)
      expect(textField.prop('name')).toEqual(name)
    })

    it('calls dispatchChangeInput prop on change.', () => {
      const onChange = textField.prop('onChange')
      expect(dispatchChangeInput).not.toHaveBeenCalled()
      const value = 'val'
      onChange({
        target: { value }
      })
      expect(dispatchChangeInput).toHaveBeenCalledWith({
        [name]: value
      })
    })
  })
})
