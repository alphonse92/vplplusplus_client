import React from 'react'
import { Route } from 'react-router'
import { ProjectCreate } from './project.create'
import { ProjectList } from './project.list'
import { createDefaultRoute } from '../../../../lib/components/routes';

export default (match) => [
	(<Route exact path={match.url + '/'} render={ProjectList} />),
	(<Route exact path={match.url + '/create'} render={ProjectCreate} />),
	(<Route exact path={match.url + '/create/:id'} render={ProjectCreate} />),
	(<Route path={match.url + '/:404'} render={createDefaultRoute(match.url)} />),
]