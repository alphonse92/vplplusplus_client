import React from 'react'
import { Route } from 'react-router'
import { MainPage } from './main-page/mainPage.container';
import { LoginContainer } from './login/login.container'
import { PageNotFound } from './404/404.container';

const COMPONENT_REDIRECT_TO_DEFAULT = (props) => {
	props.history.push('/404')
	return <React.Fragment></React.Fragment>
}
export default (match, location) => [
	(<Route exact path={match.url + ''} render={(props) => <MainPage {...props} />} />),
	(<Route exact path={match.url + 'login'} render={(props) => <LoginContainer {...props} />} />),
	(<Route exact path={match.url + '404'} render={(props) => <PageNotFound {...props} />} />),
	(<Route exact path={match.url + ':404'} render={COMPONENT_REDIRECT_TO_DEFAULT} />)
]