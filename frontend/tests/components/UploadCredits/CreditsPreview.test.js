import React from 'react'
import { Table, TableHead } from '@material-ui/core'
import { CreditsPreviewComponent } from '../../../src/components/UploadCredits/CreditsPreview'
import CreditsPreviewRow from '../../../src/components/UploadCredits/CreditsPreviewRow'
import { findText } from '../../testUtils'

CreditsPreviewComponent.propTypes = {}

const headers = [
  'opiskelijanumero',
  'kurssikoodi',
  'pvm (vvvv-kk-pp)',
  'laajuus (op)',
  'arvosana',
  'suorituskieli',
  'opettajan henkilötunnus',
  'yliopiston nimi'
]

const credits = [{}, {}]

describe('CreditsPreview component', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<CreditsPreviewComponent
      headers={headers}
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
      header => expect(findText(header, head)).toBeGreaterThan(0)
    )
  })

  it('renders a CreditsPreviewRow for each credit.', () => {
    expect(wrapper.find(CreditsPreviewRow).length).toEqual(credits.length)
  })
})
