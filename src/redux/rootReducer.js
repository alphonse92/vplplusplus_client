import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { UserRedux } from './user'

export const getReducer = history => combineReducers({
  router: connectRouter(history),
  user: UserRedux.REDUCER
})
