import { extractActionCreators, requestDispatcher, createRequestActions } from '../../../../lib'
import { ApplicationService } from '../../../../services/application';

const Actions = {}

const GET_APPLICATIONS_NAME = 'GET_APPLICATIONS'
Actions[GET_APPLICATIONS_NAME] = {
	DISPATCHER: () => (dispatcher) => {
		const actions = Actions[GET_APPLICATIONS_NAME].ACTIONS
		const getRequest = () => ApplicationService.getApplications()
		requestDispatcher(dispatcher, actions, getRequest)
	},
	ACTIONS: createRequestActions(GET_APPLICATIONS_NAME, {
		fullfilled: (state, action) => {
			state.list = action.payload
			return state
		},
		rejected: (state, action) => {
			return { ...state }
		}
	}),
}


const CREATE_APPLICATION_NAME = 'CREATE_APPLICATION'
Actions[CREATE_APPLICATION_NAME] = {
	DISPATCHER: (name, description, opts) => (dispatcher) => {
		const actions = Actions[CREATE_APPLICATION_NAME].ACTIONS
		const getRequest = () => ApplicationService.create(name, description)
		requestDispatcher(dispatcher, actions, getRequest, opts)
	},
	ACTIONS: createRequestActions(CREATE_APPLICATION_NAME, {
		fullfilled: (state, action) => {
			state.list = state.list.concat([action.payload])
			return state
		},
		rejected: (state, action) => {
			console.log(action)
			return { ...state }
		}
	}),
}


const DELETE_APPLICATION_NAME = 'DELETE_APPLICATION'
Actions[DELETE_APPLICATION_NAME] = {
	DISPATCHER: (id) => (dispatcher) => {
		const actions = Actions[DELETE_APPLICATION_NAME].ACTIONS
		const getRequest = () => ApplicationService.deleteApplication(id)
		requestDispatcher(dispatcher, actions, getRequest)
	},
	ACTIONS: createRequestActions(DELETE_APPLICATION_NAME, {
		fullfilled: (state, action) => {
			state.list = state.list.filter(({ _id }) => _id !== action.payload._id)
			return state
		},
		rejected: (state, action) => {
			return { ...state }
		}
	}),
}




const ActionCreators = extractActionCreators(Actions)
export { Actions, ActionCreators }