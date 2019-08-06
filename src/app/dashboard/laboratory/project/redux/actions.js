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


const ActionCreators = extractActionCreators(Actions)
export { Actions, ActionCreators }