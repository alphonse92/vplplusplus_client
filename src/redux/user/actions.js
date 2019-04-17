import { extractActionCreators } from '../../lib'
import { createRequestActions } from '../../lib/redux'
import { requestDispatcher } from '../../lib/request'
import { UserService } from '../../services/user'

const Actions = {}
const LOGIN_NAME = 'LOGIN'
Actions[LOGIN_NAME] = {
	DISPATCHER: (data) => {
		return dispatch => requestDispatcher(
			dispatch,
			Actions[LOGIN_NAME].ACTIONS,
			UserService.login(data)
		)
	},
	ACTIONS: createRequestActions(LOGIN_NAME, {
		fullfilled: (state, action) => ({ ...state, user: action.payload })
	}),
}

const SET_USER_LOGGED_NAME = 'SET_USER_LOGGED'
Actions[SET_USER_LOGGED_NAME] = {
	DISPATCHER: (user_data) => {
		return dispatch => UserService.storeUserData(user_data)
			&& dispatch({
				type: Actions[SET_USER_LOGGED_NAME].ACTIONS.default.name,
				payload: user_data
			})
	},
	ACTIONS: {
		default: {
			name: SET_USER_LOGGED_NAME,
			reducer: (state, action) => ({ ...state, user: action.payload })
		}
	},
}

const ActionCreators = extractActionCreators(Actions)
export { Actions, ActionCreators }