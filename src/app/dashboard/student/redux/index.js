import { Actions, ActionCreators } from './actions'
import { REDUCER } from './reducer'
import { STUDENT } from './paths';
export const StudentRedux = {
	ACTIONS: Actions,
	REDUCER: { [STUDENT.root]: REDUCER },
	ACTIONS_CREATORS: ActionCreators
}
