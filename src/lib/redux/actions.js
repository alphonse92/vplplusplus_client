import { extractActionCreators } from './'

const _actions_ = {}

export const LOADING_ACTION_NAME = '@mv/loading'
_actions_[LOADING_ACTION_NAME] = {
	DISPATCHER: () => true,
	ACTIONS: {
		default: {
			name: LOADING_ACTION_NAME,
			reducer: (state, action) => ({ ...state, loading: !!action.payload })
		}
	},
}

export const ActionCreators = extractActionCreators(_actions_)
export const Actions = _actions_