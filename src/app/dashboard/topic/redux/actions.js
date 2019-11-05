import { extractActionCreators, requestDispatcher, createRequestActions } from '../../../../lib'
import { TopicService as TopicServiceClass } from '../../../../services/topic';
const TopicService = new TopicServiceClass()
const Actions = {}

const CREATE_TOPIC_NAME = 'CREATE_TOPIC'
Actions[CREATE_TOPIC_NAME] = {
	DISPATCHER: (name, description, opts) => (dispatcher) => {
		const actions = Actions[CREATE_TOPIC_NAME].ACTIONS
		const getRequest = () => TopicService.create(name, description)
		requestDispatcher(dispatcher, actions, getRequest, opts)
	},
	ACTIONS: createRequestActions(CREATE_TOPIC_NAME, {
		fullfilled: (state, action) => state,
		rejected: (state, action) => state
	}),
}

const GET_TOPICS_NAME = 'GET_TOPICS'
Actions[GET_TOPICS_NAME] = {
	DISPATCHER: () => (dispatcher, getStore) => {
		const store = getStore()
		const { topic } = store
		const { list } = topic
		const { pagination } = list
		const { page, limit, sort: _sort = '', direction } = pagination
		const sortByCol = !_sort.length ? 'createdAt' : _sort
		const sortPrefix = direction ? "" : '-'
		const sort = sortPrefix + sortByCol
		const actions = Actions[GET_TOPICS_NAME].ACTIONS
		const getRequest = () => TopicService.list(page, limit, sort)
		requestDispatcher(dispatcher, actions, getRequest)
	},
	ACTIONS: createRequestActions(GET_TOPICS_NAME, {
		fullfilled: (state, action) => {
			const newState = { ...state }
			const newPagination = { ...newState.list.pagination, ...action.payload }
			newState.list.pagination = newPagination
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

const SET_DIRECTION_NAME = 'SET_DIRECTION'
Actions[SET_DIRECTION_NAME] = {
	DISPATCHER: (direction) => (dispatcher, getStore) => {
		dispatcher({ type: Actions[SET_DIRECTION_NAME].ACTIONS.default.name, payload: direction })
	},
	ACTIONS: {
		default: {
			name: SET_DIRECTION_NAME,
			reducer: (state, action) => {
				const newState = { ...state }
				newState.list.pagination.direction = action.payload
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