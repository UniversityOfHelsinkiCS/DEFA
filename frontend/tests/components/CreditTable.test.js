import React from 'react'
import { Table, TableHead } from '@material-ui/core'
import { CreditTableComponent, headers } from '../../src/components/CreditTable'
import CreditTableRow from '../../src/components/CreditTableRow'
import { findText } from '../testUtils'

CreditTableComponent.propTypes = {}

const credits = [{}, {}]

describe('CreditTable component', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<CreditTableComponent
      credits={credits}
    />)
  })

  it('renders a Table.', () => {
    expect(wrapper.find(Table).exists()).toEqual(true)
  })
  it('renders all headers in a TableHead.', () => {
    const head = wrapper.find(TableHead)
    expect(head.exists()).toEqual(true)
    headers.forEach(
      header => expect(findText(header.display, head)).toBeGreaterThan(0)
    )
  })

  it('renders a row for each credit.', () => {
    expect(wrapper.find(CreditTableRow).length).toEqual(credits.length)
  })
})
