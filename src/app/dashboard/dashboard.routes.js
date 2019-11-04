import React from 'react'
import { Route } from 'react-router'

import { LaboratoryContainer } from './laboratory/laboratory.container'
import { StudentContainer } from './student/student.container'
import { ReportContainer } from './report/report.container'
import { ConfigurationContainer } from './configuration'
import { HelpContainer } from './help'
import { scopeStatic } from '../common/scope'



const COMPONENT_REDIRECT_TO_DEFAULT = (props) => {

	return <React.Fragment> </React.Fragment>
}

export default (match) => [
	scopeStatic('showLabPage') &&  <Route path={match.url + '/laboratory'} render={LaboratoryContainer} />,
	scopeStatic('showLabPage') && <Route path={match.url + '/students'} render={StudentContainer} />,
	scopeStatic('showReportsPage') && <Route path={match.url + '/report'} render={ReportContainer} />,
	scopeStatic('showTopicsPage') && <Route path={match.url + '/topics'} render={ConfigurationContainer} />,
	scopeStatic('showApplicationsPage') && <Route path={match.url + '/applications'} render={ConfigurationContainer} />,
	scopeStatic('showHelpPage') && <Route path={match.url + '/help'} render={HelpContainer} />,
	<Route path={match.url + ':404'} render={COMPONENT_REDIRECT_TO_DEFAULT} />
].filter(x => !!x)