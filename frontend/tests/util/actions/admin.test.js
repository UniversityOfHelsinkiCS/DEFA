import * as types from '../../../src/util/actionTypes'
import {
  changeInput,
  submitSearchAttempt,
  submitSearchSuccess,
  editUserAttempt,
  editUserSuccess
} from '../../../src/util/actions/admin'
import { testAction } from '../../testUtils'

let input

input = {
  studentNumber: '01'
}
testAction(changeInput, {
  input,
  expectation: {
    type: types.SEARCH_USER_CHANGE_INPUT,
    values: input
  }
})

input = null
testAction(submitSearchAttempt, {
  input,
  expectation: {
    type: types.SEARCH_USER_SUBMIT_ATTEMPT
  }
})

input = [
  { field: 'value' },
  { field: 'other value' }
]
testAction(submitSearchSuccess, {
  input,
  expectation: {
    type: types.SEARCH_USER_SUBMIT_SUCCESS,
    data: input
  }
})

input = null
testAction(editUserAttempt, {
  input,
  expectation: {
    type: types.USER_EDIT_ATTEMPT
  }
})

input = {
  field: 'value'
}
testAction(editUserSuccess, {
  input,
  expectation: {
    type: types.USER_EDIT_SUCCESS,
    data: input
  }
})
