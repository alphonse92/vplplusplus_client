import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { UserRedux } from './user'

import { LibRedux } from './../lib/redux/store'
import { ProjectRedux } from '../app/dashboard/laboratory/project/redux';

console.log(ProjectRedux)
export const getReducer = history => combineReducers({
	router: connectRouter(history),
	lib: LibRedux.REDUCER,
	user: UserRedux.REDUCER,
	...ProjectRedux.REDUCER
})
