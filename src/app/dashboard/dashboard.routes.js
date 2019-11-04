import React from 'react'
import { Route } from 'react-router'

import { LaboratoryContainer } from './laboratory/laboratory.container'
import { StudentContainer } from './student/student.container'
import { ReportContainer } from './report/report.container'
import { ConfigurationContainer } from './configuration'
import { HelpContainer } from './help'
import { scopeStatic } from '../common/scope'

const COMPONENT_REDIRECT_TO_DEFAULT = () => {
	return <React.Fragment>Page not found</React.Fragment>
}

export default (match) => {

	const pathsDef = [
		{ show: scopeStatic('showLabPage'), path: match.url + '/laboratory', component: LaboratoryContainer },
		{ show: scopeStatic('showStudentPage'), path: match.url + '/students', component: StudentContainer },
		{ show: scopeStatic('showReportsPage'), path: match.url + '/report', component: ReportContainer },
		{ show: scopeStatic('showApplicationsPage'), path: match.url + '/applications', component: HelpContainer },
		{ show: scopeStatic('showTopicsPage'), path: match.url + '/topics', component: ConfigurationContainer },
	].filter(({ show }) => show)

	const firstPage = pathsDef[0] || {path:match.url , component:COMPONENT_REDIRECT_TO_DEFAULT}
	const ArrayOfRoutes = pathsDef.map(({ path, component }) => <Route path={path} render={component} />)
	const defaultRoute = <Route exact path={match.url} render={firstPage.component} /> 
	
	const paths = [defaultRoute]
	.concat(ArrayOfRoutes)
	.concat([< Route path={match.url + '/:404'} render={COMPONENT_REDIRECT_TO_DEFAULT} />])
	

	return paths

}