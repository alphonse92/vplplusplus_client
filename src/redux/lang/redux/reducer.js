
import { Actions } from './actions'
import { DEFAULTS } from './paths'
import { getReducerMap, createReducer } from '../../../lib'
export const reducerMap = getReducerMap(Actions)
export const REDUCER = createReducer(reducerMap)(DEFAULTS)
