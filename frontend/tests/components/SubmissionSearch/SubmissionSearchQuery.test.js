import React from 'react'
import { Query } from 'react-apollo'
import { SubmissionSearchQueryComponent } from '../../../src/components/SubmissionSearch/SubmissionSearchQuery'

SubmissionSearchQueryComponent.propTypes = {}

describe('SubmissionSearchForm component', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<SubmissionSearchQueryComponent
      classes={{}}
    />)
  })

  it('renders a Query component.', () => {
    expect(wrapper.find(Query).exists()).toEqual(true)
  })
  // TODO: more specific tests
})
