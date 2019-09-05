import { extractActionCreators } from '../../lib'
import { createRequestActions } from '../../lib/redux'
import { requestDispatcher } from '../../lib/request'
import { UserService } from '../../services/user'
import { MvAuthLogin } from '../../lib/components/auth';

const Service = new UserService()
const Actions = {}

const SET_USER_LOGGED_NAME = 'SET_USER_LOGGED'
Actions[SET_USER_LOGGED_NAME] = {
	DISPATCHER: (data) => (dispatch, getStore) => UserService.saveUserLogged(data),
	ACTIONS: {
		default: {
			name: SET_USER_LOGGED_NAME,
			reducer: (state, action) => ({ ...action.payload })
		}
	},
}

const LOGOUT_NAME = 'LOGOUT'
Actions[LOGOUT_NAME] = {
	DISPATCHER: () => async (dispatcher, getStore) => {
		await MvAuthLogin.logout()
		UserService.saveUserLogged(null)
		const dispatch = { type: SET_USER_LOGGED_NAME, payload: undefined }
		dispatcher(dispatch)
	},
	ACTIONS: {
		default: {
			name: LOGOUT_NAME,
			reducer: (state, action) => ({ ...state })
		}
	},
}

const LOGIN_NAME = 'LOGIN'
Actions[LOGIN_NAME] = {
	DISPATCHER: (data, onLogin) => {
		const actions = Actions[LOGIN_NAME].ACTIONS
		return dispatcher => {
			const after = (payload) => {
				const type = Actions[SET_USER_LOGGED_NAME].ACTIONS.default.name
				const dispatch = { type, payload }
				dispatcher(dispatch)
				onLogin(data)
			}
			const getRequest = () => Service.login(data)
			requestDispatcher(dispatcher, actions, getRequest, { after })
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