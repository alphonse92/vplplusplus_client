import React, { Component } from 'react'
import { withRouter, Switch } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { AppLoading } from '../lib/components/loading'
import { DialogBroker } from '../lib/components/error';
import getRoutes from './routes'
import { ActionCreators as ErrorActionCreators } from '../redux/modals/actions';

class AppContainer extends Component {
	static mapStateToProps = (state) => {
		const newprops = { modals: state.modals, lib: { ...state.lib } }
		return newprops
	}

	static mapDispatchToProps = (dispatch) => {
		const DISPATCHERS = bindActionCreators({ ...ErrorActionCreators }, dispatch)
		return { DISPATCHERS }
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
				<DialogBroker handleClose={this.props.DISPATCHERS.CLEAR_ERROR} error={this.props.modals.error} />
				<Switch> {routes} </Switch>
			</React.Fragment>
		)
	}

}

export const App = withRouter(connect(
	AppContainer.mapStateToProps,
	AppContainer.mapDispatchToProps
)(AppContainer))
