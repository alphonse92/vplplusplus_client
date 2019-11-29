import { Actions, ActionCreators } from './actions'
import { REDUCER } from './reducer'
import { LANG } from './paths';
export const LangRedux = {
	ACTIONS: Actions,
	REDUCER: { [LANG.root]: REDUCER },
	ACTIONS_CREATORS: ActionCreators
}
