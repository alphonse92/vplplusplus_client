import { Actions, ActionCreators } from './actions'
import { REDUCER } from './reducer'

export const ApplicationRedux = {
	ACTIONS: Actions,
	REDUCER: { applications: REDUCER },
	ACTIONS_CREATORS: ActionCreators
}
