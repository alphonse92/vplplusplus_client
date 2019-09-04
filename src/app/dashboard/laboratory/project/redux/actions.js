import { extractActionCreators, requestDispatcher, createRequestActions } from '../../../../../lib'
import { ProjectService } from '../../../../../services/project';
import { CourseService as CourseServiceClass } from '../../../../../services/course';
import { TopicService as TopicServiceClass } from '../../../../../services/topic';

const CourseService = new CourseServiceClass()
const TopicService = new TopicServiceClass()

const Actions = {}

const LOAD_PROJECTS_NAME = 'LOAD_PROJECTS'
Actions[LOAD_PROJECTS_NAME] = {
	DISPATCHER: () => (dispatcher, getStore) => {
		const store = getStore()
		const { projects } = store
		const { list } = projects
		const { pagination } = list
		const { page, limit, sort: _sort = '' } = pagination
		const sort = !_sort.length ? 'createdAt' : _sort
		const actions = Actions[LOAD_PROJECTS_NAME].ACTIONS
		const getRequest = () => ProjectService.getProjects(page, limit, sort)
		requestDispatcher(dispatcher, actions, getRequest)
	},
	ACTIONS: createRequestActions(LOAD_PROJECTS_NAME, {
		fullfilled: (state, action) => {
			const newState = { ...state }
			newState.list.pagination = action.payload
			return newState
		},
		rejected: (state, action) => {
			return { ...state }
		}
	}),
}
const LOAD_PROJECT_NAME = 'LOAD_PROJECT'
Actions[LOAD_PROJECT_NAME] = {
	DISPATCHER: (id) => (dispatcher, getStore) => {
		const actions = Actions[LOAD_PROJECT_NAME].ACTIONS
		const getRequest = () => ProjectService.getProject(id)
		requestDispatcher(dispatcher, actions, getRequest)
	},
	ACTIONS: createRequestActions(LOAD_PROJECT_NAME, {
		fullfilled: (state, action) => {
			const newState = { ...state }
			const { payload: projectFromAPI } = action
			const { tests, ...project } = projectFromAPI
			newState.create.project = project
			newState.create.tests = tests
			return newState
		},
		rejected: (state, action) => {
			return { ...state }
		}
	}),
}

const GET_MOODLE_ACTIVITIES_NAME = 'GET_MOODLE_ACTIVITIES'
Actions[GET_MOODLE_ACTIVITIES_NAME] = {
	DISPATCHER: () => (dispatcher, getStore) => {
		const actions = Actions[GET_MOODLE_ACTIVITIES_NAME].ACTIONS
		const getRequest = () => CourseService.getMoodleActivities()
		requestDispatcher(dispatcher, actions, getRequest)
	},
	ACTIONS: createRequestActions(GET_MOODLE_ACTIVITIES_NAME, {
		fullfilled: (state, action) => {
			const newState = { ...state }
			newState.course.activities = action.payload
			return newState
		},
		rejected: (state, action) => {
			return { ...state }
		}
	}),
}

const GET_TOPICS_NAME = 'GET_TOPICS'
Actions[GET_TOPICS_NAME] = {
	DISPATCHER: (description) => (dispatcher, getStore) => {
		const actions = Actions[GET_TOPICS_NAME].ACTIONS
		const getRequest = () => TopicService.find(description)
		requestDispatcher(dispatcher, actions, getRequest)
	},
	ACTIONS: createRequestActions(GET_TOPICS_NAME, {
		fullfilled: (state, action) => {
			const newState = { ...state }
			newState.topics.list.pagination = action.payload
			return newState
		},
		rejected: (state, action) => {
			return { ...state }
		}
	}),
}

const CREATE_PROJECT_NAME = 'CREATE_PROJECT'
Actions[CREATE_PROJECT_NAME] = {
	DISPATCHER: (data = {}, opts) => (dispatcher, getStore) => {
		const store = getStore()
		const { project = store.projects.create.project } = data
		const { tests = store.projects.create.tests } = data
		const getRequest = () => ProjectService.createProject({ ...project, tests })
		const actions = Actions[CREATE_PROJECT_NAME].ACTIONS
		requestDispatcher(dispatcher, actions, getRequest, opts)
	},
	ACTIONS: createRequestActions(CREATE_PROJECT_NAME, {
		fullfilled: (state, action) => {
			const newState = { ...state }
			const { tests, ...project } = action.payload
			newState.create.project = project
			newState.create.tests = tests
			return newState
		},
	}),

}

