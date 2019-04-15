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

function dispatchRequesSuccess(dispatch, { data }, action, fncs = {}, opts = {}) {
  const { fulfilled } = action
  const formattedData = fncs.format ? fncs.format(data) : data
  const payload = { ...formattedData, ...opts }
  dispatch({ type: fulfilled, payload, })
  fncs.postThen && fncs.postThen(payload)
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

export async function requestDispatcher(dispatch, action, request, fncs = {}, opts = {}) {
  try {
    const response = await request
    const responseParsed = await getJSONorTextFromRequest(response.clone())
    throwErrorAtRequestError(responseParsed)
    dispatchRequesSuccess(dispatch, responseParsed, action)
  } catch (error) {
    dispatchErrors(dispatch, error, action)
  }

}