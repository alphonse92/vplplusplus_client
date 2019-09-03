
import { Actions } from './actions'
import { getReducerMap, createReducer } from '../../../../../lib/redux'
import { DEFAULTS } from './paths'
export const reducerMap = getReducerMap(Actions)
export const REDUCER = createReducer(reducerMap)(DEFAULTS)
