import { Actions } from './actions'
import { getReducerMap, createReducer } from '../../lib/redux'
export const reducerMap = getReducerMap(Actions)
export const REDUCER = createReducer(reducerMap)({
  error: undefined,
  warning: undefined,
  info: undefined
})
