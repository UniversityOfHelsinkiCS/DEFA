import callBuilder from '../apiConnection'

export const submitCredits = credits => dispatch => dispatch(callBuilder('/credits/submit', 'CREDITS_SUBMIT', credits, 'post'))

export const changeDelimiter = value => dispatch => dispatch({
  type: 'CREDITS_CHANGE_DELIMITER',
  value
})

export const changeFile = value => dispatch => dispatch({
  type: 'CREDITS_CHANGE_FILE',
  value
})

export const changeCredits = value => dispatch => dispatch({
  type: 'CREDITS_CHANGE_CREDITS',
  value
})
