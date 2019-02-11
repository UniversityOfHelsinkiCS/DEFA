import React from 'react'
import {
  StudentSubmissionComponent,
  AddSubmissionText,
  EditSubmissionText
} from '../../../src/components/Student/StudentSubmission'
import { findText } from '../../testUtils'

StudentSubmissionComponent.propTypes = {}

const submission = {
  url: 'https://defa.cs.helsinki.fi'
}

describe('StudentInformation component', () => {
  let wrapper
  describe('When a submission has not been submitted', () => {
    beforeAll(() => {
      wrapper = mount(<StudentSubmissionComponent
        submission={null}
      />)
    })
    afterAll(() => {
      wrapper.unmount()
    })

    it('Displays "Add submission" when no submission', () => {
      expect(findText(AddSubmissionText, wrapper)).toBeGreaterThan(0)
    })
  })

  describe('When a submission has been submitted', () => {
    beforeAll(() => {
      wrapper = mount(<StudentSubmissionComponent
        submission={submission}
      />)
    })
    afterAll(() => {
      wrapper.unmount()
    })

    it('Displays "Edit submission"', () => {
      expect(findText(EditSubmissionText, wrapper)).toBeGreaterThan(0)
    })

    it('Renders the submission link', () => {
      expect(findText(submission.url, wrapper)).toBeGreaterThan(0)
    })
  })
})
