import { printErrorByEnv } from './../common'

async function getJSONorTextFromRequest(response) {
	const { ok, status, statusText } = response
	const responseBasic = { ok, status, statusText }
	let data, isJSON
	try {
		data = await response.clone().json()
		isJSON = true

	} catch (e) {
		data = await response.clone().text();
		isJSON = false
	}
	const custom = { data, isJSON }
	return { ...custom, ...responseBasic }
}
function dispatchInitActions(dispatch, action) {
	const { init } = action
	dispatch({ type: init, })
}
function dispatchRequesSuccess(dispatch, { data }, action, lifeCycle = {}, opts = {}) {
	const { fulfilled } = action
	const formattedData = opts.format ? opts.format(data) : data
	const payload = { ...formattedData, ...opts }
	dispatch({ type: fulfilled, payload, })
	after(lifeCycle, payload)
}

function dispatchErrors(dispatch, error, action) {
	const { stack } = error
	const dispatchData = {
		type: action.rejected.name,
		payload: { error }
	}

	printErrorByEnv(stack)
	dispatch(dispatchData)
}

function throwErrorAtRequestError(responseParsed) {
	const { statusText, ok } = responseParsed
	if (ok) return responseParsed
	const error = new Error(statusText)
	Object.assign(error, responseParsed)
	throw error
}


async function after({ after }, data) {
	if (after) await after(data)
}

export async function requestDispatcher(dispatch, action, request, lifeCycle = {}, opts = {}) {
	try {
		dispatchInitActions(dispatch, action)
		const response = await request
		const responseParsed = await getJSONorTextFromRequest(response.clone())
		throwErrorAtRequestError(responseParsed)
		dispatchRequesSuccess(dispatch, responseParsed, action, lifeCycle, opts)
	} catch (error) {
		dispatchErrors(dispatch, error, action)
	}

}