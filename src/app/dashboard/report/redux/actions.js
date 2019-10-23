import { orderBy, get } from 'lodash'
import { extractActionCreators, requestDispatcher, createRequestActions } from '../../../../lib'
import { ProjectService } from '../../../../services/project';

const TIMELINE_REQUESTS = {
	PROJECT: (...parameters) =>
		() => ProjectService.getReportTimeline(...parameters),
	STUDENT: (...parameters) =>
		() => ProjectService.getReportTimeline(...parameters),
}

const PROJECT_REQUESTS = {
	PROJECT: (...parameters) =>
		() => ProjectService.getProjectReport(...parameters),
	STUDENT: (...parameters) =>
		() => ProjectService.getStudentReport(...parameters),
}

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

const SET_REPORT_TYPE_NAME = 'SET_REPORT_TYPE'
Actions[SET_REPORT_TYPE_NAME] = {
	DISPATCHER: (payload) => (dispatcher) => {
		const name = Actions[SET_REPORT_TYPE_NAME].ACTIONS.default.name
		const dispatcherData = { type: name, payload }
		dispatcher(dispatcherData)
	},
	ACTIONS: {
		default: {
			name: SET_REPORT_TYPE_NAME,
			reducer: (state, action) => {
				state.project.type = action.payload
				return state
			}
		}
	},
}

const SET_PROJECT_TIMELINE_FILTER_NAME = 'SET_PROJECT_TIMELINE_FILTER'
Actions[SET_PROJECT_TIMELINE_FILTER_NAME] = {
	DISPATCHER: (data) => (dispatcher, getStore) => {
		const store = getStore()
		const { report: root = {} } = store
		const { project = {} } = root
		const { stadistics = {} } = project
		const { timeline = {} } = stadistics
		const { options: optionsFromStore = {} } = timeline
		const {
			from = optionsFromStore.from,
			type = optionsFromStore.type,
			each = optionsFromStore.each,
			steps = optionsFromStore.steps,
			topic = optionsFromStore.topic,
			projects = optionsFromStore.projects,
			separeByTopic = optionsFromStore.separeByTopic,
			showProjectFilter = optionsFromStore.showProjectFilter,
			showStudentFilter = optionsFromStore.showStudentFilter,
			id = optionsFromStore.id,
		} = data

		const payload = { from, type, each, steps, topic, projects, id, showProjectFilter, showStudentFilter, separeByTopic }
		const name = Actions[SET_PROJECT_TIMELINE_FILTER_NAME].ACTIONS.default.name
		const dispatcherData = { type: name, payload }
		dispatcher(dispatcherData)
	},
	ACTIONS: {
		default: {
			name: SET_PROJECT_TIMELINE_FILTER_NAME,
			reducer: (state, action) => {
				state.project.stadistics.timeline.options = { ...action.payload }
				return state
			}
		}
	},
}

const CLEAR_PROJECT_TIMELINE_DATASETS_NAME = 'CLEAR_PROJECT_TIMELINE_DATASETS'
Actions[CLEAR_PROJECT_TIMELINE_DATASETS_NAME] = {
	DISPATCHER: () => (dispatcher) => {
		dispatcher({ type: CLEAR_PROJECT_TIMELINE_DATASETS_NAME })
	},
	ACTIONS: {
		default: {
			name: CLEAR_PROJECT_TIMELINE_DATASETS_NAME,
			reducer: (state) => {
				state.project.stadistics.timeline.datasets = []
				state.project.stadistics.timeline.labels = []
				state.project.stadistics.timeline.loading = false
				state.project.stadistics.timeline.error = undefined
				return state
			}
		}
	},
}

const GET_PROJECT_TIMELINE_NAME = 'GET_PROJECT_TIMELINE'
Actions[GET_PROJECT_TIMELINE_NAME] = {
	DISPATCHER: (opts = {}) => (dispatcher, getStore) => {
		const store = getStore()
		const { report: root = {} } = store
		const { project = {} } = root
		const { stadistics = {}, type: report_type } = project
		const { timeline = {} } = stadistics
		const { options = {} } = timeline
		const { from, type, each, steps, topic, projects, id, separeByTopic } = options
		const actions = Actions[GET_PROJECT_TIMELINE_NAME].ACTIONS
		const getRequest = TIMELINE_REQUESTS[report_type]

		if (getRequest) requestDispatcher(dispatcher, actions, getRequest(report_type, id, from, type, each, steps, topic, projects, separeByTopic), opts)

	},
	ACTIONS: createRequestActions(GET_PROJECT_TIMELINE_NAME, {
		init: (state, action) => {
			state.project.stadistics.timeline.loading = true
			state.project.stadistics.timeline.error = undefined
			return state
		},
		fullfilled: (state, action) => {
			const labels = []
			const datasets = []
			const { payload } = action

			payload.forEach(projectReport => {
				const { reports } = projectReport
				reports.forEach(dataReport => {
					const { label, dataset } = dataReport
					labels.push(label)
					datasets.push(dataset)
				})

			})

			const actualDatasets = state.project.stadistics.timeline.datasets
			const actualLabels = state.project.stadistics.timeline.labels

			state.project.stadistics.timeline.labels = [...actualLabels, ...labels]
			state.project.stadistics.timeline.datasets = [...actualDatasets, ...datasets]
			state.project.stadistics.timeline.loading = false
			state.project.stadistics.timeline.error = undefined
			return state
		},
		rejected: (state, action) => {
			state.project.stadistics.timeline.loading = false
			state.project.stadistics.timeline.error = action.payload
			return state
		}
	}),
}

const GET_PROJECT_REPORT_NAME = 'GET_PROJECT_REPORT'
Actions[GET_PROJECT_REPORT_NAME] = {
	DISPATCHER: (data, opts = {}) => (dispatcher, getStore) => {

		const store = getStore()
		const { report: root = {} } = store
		const { project = {} } = root
		const { filter = {}, type: report_type } = project
		const { from, to, topic } = filter
		const { id } = data
		const getRequest = PROJECT_REQUESTS[report_type]
		const actions = Actions[GET_PROJECT_REPORT_NAME].ACTIONS

		getRequest && requestDispatcher(dispatcher, actions, getRequest(id, from, to, topic), opts)
	},
	ACTIONS: createRequestActions(GET_PROJECT_REPORT_NAME, {
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
	DISPATCHER: (data, opts) => (dispatcher, getStore) => {
		const { from, to, topic } = get(getStore(), 'report.project.filter', {})
		const { id } = data
		const actions = Actions[GET_STUDENT_REPORT].ACTIONS
		const getRequest = () => ProjectService.getStudentReport(id, from, to, topic)
		requestDispatcher(dispatcher, actions, getRequest, opts)


	},
	ACTIONS: createRequestActions(GET_STUDENT_REPORT, {
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

const ActionCreators = extractActionCreators(Actions)
export { Actions, ActionCreators }