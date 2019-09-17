import { extractActionCreators, requestDispatcher, createRequestActions } from '../../../../lib'
import { ProjectService } from '../../../../services/project';

const Actions = {}

const GET_PROJECT_REPORT_NAME = 'GET_PROJECT_REPORT'
Actions[GET_PROJECT_REPORT_NAME] = {
	DISPATCHER: (project_id, date_from, date_start, topics) => (dispatcher, getStore) => {
		const actions = Actions[GET_PROJECT_REPORT_NAME].ACTIONS
		const getRequest = () => ProjectService.getProjectReport(project_id, date_from, date_start, topics)
		requestDispatcher(dispatcher, actions, getRequest)
	},
	ACTIONS: createRequestActions(GET_PROJECT_REPORT_NAME, {
		fullfilled: (state, action) => {
			const newState = { ...state, ...action.payload }
			return newState
		},
		rejected: (state, action) => {
			return { ...state }
		}
	}),
}

const ActionCreators = extractActionCreators(Actions)
export { Actions, ActionCreators }