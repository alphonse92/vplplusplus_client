import {
	get
	, set
	, isUndefined
} from 'lodash'
import { extractActionCreators } from '../../../../../lib'

import {
	PROJECT as PROJECT_PATHS
} from './paths';

const Actions = {}

const TOGGLE_CREATE_PROJECT_DIALOG_NAME = 'TOGGLE_CREATE_PROJECT_DIALOG'
Actions[TOGGLE_CREATE_PROJECT_DIALOG_NAME] = {
	DISPATCHER: (show) =>
		(dispatcher, getStore) => {
			console.log({ type: TOGGLE_CREATE_PROJECT_DIALOG_NAME, payload: show })
			dispatcher({ type: TOGGLE_CREATE_PROJECT_DIALOG_NAME, payload: show })
		},
	ACTIONS: {
		default: {
			name: TOGGLE_CREATE_PROJECT_DIALOG_NAME,
			reducer: (state, action) => {
				const data = get(state, PROJECT_PATHS.dialogs.create.data)
				const currentVisibility = get(state, PROJECT_PATHS.dialogs.create.show)
				const show = isUndefined(action.payload)
					? !currentVisibility
					: !!action.payload
				const newState = { ...state }
				set(newState, PROJECT_PATHS.dialogs.create.data, data)
				set(newState, PROJECT_PATHS.dialogs.create.show, show)
				console.log({ newState, action })
				return newState
			}
		}
	}
}
const ActionCreators = extractActionCreators(Actions)
export { Actions, ActionCreators }