import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { ActionCreators } from '../../redux/user/actions';

class AuthGuard extends React.Component {

	static mapStateToProps = (state) => {
		const { user } = state.user
		return { STORE: { user } }
	}

	static mapDispatchToProps = (dispatch) => {
		const { LOGIN, SET_USER_LOGGED } = ActionCreators
		const CREATORS = { LOGIN, SET_USER_LOGGED }
		const DISPATCHERS = { DISPATCHERS: bindActionCreators(CREATORS, dispatch) }
		return DISPATCHERS
	}

	verifyAccess = () => {
		const { guards, STORE, requireAuth } = this.props
		const { user } = STORE
		const basicAccess = !!(!requireAuth || (requireAuth && user))
		const guardAccess = guards && guards.length > 0
			? guards.reduce((access, validator) => access && validator(user), true)
			//if guards exists then pass without valide nothing
			//if guards is undefined then does not pass by guards
			: typeof guards !== 'undefined'
		const shouldGetAccess = basicAccess || guardAccess
		return shouldGetAccess
	}
	render() {
		const { componentProps, DISPATCHERS, STORE, component, redirectTo } = this.props
		return this.verifyAccess()
			? component({ ...componentProps, DISPATCHERS, STORE })
			: <Redirect to={redirectTo} />
	}
}

const AuthGuardRedux = connect(
	AuthGuard.mapStateToProps,
	AuthGuard.mapDispatchToProps
)(AuthGuard)


export const withAuth = (Component, requireAuth = false, redirectTo = '/', guards) => {
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