import * as types from '../../../src/util/actionTypes'
import { getStudentSubmissions, createSubmissionAction } from '../../../src/util/actions/submission'
import { testAction } from '../../testUtils'

let input

input = [
  { url: 'https://test.test' },
  { url: 'https://other.test' }
]
testAction(getStudentSubmissions, {
  input,
  expectation: {
    type: types.SUBMISSION_STUDENT_GET_ALL,
    submissions: input
  }
})

input = { url: 'https://test.test' }
testAction(createSubmissionAction, {
  input,
  expectation: {
    type: types.SUBMISSION_CREATE,
    submission: input
  }
})
