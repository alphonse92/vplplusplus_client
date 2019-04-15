import { extractActionCreators } from '../../lib'
import { createRequestActions } from '../../lib/redux'
import { requestDispatcher } from '../../lib/request'
import { UserService } from '../../services/user'

const Actions = {}
const LOGIN_NAME = 'LOGIN'
Actions[LOGIN_NAME] = {
  ACTIONS: createRequestActions(LOGIN_NAME, {
    fullfilled: (state, action) => ({ ...state, user: action.payload })
  }),
  DISPATCHER: (data) => {
    return dispatch => requestDispatcher(
      dispatch,
      Actions[LOGIN_NAME].ACTIONS,
      UserService.login(data)
    )
  }
}


const ActionCreators = extractActionCreators(Actions)
export { Actions, ActionCreators }