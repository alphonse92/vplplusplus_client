import { extractActionCreators, requestDispatcher, createRequestActions } from '../../../../../lib'
import { ProjectService } from '../../../../../services/project';

const Service = new ProjectService()

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
		const getRequest = () => Service.getProjects(page, limit, sort)
		requestDispatcher(dispatcher, actions, getRequest)
	},
	ACTIONS: createRequestActions(LOAD_PROJECTS_NAME, {
		// SET_USER_LOGGED will handle the state.user data
		fullfilled: (state, action) => {
			const newState = { ...state }
			newState.list.pagination = action.payload
			return newState
		},
		rejected: (state, action) => {
			return state
		}
	}),
}

const DELETE_PROJECT_NAME = 'DELETE_PROJECT'
Actions[DELETE_PROJECT_NAME] = {
	DISPATCHER: (id) => (dispatcher, getStore) => {
		const actions = Actions[DELETE_PROJECT_NAME].ACTIONS
		const getRequest = () => Service.deleteProject(id)
		requestDispatcher(dispatcher, actions, getRequest)
	},
	ACTIONS: createRequestActions(DELETE_PROJECT_NAME, {
		// SET_USER_LOGGED will handle the state.user data
		fullfilled: (state, action) => {
			const newState = { ...state }
			newState.list.pagination = action.payload
			return newState
		},
		rejected: (state, action) => {
			return state
		}
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

const CREATE_MODIFY_CURRENT_PROJECT_NAME = 'CREATE_MODIFY_CURRENT_PROJECT'
Actions[CREATE_MODIFY_CURRENT_PROJECT_NAME] = {
	DISPATCHER: (payload) => (dispatcher, getStore) => {
		dispatcher({ type: Actions[CREATE_MODIFY_CURRENT_PROJECT_NAME].ACTIONS.default.name, payload })
	},
	ACTIONS: {
		default: {
			name: CREATE_MODIFY_CURRENT_PROJECT_NAME,
			reducer: (state, action) => {
				const newState = { ...state }
				newState.create.project = action.payload
				return newState
			}
		}
	},
}

const ADD_TEST_TO_CURRENT_PROJECT_NAME = 'ADD_TEST_TO_CURRENT_PROJECT'
Actions[ADD_TEST_TO_CURRENT_PROJECT_NAME] = {
	DISPATCHER: (newTest) => (dispatcher, getStore) => {
		dispatcher({ type: Actions[ADD_TEST_TO_CURRENT_PROJECT_NAME].ACTIONS.default.name, payload: newTest })
	},
	ACTIONS: {
		default: {
			name: ADD_TEST_TO_CURRENT_PROJECT_NAME,
			reducer: (state, action) => {
				const newState = { ...state }
				newState.create.tests = state.create.tests.concat(action.payload)
				return newState
			}
		}
	},
}

const DELETE_TEST_FROM_CURRENT_PROJECT_NAME = 'DELETE_TEST_FROM_CURRENT_PROJECT'
Actions[DELETE_TEST_FROM_CURRENT_PROJECT_NAME] = {
	DISPATCHER: (indexTest) => (dispatcher, getStore) => {
		dispatcher({ type: Actions[DELETE_TEST_FROM_CURRENT_PROJECT_NAME].ACTIONS.default.name, payload: indexTest })
	},
	ACTIONS: {
		default: {
			name: DELETE_TEST_FROM_CURRENT_PROJECT_NAME,
			reducer: (state, action) => {
				const { indexTest } = action.payload
				const newState = { ...state }
				const { create } = newState
				create.tests = create.tests.filter((test, index) => index !== indexTest)
				return { ...newState, create }
			}
		}
	},
}

const ADD_TEST_CASE_TO_TEST_NAME = 'ADD_TEST_CASE_TO_TEST'
Actions[ADD_TEST_CASE_TO_TEST_NAME] = {
	DISPATCHER: (indexTest, testCase) => (dispatcher, getStore) => {
		dispatcher({ type: Actions[ADD_TEST_CASE_TO_TEST_NAME].ACTIONS.default.name, payload: { indexTest, testCase } })
	},
	ACTIONS: {
		default: {
			name: ADD_TEST_CASE_TO_TEST_NAME,
			reducer: (state, action) => {
				const { payload } = action
				const { indexTest, testCase } = payload
				const newState = { ...state }
				const tests = newState.create.tests.concat([])
				tests[indexTest].test_cases.push(testCase)
				newState.create = { ...newState.create, tests }
				return newState
			}
		}
	},
}

const DELETE_TEST_CASE_FROM_TEST_NAME = 'DELETE_TEST_CASE_FROM_TEST'
Actions[DELETE_TEST_CASE_FROM_TEST_NAME] = {
	DISPATCHER: (indexTest, indexTestCase) => (dispatcher, getStore) => {
		dispatcher({ type: Actions[DELETE_TEST_CASE_FROM_TEST_NAME].ACTIONS.default.name, payload: { indexTest, indexTestCase } })
	},
	ACTIONS: {
		default: {
			name: DELETE_TEST_CASE_FROM_TEST_NAME,
			reducer: (state, action) => {
				const { payload } = action
				const { indexTest, indexTestCase } = payload
				const newState = { ...state }
				const { create } = newState
				const testCases = create.tests[indexTest].test_cases.filter((testCase, index) => index !== indexTestCase)
				create.tests[indexTest].test_cases = testCases
				return { ...newState, create }
			}
		}
	},
}

const ActionCreators = extractActionCreators(Actions)
export { Actions, ActionCreators }