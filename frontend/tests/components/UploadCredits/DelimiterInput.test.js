import React from 'react'
import { FormControlLabel } from '@material-ui/core'
import { DelimiterInputComponent } from '../../../src/components/UploadCredits/DelimiterInput'

DelimiterInputComponent.propTypes = {}

describe('DelimiterInput component', () => {
  const changeValue = jest.fn()
  let input
  beforeAll(() => {
    changeValue.mockReset()
    const wrapper = shallow(<DelimiterInputComponent
      changeValue={changeValue}
      value="value"
      classes={{}}
    />)
    input = shallow(wrapper.find(FormControlLabel).prop('control'))
  })

  it('renders a text input.', () => {
    expect(input.prop('type')).toEqual('text')
  })
  it('calls changeValue prop on change with input value.', () => {
    const event = {
      target: {
        value: 'new value'
      }
    }
    expect(changeValue).not.toHaveBeenCalled()
    input.prop('onChange')(event)
    expect(changeValue).toHaveBeenCalledWith(event.target.value)
  })
})
