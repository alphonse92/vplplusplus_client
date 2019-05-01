import React from 'react'
import { Switch } from 'react-router'
import { DashboardNavbar } from './dashboard.navbar';
import getRoutes from './dashboard.routes'
import './styles.sass'

const DashboardWraper = props => (
	<div className="dashboard">
		{props.children}
	</div>
)

const DashboardContent = props => (
	<div className="content">
		{props.children}
	</div>
)

export const DashboardContainer = (props) => {
	const { history, match, location, STORE, DISPATCHERS } = props
	const { user } = STORE
	const { LOGOUT } = DISPATCHERS
	
	const onSelect = menu => {
		const { redirect, action } = menu
		if (redirect) return history.push(redirect)
		console.log({ DISPATCHERS, action})
		if (DISPATCHERS[action]) return DISPATCHERS[action]()
	}
	console.log(match)
	const routes = getRoutes(match, location).map((route, key) => ({ ...route, key }))
	return (
		<React.Fragment>
			<DashboardNavbar
				scopes={user.scopes}
				onSelect={onSelect} />
			<DashboardWraper>
				<DashboardContent>
					<Switch> {routes} </Switch>
				</DashboardContent>
			</DashboardWraper>
		</React.Fragment>
	)
}