import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import CreditsPreviewRow from '../../../src/components/UploadCredits/CreditsPreviewRow'
import { findText } from '../../testUtils'
import headers from '../../../src/components/UploadCredits/helpers/creditHeaders'

CreditsPreviewRow.propTypes = {}

const credit = headers.reduce(
  (acc, curr) => ({ ...acc, [curr.key]: 'test' }),
  {}
)
credit.grade = 5
credit.study_credits = 10

describe('CreditsPreviewRow component', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<CreditsPreviewRow
      credit={credit}
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
