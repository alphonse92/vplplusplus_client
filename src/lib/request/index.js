import { LOADING_ACTION_NAME } from '../redux/actions';

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
	setLoading(dispatch, false)
	dispatch({ type: fullfilled.name, payload: formattedData, })
	opts.after && opts.after(formattedData)
}

function throwErrorAtRequestError(responseParsed) {
	const { statusText, ok } = responseParsed
	if (ok) return responseParsed
	const error = new Error(statusText)
	Object.assign(error, responseParsed)
	throw error
}

function setLoading(dispatcher, isLoading, callback) {
	dispatcher({ type: LOADING_ACTION_NAME, payload: isLoading })
	callback && callback()
}

function before(action, dispatch, callback) {
	setLoading(dispatch, true, callback)
}

export async function requestDispatcher(dispatch, action, getRequest, opts = {}) {
	try {
		await before(action, dispatch, opts.before)
		const request = getRequest()
		dispatchInitActions(dispatch, action)
		const response = await request
		const responseParsed = await getJSONorTextFromRequest(response.clone())
		throwErrorAtRequestError(responseParsed)
		dispatchRequesSuccess(dispatch, responseParsed, action, opts)
	} catch (error) {
		console.log('error requesting', error)
		dispatch({
			type: action.rejected.name,
			payload: error
		})

		opts.onError && opts.onError(error.data)
		setLoading(dispatch, false)
	}

}