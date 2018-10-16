import React from 'react'
import { Table, TableHead } from '@material-ui/core'
import { CreditsPreviewComponent } from '../../../src/components/UploadCredits/CreditsPreview'
import CreditsPreviewRow from '../../../src/components/UploadCredits/CreditsPreviewRow'
import { findText } from '../../testUtils'
import headers from '../../../src/components/UploadCredits/helpers/creditHeaders'

CreditsPreviewComponent.propTypes = {}

const credits = [{}, {}]

describe('CreditsPreview component', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<CreditsPreviewComponent
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

  it('renders a CreditsPreviewRow for each credit.', () => {
    expect(wrapper.find(CreditsPreviewRow).length).toEqual(credits.length)
  })
})
