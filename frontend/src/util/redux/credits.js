const INITIAL_STATE = {
  delimiter: '',
  file: null,
  credits: []
}

const creditsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CREDITS_RESET':
      return {
        ...INITIAL_STATE,
        delimiter: state.delimiter
      }
    case 'CREDITS_CHANGE_DELIMITER':
      return {
        ...state,
        delimiter: action.value
      }
    case 'CREDITS_CHANGE_FILE':
      return {
        ...state,
        file: action.value
      }
    case 'CREDITS_CHANGE_CREDITS':
      return {
        ...state,
        credits: action.value
      }
    default:
      return state
  }
}

export default creditsReducer
