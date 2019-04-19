import { extractActionCreators } from '../../lib'
import { createRequestActions } from '../../lib/redux'
import { requestDispatcher } from '../../lib/request'
import { UserService } from '../../services/user'

const Service = new UserService()
const Actions = {}

const SET_USER_LOGGED_NAME = 'SET_USER_LOGGED'
Actions[SET_USER_LOGGED_NAME] = {
	DISPATCHER: (data) => {
		return dispatch => Service.storeUserData(data)
			&& dispatch({
				type: Actions[SET_USER_LOGGED_NAME].ACTIONS.default.name,
				payload: data
			})
	},
	ACTIONS: {
		default: {
			name: SET_USER_LOGGED_NAME,
			reducer: (state, action) => ({ ...action.payload })
		}
	},
}

const LOGIN_NAME = 'LOGIN'
Actions[LOGIN_NAME] = {
	DISPATCHER: (data) => {
		const actions = Actions[LOGIN_NAME].ACTIONS
		return dispatch => {
			const after = (payload) => {
				if (!payload.ok) return
				const type = Actions[SET_USER_LOGGED_NAME].ACTIONS.default.name
				dispatch({ type, payload: payload.data, })
			}
			const getRequest = () => Service.login(data)
			requestDispatcher(dispatch, actions, getRequest, { after })
		}
	},
	ACTIONS: createRequestActions(LOGIN_NAME, {
		// SET_USER_LOGGED will handle the state.user data
		fullfilled: (state, action) => {
			return state
		},
		rejected: (state, action) => {
			return state
		}
	}),
}



const ActionCreators = extractActionCreators(Actions)
export { Actions, ActionCreators }