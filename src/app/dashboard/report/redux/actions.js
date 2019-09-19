import { orderBy } from 'lodash'
import { extractActionCreators, requestDispatcher, createRequestActions } from '../../../../lib'
import { ProjectService } from '../../../../services/project';

const Actions = {}

const GET_PROJECT_REPORT_NAME = 'GET_PROJECT_REPORT'
Actions[GET_PROJECT_REPORT_NAME] = {
	DISPATCHER: (data, opts) => (dispatcher) => {
		const { project_id, date_from, date_to, topics } = data
		const actions = Actions[GET_PROJECT_REPORT_NAME].ACTIONS
		const getRequest = () => ProjectService.getProjectReport(project_id, date_from, date_to, topics)
		requestDispatcher(dispatcher, actions, getRequest, opts)
	},
	ACTIONS: createRequestActions(GET_PROJECT_REPORT_NAME, {
		fullfilled: (state, action) => {
			const newState = { ...state, project: orderBy(action.payload, ['skill'], ['desc']) }
			return newState
		},
		rejected: (state, action) => {
			return { ...state }
		}
	}),
}
const GET_PROJECTS_REPORT_NAME = 'GET_PROJECTS_REPORT'
Actions[GET_PROJECTS_REPORT_NAME] = {
	DISPATCHER: (opts) => (dispatcher) => {
		const actions = Actions[GET_PROJECTS_REPORT_NAME].ACTIONS
		const getRequest = () => ProjectService.getProjectsReport()
		requestDispatcher(dispatcher, actions, getRequest, opts)
	},
	ACTIONS: createRequestActions(GET_PROJECTS_REPORT_NAME, {
		fullfilled: (state, action) => {
			const newState = { ...state, project: action.payload }
			return newState
		},
		rejected: (state, action) => {
			return { ...state }
		}
	}),
}

const ActionCreators = extractActionCreators(Actions)
export { Actions, ActionCreators }