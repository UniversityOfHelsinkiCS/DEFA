import * as actions from '../../../src/util/actions/uploadCredits'
import * as types from '../../../src/util/actionTypes'
import { testAction, testApiConnectionAction } from '../../testUtils'

let input

input = [{ totally_a_credit_object: true }]
testApiConnectionAction(actions.submitCredits, input)

input = ';'
testAction(actions.changeDelimiter, {
  input,
  expectation: {
    type: types.UPLOAD_CREDITS_CHANGE_DELIMITER,
    value: input
  }
})

input = { totally_a_file_object: true }
testAction(actions.changeFile, {
  input,
  expectation: {
    type: types.UPLOAD_CREDITS_CHANGE_FILE,
    value: input
  }
})

input = [{ totally_a_credit_object: true }]
testAction(actions.changeCredits, {
  input,
  expectation: {
    type: types.UPLOAD_CREDITS_CHANGE_CREDITS,
    value: input
  }
})
