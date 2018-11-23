import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import pollReducer from './poll/pollReducer'
import voteReducer from './vote/voteReducer'
import web3Reducer from './util/web3/web3Reducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
	poll: pollReducer,
	vote: voteReducer,
  web3: web3Reducer
})

export default reducer
