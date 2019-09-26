import { orderBy, get } from 'lodash'
import { extractActionCreators, requestDispatcher, createRequestActions } from '../../../../lib'
import { ProjectService } from '../../../../services/project';

const Actions = {}

const SET_FILTER_NAME = 'SET_FILTER'
Actions[SET_FILTER_NAME] = {
	DISPATCHER: (project, data) => (dispatcher) => {
		dispatcher({ type: Actions[SET_FILTER_NAME].ACTIONS.default.name, payload: { project, data } })
	},
	ACTIONS: {
		default: {
			name: SET_FILTER_NAME,
			reducer: (state, action) => {
				const { project, data } = action.payload
				const newState = { ...state }
				state[project ? 'project' : 'student'].filter = { ...data }
				return newState
			}
		}
	},
}

const SET_PROJECT_TIMELINE_FILTER_NAME = 'SET_PROJECT_TIMELINE_FILTER'
Actions[SET_PROJECT_TIMELINE_FILTER_NAME] = {
	DISPATCHER: (data) => (dispatcher) => {
		const { from, type = 'months', each = 6, steps = 4, topic = [] } = data
		dispatcher({ type: SET_PROJECT_TIMELINE_FILTER_NAME, payload: { from, type, each, steps, topic } })
	},
	ACTIONS: createRequestActions(SET_PROJECT_TIMELINE_FILTER_NAME, {
		fullfilled: (state, action) => {
			state.project.stadistics.timeline.options = { ...action.payload }
			return state
		}
	}),
}

const CLEAR_PROJECT_TIMELINE_DATASETS_NAME = 'CLEAR_PROJECT_TIMELINE_DATASETS'
Actions[CLEAR_PROJECT_TIMELINE_DATASETS_NAME] = {
	DISPATCHER: () => (dispatcher) => {
		dispatcher({ type: CLEAR_PROJECT_TIMELINE_DATASETS_NAME })
	},
	ACTIONS: createRequestActions(SET_PROJECT_TIMELINE_FILTER_NAME, {
		fullfilled: (state, action) => {
			state.project.stadistics.timeline.datasets = []
			return state
		}
	}),
}

const GET_PROJECT_TIMELINE_NAME = 'GET_PROJECT_TIMELINE'
Actions[GET_PROJECT_TIMELINE_NAME] = {
	DISPATCHER: (project_id, opts) => (dispatcher, getStore) => {
		const store = getStore()
		const { report: root = {} } = store
		const { project = {} } = root
		const { stadistics = {} } = project
		const { timeline = {} } = stadistics
		const { options = {} } = timeline
		// load the opts from the store
		const { from, type, each, steps, topic, } = options

		const actions = Actions[GET_PROJECT_TIMELINE_NAME].ACTIONS
		const getRequest = () => ProjectService.getReportTimeline(project_id, from, type, each, steps, topic)
		requestDispatcher(dispatcher, actions, getRequest, opts)
	},
	ACTIONS: createRequestActions(GET_PROJECT_TIMELINE_NAME, {
		fullfilled: (state, action) => {
			const { payload: newDataSet } = action
			console.log(state)
			state.project.stadistics.timeline.datasets = state.project.stadistics.timeline.datasets.concat(newDataSet)
			return state
		},
		rejected: (state, action) => {
			return state
		}
	}),
}

const GET_PROJECT_REPORT_NAME = 'GET_PROJECT_REPORT'
Actions[GET_PROJECT_REPORT_NAME] = {
	DISPATCHER: (data, opts) => (dispatcher, getStore) => {
		const { from, to, topic } = get(getStore(), 'report.project.filter', {})
		const { id } = data
		const actions = Actions[GET_PROJECT_REPORT_NAME].ACTIONS
		const getRequest = () => ProjectService.getProjectReport(id, from, to, topic)
		requestDispatcher(dispatcher, actions, getRequest, opts)
	},
	ACTIONS: createRequestActions(GET_PROJECT_REPORT_NAME, {
		fullfilled: (state, action) => {
			const { payload: projectReport } = action
			const report = orderBy(projectReport.report, ['skill'], ['desc'])
			const { stadistics } = projectReport
			const newState = { ...state, project: { ...state.project, report, stadistics } }
			return newState
		},
		rejected: (state, action) => {
			return state
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
			const { payload: projectReportPayload } = action
			const report = orderBy(projectReportPayload.report, ['skill'], ['desc'])
			const { stadistics: statsFromPayload } = projectReportPayload
			const { mostDifficultTest, mostSkilledStudents, avg } = statsFromPayload

			state.project.report = report
			state.project.stadistics.mostDifficultTest = mostDifficultTest
			state.project.stadistics.mostSkilledStudents = mostSkilledStudents
			state.project.stadistics.avg = avg

			return state
		},
		rejected: (state, action) => {
			return state
		}
	}),
}

const GET_STUDENT_REPORT = 'GET_STUDENT_REPORT'
Actions[GET_STUDENT_REPORT] = {
	DISPATCHER: (data, opts) => (dispatcher) => {
		const { id, date_from, date_to, topics } = data
		const actions = Actions[GET_STUDENT_REPORT].ACTIONS
		const getRequest = () => ProjectService.getStudentReport(id, date_from, date_to, topics)
		requestDispatcher(dispatcher, actions, getRequest, opts)
	},
	ACTIONS: createRequestActions(GET_STUDENT_REPORT, {
		fullfilled: (state, action) => {
			const { payload: StudentReport } = action
			const report = orderBy(StudentReport.report, ['skill'], ['desc'])
			const { stadistics } = StudentReport
			const newState = { ...state, project: { ...state.student, report, stadistics } }
			return newState
		},
		rejected: (state, action) => {
			return state
		}
	}),
}

const ActionCreators = extractActionCreators(Actions)
export { Actions, ActionCreators }