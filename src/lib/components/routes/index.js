import React from 'react'
import { Switch } from 'react-router'

export const createDefaultRoute = redirect => (props) => {
	props.history.push(redirect)
	return <React.Fragment></React.Fragment>
}

export const createRoutesContainer = getRoutesFN => ({ match }) => {
	const routes = getRoutesFN(match).map((route, key) => ({ ...route, key }))
	return (
		<React.Fragment>
			<Switch>{routes}</Switch>
		</React.Fragment>
	)
}