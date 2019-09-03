import { extractActionCreators } from './'

const _Actions = {}

export const LOADING_ACTION_NAME = '@mv/loading'
_Actions[LOADING_ACTION_NAME] = {
	DISPATCHER: (isLoading) => (dispatcher, getStore) => {
		dispatcher({ type: _Actions[LOADING_ACTION_NAME].ACTIONS.default.name, payload: isLoading })
	},
	ACTIONS: {
		default: {
			name: LOADING_ACTION_NAME,
			reducer: (state, action) => {
				return { ...state, loading: !!action.payload }
			}
		}
	},
}

export const ActionCreators = extractActionCreators(_Actions)
export const Actions = _Actions