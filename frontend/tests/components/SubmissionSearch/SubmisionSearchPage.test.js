import React from 'react'
import { SubmissionSearchPageComponent, HEADER_TEXT } from '../../../src/components/SubmissionSearch/SubmissionSearchPage'
import SubmissionSearchForm from '../../../src/components/SubmissionSearch/SubmissionSearchForm'
import SubmissionSearchResult from '../../../src/components/SubmissionSearch/SubmissionSearchResult'
import { findText } from '../../testUtils'

SubmissionSearchPageComponent.propTypes = {}

describe('SubmissionSearchPage component', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<SubmissionSearchPageComponent
      classes={{}}
    />)
  })

  it('renders the header text.', () => {
    expect(findText(HEADER_TEXT, wrapper)).toBeGreaterThan(0)
  })
  it('renders a SubmissionSearchForm.', () => {
    expect(wrapper.find(SubmissionSearchForm).exists()).toEqual(true)
  })
  it('renders a SubmissionSearchResult.', () => {
    expect(wrapper.find(SubmissionSearchResult).exists()).toEqual(true)
  })
})
