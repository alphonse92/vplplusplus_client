import { Actions } from './actions'
import { getReducerMap, createReducer } from '../../../../../lib/redux'

export const STATE_DEFAULT = {
	dialogs: {
		create: {
			show: false
		}
	}
}

export const reducerMap = getReducerMap(Actions)
export const REDUCER = createReducer(reducerMap)(STATE_DEFAULT)
