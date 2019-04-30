import React, { Component } from 'react'
import { withRouter, Switch } from 'react-router'
import getRoutes from './routes'
import { AppLoading } from './common/loading';

class AppContainer extends Component {

	constructor(props) {
		super(props)
		const { match, location } = props
		this.routes = getRoutes(match, location).map((route, key) => ({ ...route, key }))
	}

	render() {
		const { routes } = this
		return (
			<React.Fragment>
				<AppLoading>
					<Switch> {routes} </Switch>
				</AppLoading>
			</React.Fragment>
		)
	}

}

export const App = withRouter(AppContainer)
