import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { SubmissionSearchQueryComponent } from '../../../src/components/SubmissionSearch/SubmissionSearchQuery'

SubmissionSearchQueryComponent.propTypes = {}

describe('SubmissionSearchForm component', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<SubmissionSearchQueryComponent
      classes={{}}
    />)
  })

  it('renders an ApolloConsumer.', () => {
    expect(wrapper.find(ApolloConsumer).exists()).toEqual(true)
  })
  // TODO: more specific tests
})
