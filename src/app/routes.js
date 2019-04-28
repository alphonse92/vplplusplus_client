import React from 'react'
import { Route } from 'react-router'
import { MainPage } from './main-page/mainPage.container';
import { LoginContainer } from './login/login.container'
import { PageNotFound } from './404/404.container';
import { Dashboard } from './dashboard/dashboard.container';
import { withAuth } from './common/auth'

const COMPONENT_REDIRECT_TO_DEFAULT = (props) => {
	props.history.push('/404')
	return <React.Fragment></React.Fragment>
}

export default (match, location) => [
	(<Route exact path={match.url + ''} render={MainPage} />),
	(<Route exact path={match.url + 'login'} render={withAuth(LoginContainer, false, '/dashboard', [
		// just users that are not logged in could see the login page
		(user) => !user
	])} />),
	(<Route exact path={match.url + 'dashboard'} render={withAuth(Dashboard, true, '/login')} />),
	(<Route exact path={match.url + '404'} render={PageNotFound} />),
	(<Route exact path={match.url + ':404'} render={COMPONENT_REDIRECT_TO_DEFAULT} />)
]