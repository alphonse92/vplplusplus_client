import { extractActionCreators } from '../../lib'

const Actions = {}

const SET_ERROR_NAME = 'SET_ERROR'
Actions[SET_ERROR_NAME] = {
	DISPATCHER: (payload) => (dispatcher, getStore) => {
		dispatcher({ type: Actions[SET_ERROR_NAME].ACTIONS.default.name, payload })
	},
	ACTIONS: {
		default: {
			name: SET_ERROR_NAME,
			reducer: (state, { payload }) => {
				return { ...state, error: payload }
			}
		}
	},

}

const CLEAR_ERROR_NAME = 'CLEAR_ERROR'
Actions[CLEAR_ERROR_NAME] = {
	DISPATCHER: (payload) => (dispatcher) => dispatcher({ type: Actions[CLEAR_ERROR_NAME].ACTIONS.default.name, payload }),
	ACTIONS: {
		default: {
			name: CLEAR_ERROR_NAME,
			reducer: (state) => { return { ...state, error: undefined } }
		}
	},

}

const ActionCreators = extractActionCreators(Actions)
export { Actions, ActionCreators }