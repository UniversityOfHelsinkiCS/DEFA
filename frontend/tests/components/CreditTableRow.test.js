import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import CreditTableRow from '../../src/components/CreditTableRow'
import { findText } from '../testUtils'
import { headers } from '../../src/components/CreditTable'

CreditTableRow.propTypes = {}

const credit = headers.reduce(
  (acc, curr) => ({ ...acc, [curr.key]: 'test' }),
  {}
)
credit.grade = 5
credit.study_credits = 10

describe('CreditTableRow component', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<CreditTableRow
      credit={credit}
      headers={headers}
    />)
  })

  it('renders a TableRow.', () => {
    expect(wrapper.find(TableRow).length).toEqual(1)
  })
  it('renders a TableCell for each header.', () => {
    expect(wrapper.find(TableCell).length).toEqual(Object.keys(headers).length)
  })
  it('renders all values of credit.', () => {
    Object.values(credit).forEach(
      value => expect(findText(String(value), wrapper)).toBeGreaterThan(0)
    )
  })
})
