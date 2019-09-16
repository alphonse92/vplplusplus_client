import React from 'react'
import { Route } from 'react-router'

import { OverviewContainer } from './overview'
import { LaboratoryContainer } from './laboratory/laboratory.container'
import { StudentContainer } from './student/student.container'
import { ReportContainer } from './report/report.container'
import { ConfigurationContainer } from './configuration'
import { HelpContainer } from './help'


const COMPONENT_REDIRECT_TO_DEFAULT = (props) => {
	props.history.push('overview')
	return <React.Fragment></React.Fragment>
}

export default (match) => [
	(<Route exact path={match.url + '/'} render={OverviewContainer} />),
	(<Route path={match.url + '/overview'} render={OverviewContainer} />),
	(<Route path={match.url + '/laboratory'} render={LaboratoryContainer} />),
	(<Route path={match.url + '/students'} render={StudentContainer} />),
	(<Route path={match.url + '/report'} render={ReportContainer} />),
	(<Route path={match.url + '/configuration'} render={ConfigurationContainer} />),
	(<Route path={match.url + '/help'} render={HelpContainer} />),
	(<Route path={match.url + ':404'} render={COMPONENT_REDIRECT_TO_DEFAULT} />)
]