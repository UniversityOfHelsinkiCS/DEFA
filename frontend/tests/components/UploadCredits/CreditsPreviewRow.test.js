import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import CreditsPreviewRow from '../../../src/components/UploadCredits/CreditsPreviewRow'
import { findText } from '../../testUtils'

CreditsPreviewRow.propTypes = {}

const credit = {
  opiskelijanumero: '11123456',
  kurssikoodi: 'TKT00000.2018.K.K.1',
  'pvm (vvvv-kk-pp)': '2018-0+-25',
  'laajuus (op)': '5',
  arvosana: '4',
  suorituskieli: 'suomi',
  'opettajan henkilötunnus': '010190-1337',
  'yliopiston nimi': 'Helsingin yliopisto'
}

describe('CreditsPreviewRow component', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<CreditsPreviewRow
      credit={credit}
      headers={Object.keys(credit)}
    />)
  })

  it('renders a TableRow.', () => {
    expect(wrapper.find(TableRow).length).toEqual(1)
  })
  it('renders a TableCell for each header.', () => {
    expect(wrapper.find(TableCell).length).toEqual(Object.keys(credit).length)
  })
  it('renders all values of credit.', () => {
    Object.values(credit).forEach(
      value => expect(findText(value, wrapper)).toBeGreaterThan(0)
    )
  })

  describe('when credit is missing fields', () => {
    const removedField = 'suorituskieli'

    beforeAll(() => {
      wrapper = shallow(<CreditsPreviewRow
        credit={{ ...credit, [removedField]: undefined }}
        headers={Object.keys(credit)}
      />)
    })

    it('still renders a TableCell for each header.', () => {
      expect(wrapper.find(TableCell).length).toEqual(Object.keys(credit).length)
    })
    it('Does not render the values of missing fields.', () => {
      expect(findText(credit[removedField], wrapper)).toEqual(0)
    })
  })
})
