import React from 'react'
import { Route } from 'react-router'
import { ProjectCreate } from './project.create'
import { ProjectShow } from './project.show.js'
import { ProjectEdit } from './project.edit'
import { ProjectList } from './project.list'
import { createDefaultRoute } from '../../../../lib/components/routes';

export default (match) => [
	(<Route exact path={match.url + '/'} render={ProjectList} />),
	(<Route exact path={match.url + '/create'} render={ProjectCreate} />),
	(<Route exact path={match.url + '/:id/show'} render={ProjectShow} />),
	(<Route exact path={match.url + ':id/edit'} render={ProjectEdit} />),
	(<Route path={match.url + '/:404'} render={createDefaultRoute(match.url)} />),
]