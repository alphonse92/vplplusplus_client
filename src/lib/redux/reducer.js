import { Actions } from './actions'
import { getReducerMap, createReducer } from './index'
export const reducerMap = getReducerMap(Actions)
export const REDUCER = createReducer(reducerMap)({ loading: false })