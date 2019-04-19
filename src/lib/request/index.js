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
	const custom = { data, isJSON, }
	return { ...custom, ...responseBasic }
}
function dispatchInitActions(dispatch, action) {
	const { init } = action
	dispatch({ type: init.name, })
}
function dispatchRequesSuccess(dispatch, { data }, action, opts = {}) {
	const { fullfilled } = action
	const formattedData = opts.format ? opts.format(data) : data
	const payload = { ...formattedData, ...opts }
	dispatch({ type: fullfilled.name, payload, })
}

function dispatchErrors(dispatch, error, action) {
	const { stack } = error
	const dispatchData = {
		type: action.rejected.name,
		payload: error
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

async function setLoading(dispatcher, isLoading) {
	dispatcher({ type: 'async_loading', payload: isLoading })
}

async function before(dispatcher, callback) {
	setLoading(dispatcher, true)
	if (callback) return callback()
}

async function after(dispatcher, callback, data) {
	setLoading(dispatcher, false)
	if (callback) return callback(data)
}

export async function requestDispatcher(dispatch, action, getRequest, opts = {}) {
	try {
		await before(dispatch, opts.before)
		const request = getRequest()
		dispatchInitActions(dispatch, action)
		const response = await request
		const responseParsed = await getJSONorTextFromRequest(response.clone())
		after(dispatch, opts.after, responseParsed)
		throwErrorAtRequestError(responseParsed)
		dispatchRequesSuccess(dispatch, responseParsed, action, opts)
	} catch (error) {
		dispatchErrors(dispatch, error, action)
	}

}