import React from 'react'
import Papa from 'papaparse'
import { CreditsInputComponent } from '../../../src/components/UploadCredits/CreditsInput'

CreditsInputComponent.propTypes = {}

const csvFile = { totally_a_csv: true }
const delimiter = ';'

describe('CreditsInput component', () => {
  let wrapper
  let changeValue
  let realParse
  let parse

  beforeEach(() => {
    parse = jest.fn()
    const testParse = (file, options) => {
      parse(file, options)
      options.complete({
        data: [],
        meta: {}
      })
    }
    changeValue = jest.fn()
    realParse = Papa.parse
    Papa.parse = testParse
    wrapper = shallow(<CreditsInputComponent
      delimiter={delimiter}
      csvFile={csvFile}
      classes={{}}
      changeValue={changeValue}
    />)
  })
  afterAll(() => {
    Papa.parse = realParse
  })

  it('renders a button.', () => {
    const button = wrapper.find('[onClick]')
    expect(button.exists()).toEqual(true)
    expect(button.prop('onClick')).toBeInstanceOf(Function)
  })
  it('calls changeValue when button is clicked.', () => {
    const button = wrapper.find('[onClick]')
    expect(changeValue).not.toHaveBeenCalled()
    button.prop('onClick')()
    expect(changeValue).toHaveBeenCalled()
  })
  it('The csvFile prop is parsed using the delimiter prop.', () => {
    const button = wrapper.find('[onClick]')
    expect(parse).not.toHaveBeenCalled()
    button.prop('onClick')()
    expect(parse).toHaveBeenCalledWith(csvFile, expect.objectContaining({
      delimiter
    }))
  })
})
