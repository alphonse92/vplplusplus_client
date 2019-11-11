import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import ReduxThunk from 'redux-thunk'

import { getReducer } from './rootReducer'
import { UserService } from '../services/user';

const history = createBrowserHistory({
	basename: window.__env__.PUBLIC_URL,
})

const rootReducer = getReducer(history)
const initialState = {
	user: UserService.getUserLogged()
}
const enhancers = []
const middleware = [
	ReduxThunk,
	routerMiddleware(history)
]

let composeEnhancers = compose
if (window.__env__.NODE_ENV === 'development') {
	composeEnhancers =
		typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
			: compose
}

const composedEnhancers = composeEnhancers(applyMiddleware(...middleware), ...enhancers)
const store = createStore(rootReducer, initialState, composedEnhancers)

export { history, store }
