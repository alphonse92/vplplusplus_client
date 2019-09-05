import { extractActionCreators, requestDispatcher, createRequestActions } from '../../../../lib'
import { StudentService } from '../../../../services/student';

const Actions = {}

const LOAD_STUDENTS_NAME = 'LOAD_STUDENTS'
Actions[LOAD_STUDENTS_NAME] = {
	DISPATCHER: () => (dispatcher, getStore) => {
		const store = getStore()
		const { students } = store
		const { list } = students
		const { pagination } = list
		const { page, limit, sort: _sort = '' } = pagination
		const sort = !_sort.length ? 'createdAt' : _sort
		const actions = Actions[LOAD_STUDENTS_NAME].ACTIONS
		const getRequest = () => StudentService.getStudents(page, limit, sort)
		requestDispatcher(dispatcher, actions, getRequest)
	},
	ACTIONS: createRequestActions(LOAD_STUDENTS_NAME, {
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