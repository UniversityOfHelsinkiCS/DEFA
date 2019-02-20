import React from 'react'
import { SubmissionSearchResultComponent } from '../../../src/components/SubmissionSearch/SubmissionSearchResult'
import CardContainer from '../../../src/components/Student/CardContainer'
import { findText } from '../../testUtils'

SubmissionSearchResultComponent.propTypes = {}

const submissions = [
  {
    id: '0',
    url: 'https://test.test',
    user: {
      name: 'Test User',
      studentNumber: '012345678'
    }
  },
  {
    id: '1',
    url: 'https://test2.test',
    user: {
      name: 'Test User 2',
      studentNumber: '012345679'
    }
  }
]

describe('SubmissionSearchResult component', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<SubmissionSearchResultComponent
      classes={{}}
      submissions={submissions}
    />)
  })

  it('renders a CardComponent for each submission.', () => {
    expect(wrapper.find(CardContainer).length).toEqual(submissions.length)
  })
  it('shows submission user info in card title', () => {
    const submissionCards = wrapper.find(CardContainer)
    submissionCards.forEach((card, index) => {
      const { user } = submissions[index]
      expect(card.prop('title').includes(user.name)).toEqual(true)
      expect(card.prop('title').includes(user.studentNumber)).toEqual(true)
    })
  })
  it('shows submission info in card content.', () => {
    const submissionCards = wrapper.find(CardContainer)
    submissionCards.forEach((card, index) => {
      const { url } = submissions[index]
      expect(findText(url, card)).toBeGreaterThan(0)
    })
  })
})
