import { toast } from 'react-toastify'
import * as actions from '../../../src/util/actions/uploadCredits'
import * as types from '../../../src/util/actionTypes'
import { testAction } from '../../testUtils'

let input

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

testAction(actions.mutationOnError, {
  expectation: {
    type: types.TOAST,
    toast: {
      message: expect.any(String),
      options: {
        type: toast.TYPE.ERROR
      }
    }
  }
})

testAction(actions.mutationOnCompleted, {
  expectation: {
    type: types.TOAST,
    toast: {
      message: expect.any(String),
      options: {
        type: toast.TYPE.SUCCESS
      }
    }
  }
})
