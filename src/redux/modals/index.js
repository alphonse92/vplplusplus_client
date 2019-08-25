import { Actions, ActionCreators } from './actions'
import { REDUCER } from './reducer'
export const ModalRedux = {
	ACTIONS: Actions,
	REDUCER: { modals: REDUCER },
	ACTIONS_CREATORS: ActionCreators
}
