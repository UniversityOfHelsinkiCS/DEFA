import React from 'react'
import { FormControlLabel } from '@material-ui/core'
import { FileInputComponent } from '../../../src/components/UploadCredits/FileInput'

FileInputComponent.propTypes = {}

describe('FileInput component', () => {
  const changeValue = jest.fn()
  let input
  beforeEach(() => {
    changeValue.mockReset()
    const wrapper = shallow(<FileInputComponent
      changeValue={changeValue}
      classes={{}}
    />)
    input = shallow(wrapper.find(FormControlLabel).prop('control'))
  })

  it('renders a csv file input.', () => {
    expect(input.prop('type')).toEqual('file')
    expect(input.prop('accept')).toMatch(/\.csv/)
  })

  it('calls changeValue prop on change with uploaded file.', () => {
    expect(input.prop('onChange')).toBeInstanceOf(Function)
    const event = {
      target: {
        value: '',
        files: [{ totally_a_file_object: true }]
      }
    }
    expect(changeValue).not.toHaveBeenCalled()
    input.prop('onChange')(event)
    expect(changeValue).toHaveBeenCalledWith(event.target.files[0])
  })
})
