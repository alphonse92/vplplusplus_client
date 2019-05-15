import { Actions, ActionCreators } from './actions'
import { REDUCER } from './reducer'
import { PROJECT } from './paths';
export const ProjectRedux = {
	ACTIONS: Actions,
	REDUCER: { [PROJECT.root]: REDUCER },
	ACTIONS_CREATORS: ActionCreators
}
