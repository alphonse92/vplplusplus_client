import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { UserRedux } from './user'
import { LibRedux } from './../lib/redux/store'
export const getReducer = history => combineReducers({
	router: connectRouter(history),
	lib: LibRedux.REDUCER,
	user: UserRedux.REDUCER
})
