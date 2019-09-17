import { Actions, ActionCreators } from './actions'
import { REDUCER } from './reducer'
import { REPORT } from './paths';
export const ReportRedux = {
	ACTIONS: Actions,
	REDUCER: { [REPORT.root]: REDUCER },
	ACTIONS_CREATORS: ActionCreators
}
