import { Actions, ActionCreators } from './actions'
import { REDUCER } from './reducer'
import { TOPIC } from './paths';
export const TopicRedux = {
	ACTIONS: Actions,
	REDUCER: { [TOPIC.root]: REDUCER },
	ACTIONS_CREATORS: ActionCreators
}
