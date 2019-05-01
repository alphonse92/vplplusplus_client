import { Actions } from './actions'
import { getReducerMap } from './';

const stateDefault = {
	loading: false
}

export const reducerMap = getReducerMap(Actions)
export function REDUCER(state = stateDefault, action) {
	const { type } = action
	const reducerForAction = reducerMap[type]
	const isValidReducer = reducerForAction && typeof reducerForAction === 'function'
	return isValidReducer
		? reducerForAction(state, action)
		: state
}
