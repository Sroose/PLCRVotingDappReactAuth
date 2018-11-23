const initialState = {
  data: null
}

const pollReducer = (state = initialState, action) => {
  if (action.type === 'POLL_CREATED' || action.type === 'POLL_UPDATED')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default pollReducer
