import React from 'react'
import {
  StudentSubmissionComponent
} from '../../../src/components/Student/StudentSubmission'
import { findText } from '../../testUtils'
import parseDate from '../../../src/util/parseDate'

StudentSubmissionComponent.propTypes = {}

const submission = {
  url: 'https://defa.cs.helsinki.fi',
  date: (new Date()).toISOString(),
  approval: 'APPROVED'
}

describe('StudentInformation component', () => {
  let wrapper

  describe('When a submission has been submitted', () => {
    beforeAll(() => {
      wrapper = mount(<StudentSubmissionComponent
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

    it('Renders the submission date.', () => {
      expect(findText(parseDate(submission.date), wrapper)).toBeGreaterThan(0)
    })
  })
})
