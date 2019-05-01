import React from 'react'
import { Route } from 'react-router'

import { OverviewContainer } from './overview'
import { LaboratoryContainer } from './laboratory'
import { StudentsContainer } from './students'
import { ConfigurationContainer } from './configuration'
import { HelpContainer } from './help'


const COMPONENT_REDIRECT_TO_DEFAULT = (props) => {
	props.history.push('overview')
	return <React.Fragment></React.Fragment>
}

export default (match) => [
	(<Route exact path={match.url + '/'} render={OverviewContainer} />),
	(<Route exact path={match.url + '/overview'} render={OverviewContainer} />),
	(<Route exact path={match.url + '/laboratory'} render={LaboratoryContainer} />),
	(<Route exact path={match.url + '/students'} render={StudentsContainer} />),
	(<Route exact path={match.url + '/configuration'} render={ConfigurationContainer} />),
	(<Route exact path={match.url + '/help'} render={HelpContainer} />),
	(<Route exact path={match.url + ':404'} render={COMPONENT_REDIRECT_TO_DEFAULT} />)
]