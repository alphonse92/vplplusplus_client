import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { ActionCreators } from '../../redux/user/actions';

// import { NotificationScheduleListTable } from './NotificationScheduleListTable';
// import { ActionCreators } from '../../../../redux/configuration/actions';

class AuthGuard extends React.Component {

	static mapStateToProps = (state) => {
		const { user } = state.user
		return { user }
	}

	static mapDispatchToProps = (dispatch) => {
		const { LOGIN } = ActionCreators
		const CREATORS = { LOGIN }
		return bindActionCreators(CREATORS, dispatch)
	}

	constructor(props) {
		super(props)
	}
	verifyAccess = () => {
		const { guards = [], user, requireAuth } = this.props
		const basicAccess = !requireAuth || (requireAuth && user)
		const guardAccess = guards.reduce((access, validator) => access && validator(user), true)
		const shouldGetAccess = basicAccess && guardAccess
		return shouldGetAccess
	}
	render() {
		const { componentProps, LOGIN, user, component, redirectTo } = this.props
		return this.verifyAccess()
			? component({ ...componentProps, LOGIN, user })
			: <Redirect to={redirectTo} />
	}

}

const AuthGuardRedux = connect(
	AuthGuard.mapStateToProps,
	AuthGuard.mapDispatchToProps
)(AuthGuard)


export const withAuth = (Component, requireAuth = false, redirectTo = '/', guards = []) => {
	return (props) => (
		<AuthGuardRedux
			component={Component}
			requireAuth={requireAuth}
			redirectTo={redirectTo}
			componentProps={props}
			guards={guards}
		/>
	)
}