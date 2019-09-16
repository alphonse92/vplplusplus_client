import React from 'react'
import { Route } from 'react-router'
import { Main} from './report.main'
import { createDefaultRoute } from '../../../lib/components/routes';

export default (match) => [
	(<Route exact path={match.url + '/'} render={Main} />),
	(<Route path={match.url + '/:404'} render={createDefaultRoute(match.path)} />)
]
