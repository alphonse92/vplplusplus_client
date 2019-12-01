import { extractActionCreators } from "../../../lib"

const Actions = {}

const SET_LANG_NAME = 'SET_LANG'
Actions[SET_LANG_NAME] = {
	DISPATCHER: (lang) => (dispatcher) => dispatcher({ type: Actions[SET_LANG_NAME].ACTIONS.default.name, payload: lang }),
	ACTIONS: {
		default: {
			name: SET_LANG_NAME,
			reducer: (state, action) => {
				state.lang = action.payload
				return state
			}
		}
	},

}

const ActionCreators = extractActionCreators(Actions)
export { Actions, ActionCreators }