import React from 'react'
import { Route } from 'react-router'
import { Main } from './laboratory.main'
import { ProjectContainer } from './project/project.container';
import { createDefaultRoute } from '../../../lib/components/routes';

export default (match) => [
	(<Route exact path={match.url + '/'} render={Main} />),
	(<Route path={match.url + '/project'} render={ProjectContainer} />),
	(<Route path={match.url + '/:404'} render={createDefaultRoute(match.path)} />)
]
