import React, { Component } from 'react'
import { withRouter, Switch } from 'react-router'
import { connect } from 'react-redux'

import { AppLoading } from '../lib/components/loading'
import getRoutes from './routes'

class AppContainer extends Component {
	static mapStateToProps = (state) => {
		const newprops = { lib: { ...state.lib } }
		return newprops
	}

	static mapDispatchToProps = (dispatch) => {
		return {}
	}

	constructor(props) {
		super(props)
		const { match, location } = props
		this.routes = getRoutes(match, location).map((route, key) => ({ ...route, key }))
	}

	render() {
		const { routes } = this
		return (
			<React.Fragment>
				{this.props.lib.loading && <AppLoading />}
				<Switch> {routes} </Switch>
			</React.Fragment>
		)
	}

}

export const App = withRouter(connect(
	AppContainer.mapStateToProps,
	AppContainer.mapDispatchToProps
)(AppContainer))