const DELETE_PROJECT_NAME = 'DELETE_PROJECT'
Actions[DELETE_PROJECT_NAME] = {
	DISPATCHER: (id, opts) => (dispatcher, getStore) => {
		const actions = Actions[DELETE_PROJECT_NAME].ACTIONS
		const getRequest = () => ProjectService.deleteProject(id)
		requestDispatcher(dispatcher, actions, getRequest, opts)
	},
	ACTIONS: createRequestActions(DELETE_PROJECT_NAME, {
		fullfilled: (state, action) => ({ ...state }),
		rejected: (state, action) => ({ ...state })
	}),

}

const DELETE_TEST_NAME = 'DELETE_TEST'
Actions[DELETE_TEST_NAME] = {
	DISPATCHER: (project_id, test_id, opts) => (dispatcher, getStore) => {
		const actions = Actions[DELETE_TEST_NAME].ACTIONS
		const getRequest = () => ProjectService.deleteTest(project_id, test_id)
		requestDispatcher(dispatcher, actions, getRequest, opts)
	},
	ACTIONS: createRequestActions(DELETE_PROJECT_NAME, {
		fullfilled: (state, action) => ({ ...state }),
		rejected: (state, action) => ({ ...state })
	}),

}

const DELETE_TEST_CASE_NAME = 'DELETE_TEST_CASE'
Actions[DELETE_TEST_CASE_NAME] = {
	DISPATCHER: (project_id, test_id, id, opts) => (dispatcher, getStore) => {
		const actions = Actions[DELETE_TEST_CASE_NAME].ACTIONS
		const getRequest = () => ProjectService.deleteTestCase(project_id, test_id, id)
		requestDispatcher(dispatcher, actions, getRequest, opts)
	},
	ACTIONS: createRequestActions(DELETE_PROJECT_NAME, {
		fullfilled: (state, action) => ({ ...state }),
		rejected: (state, action) => ({ ...state })
	}),

}


const SET_ORDER_NAME = 'SET_ORDER'
Actions[SET_ORDER_NAME] = {
	DISPATCHER: (sort) => (dispatcher, getStore) => {
		dispatcher({ type: Actions[SET_ORDER_NAME].ACTIONS.default.name, payload: sort })
	},
	ACTIONS: {
		default: {
			name: SET_ORDER_NAME,
			reducer: (state, action) => {
				const newState = { ...state }
				newState.list.pagination.sort = action.payload
				return newState
			}
		}
	},

}
const SET_LIMIT_NAME = 'SET_LIMIT'
Actions[SET_LIMIT_NAME] = {
	DISPATCHER: (limit) => (dispatcher, getStore) => {
		dispatcher({ type: Actions[SET_LIMIT_NAME].ACTIONS.default.name, payload: limit })
	},
	ACTIONS: {
		default: {
			name: SET_LIMIT_NAME,
			reducer: (state, action) => {
				const newState = { ...state }
				newState.list.pagination.limit = action.payload
				return newState
			}
		}
	},

}

const SET_PAGE_NAME = 'SET_PAGE'
Actions[SET_PAGE_NAME] = {
	DISPATCHER: (page) => (dispatcher, getStore) => {
		dispatcher({ type: Actions[SET_PAGE_NAME].ACTIONS.default.name, payload: page })
	},
	ACTIONS: {
		default: {
			name: SET_PAGE_NAME,
			reducer: (state, action) => {
				const newState = { ...state }
				newState.list.pagination.page = action.payload
				return newState
			}
		}
	},

}

// actions to handle the project editor state

const EDIT_PROJECT_DATA_NAME = 'EDIT_PROJECT_DATA'
Actions[EDIT_PROJECT_DATA_NAME] = {
	DISPATCHER: (payload) => (dispatcher, getStore) => dispatcher({ type: Actions[EDIT_PROJECT_DATA_NAME].ACTIONS.default.name, payload }),
	ACTIONS: {
		default: {
			name: EDIT_PROJECT_DATA_NAME,
			reducer: (state, action) => {
				const newState = { ...state }
				newState.create = { ...action.payload }

				return newState
			}
		}
	},
}



const ActionCreators = extractActionCreators(Actions)
export { Actions, ActionCreators }