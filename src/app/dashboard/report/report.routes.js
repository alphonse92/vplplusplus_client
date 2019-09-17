import React from 'react'
import { Route } from 'react-router'
import { Main as MainStudent } from './report.student.main'
import { Main as MainProject } from './report.project.main'
import { createDefaultRoute } from '../../../lib/components/routes';

export default (match) => [
	(<Route exact path={match.url + '/project/:id?'} render={MainProject} />),
	(<Route exact path={match.url + '/student/:id?'} render={MainStudent} />),
	(<Route path={match.url + '/'} render={createDefaultRoute('/dashboard/laboratory')} />),
	(<Route path={match.url + '/:404'} render={createDefaultRoute('/dashboard/laboratory')} />)
]
