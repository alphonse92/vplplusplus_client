import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { UserRedux } from './user'

import { LibRedux } from './../lib/redux/store'
import { ProjectRedux } from '../app/dashboard/laboratory/project/redux';
import { StudentRedux } from '../app/dashboard/student/redux';
import { ReportRedux } from '../app/dashboard/report/redux';
import { ModalRedux } from './modals'

export const getReducer = history => combineReducers({
	router: connectRouter(history),
	lib: LibRedux.REDUCER,
	user: UserRedux.REDUCER,
	projects: ProjectRedux.REDUCER.projects,
	students: StudentRedux.REDUCER.students,
	report: ReportRedux.REDUCER.report,
	modals: ModalRedux.REDUCER.modals,
})
