const initialState = {
  data: null
}

const voteReducer = (state = initialState, action) => {
	console.log('VOTE ACTION TYPE: ' + action.type)
	console.log('STATE')
	console.log(state)
  if (action.type === 'VOTE_CREATED' || action.type === 'VOTE_UPDATED')
  {
	  console.log(action)
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default voteReducer
