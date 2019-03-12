import React from 'react'
import { SubmissionSearchPageComponent } from '../../../src/components/SubmissionSearch/SubmissionSearchPage'
import SubmissionSearchForm from '../../../src/components/SubmissionSearch/SubmissionSearchForm'
import SubmissionSearchQuery from '../../../src/components/SubmissionSearch/SubmissionSearchQuery'
import { findText } from '../../testUtils'

SubmissionSearchPageComponent.propTypes = {}

describe('SubmissionSearchPage component', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<SubmissionSearchPageComponent
      classes={{}}
      translate={id => id}
    />)
  })

  it('renders the header text.', () => {
    expect(findText('page_header', wrapper)).toBeGreaterThan(0)
  })
  it('renders a SubmissionSearchForm.', () => {
    expect(wrapper.find(SubmissionSearchForm).exists()).toEqual(true)
  })
  it('renders a SubmissionSearchQuery.', () => {
    expect(wrapper.find(SubmissionSearchQuery).exists()).toEqual(true)
  })
})
