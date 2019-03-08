import React from 'react'
import {
  StudentSubmissionComponent
} from '../../../src/components/Student/StudentSubmission'
import { findText } from '../../testUtils'

StudentSubmissionComponent.propTypes = {}

const submission = {
  url: 'https://defa.cs.helsinki.fi',
  date: (new Date()).toISOString(),
  approval: 'APPROVED',
  comment: 'Filled with filler text...'
}

describe('StudentInformation component', () => {
  let wrapper

  describe('when a submission has been submitted', () => {
    beforeAll(() => {
      wrapper = shallow(<StudentSubmissionComponent
        submission={submission}
        classes={{}}
      />)
    })
    afterAll(() => {
      wrapper.unmount()
    })

    it('Renders the submission link', () => {
      expect(findText(submission.url, wrapper)).toBeGreaterThan(0)
    })

    it('Renders the submission approval status.', () => {
      expect(findText(submission.approval, wrapper)).toBeGreaterThan(0)
    })

    it('renders the comment.', () => {
      expect(findText(submission.comment, wrapper)).toBeGreaterThan(0)
    })
  })
})
