import React from 'react'
import { SubmissionSearchResultComponent } from '../../../src/components/SubmissionSearch/SubmissionSearchResult'
import CardContainer from '../../../src/components/Student/CardContainer'
import { findText } from '../../testUtils'

SubmissionSearchResultComponent.propTypes = {}

const users = [
  {
    id: '01',
    name: 'Test User',
    studentNumber: '012345678',
    submissions: [
      {
        id: '0',
        url: 'https://test.test'
      }
    ]
  },
  {
    id: '02',
    name: 'Test User 2',
    studentNumber: '012345679',
    submissions: [
      {
        id: '1',
        url: 'https://test2.test'
      },
      {
        id: '2',
        url: 'https://test3.test'
      }
    ]
  }
]

describe('SubmissionSearchResult component', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<SubmissionSearchResultComponent
      classes={{}}
      users={users}
    />)
  })

  it('renders a CardComponent for each user.', () => {
    expect(wrapper.find(CardContainer).length).toEqual(users.length)
  })
  it('shows user info in card title', () => {
    const userCards = wrapper.find(CardContainer)
    userCards.forEach((card, index) => {
      const user = users[index]
      expect(card.prop('title').includes(user.name)).toEqual(true)
      expect(card.prop('title').includes(user.studentNumber)).toEqual(true)
    })
  })
  it('shows submission info in card content.', () => {
    const userCards = wrapper.find(CardContainer)
    userCards.forEach((card, index) => {
      const { submissions } = users[index]
      submissions.forEach(submission => {
        expect(findText(submission.url, card)).toBeGreaterThan(0)
      })
    })
  })
})
