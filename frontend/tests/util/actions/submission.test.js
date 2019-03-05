import * as types from '../../../src/util/actionTypes'
import { getStudent, createSubmissionAction } from '../../../src/util/actions/submission'
import { testAction } from '../../testUtils'

let input

input = {
  email: 'first.last@email.com',
  submissions: [
    { url: 'https://test.test' },
    { url: 'https://other.test' }
  ]
}
testAction(getStudent, {
  input,
  expectation: {
    type: types.STUDENT_GET_ME,
    user: input
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
