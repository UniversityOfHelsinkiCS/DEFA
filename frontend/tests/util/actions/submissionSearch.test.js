import * as types from '../../../src/util/actionTypes'
import {
  changeInput,
  submitSearchAttempt,
  submitSearchSuccess,
  approveSubmissionSuccess
} from '../../../src/util/actions/submissionSearch'
import { testAction } from '../../testUtils'

let input

input = {
  name: 'naaaaaame'
}
testAction(changeInput, {
  input,
  expectation: {
    type: types.SEARCH_SUBMISSION_CHANGE_INPUT,
    values: input
  }
})

input = {}
testAction(submitSearchAttempt, {
  input,
  expectation: {
    type: types.SEARCH_SUBMISSION_SUBMIT_ATTEMPT
  }
})

input = [{}, { field: 'value' }]
testAction(submitSearchSuccess, {
  input,
  expectation: {
    type: types.SEARCH_SUBMISSION_SUBMIT_SUCCESS,
    data: input
  }
})

input = {
  id: 'aaaaa',
  approval: 'APPROVED'
}
testAction(approveSubmissionSuccess, {
  input,
  expectation: {
    type: types.SEARCH_SUBMISSION_APPROVE_SUBMISSION_SUCCESS,
    submission: input
  }
})
