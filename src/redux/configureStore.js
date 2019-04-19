import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import ReduxThunk from 'redux-thunk'

import { getReducer } from './rootReducer'
// import { logoutByExpiration } from './middlewares'



const history = createBrowserHistory({
	basename: process.env.PUBLIC_URL,
})

const rootReducer = getReducer(history)
const initialState = {}
const enhancers = []
const middleware = [
	ReduxThunk,
	routerMiddleware(history)
]

let composeEnhancers = compose
if (process.env.NODE_ENV === 'development') {
	composeEnhancers =
		typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
			: compose
}

const composedEnhancers = composeEnhancers(applyMiddleware(...middleware), ...enhancers)
const store = createStore(rootReducer, initialState, composedEnhancers)

export { history, store }
