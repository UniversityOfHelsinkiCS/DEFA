import { toast } from 'react-toastify'
import * as types from '../actionTypes'

const MUTATION_ON_COMPLETED_MESSAGE = 'Credits uploaded successfully.'

export const changeDelimiter = value => dispatch => dispatch({
  type: types.UPLOAD_CREDITS_CHANGE_DELIMITER,
  value
})

export const changeFile = value => dispatch => dispatch({
  type: types.UPLOAD_CREDITS_CHANGE_FILE,
  value
})

export const changeCredits = value => dispatch => dispatch({
  type: types.UPLOAD_CREDITS_CHANGE_CREDITS,
  value
})

export const mutationOnCompleted = () => dispatch => dispatch({
  type: types.TOAST,
  toast: {
    message: MUTATION_ON_COMPLETED_MESSAGE,
    options: {
      type: toast.TYPE.SUCCESS
    }
  }
})
