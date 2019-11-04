import React from 'react'
import { Switch } from 'react-router'
import { orderBy } from 'lodash'
import DashboardNavbar from './dashboard.navbar';
import getRoutes from './dashboard.routes'
import { ITEM_MENU_BY_SCOPE } from './dashboard.navbar.schema'
import './styles.sass'

export const DashboardContainer = (props) => {
	const { history, match, location, STORE, DISPATCHERS } = props
	const { user } = STORE
	const onSelect = menu => {
		const { redirect, action } = menu
		if (redirect) return history.push(redirect)
		if (DISPATCHERS[action]) return DISPATCHERS[action]()
	}
	const getMenuByScopes = scopes => scopes
		.reduce((groupedMenu, scope) => {
			const menuItemScope = ITEM_MENU_BY_SCOPE[scope]

			if (!menuItemScope) return groupedMenu

			const groupName = menuItemScope.group.name
			const groupOrder = menuItemScope.group.order

			const _def_ = { name: groupName, order: groupOrder, items: [] }
			const menu = groupedMenu[groupName] || _def_

			menu.items.push(ITEM_MENU_BY_SCOPE[scope])

			return { ...groupedMenu, [menu.name]: menu }

		}, {})
	const userMenuMap = getMenuByScopes(user.scopes)
	const userMenu = orderBy(Object.values(userMenuMap), ['order'], ['asc'])
		.map(menu => {
			const { items = [] } = menu
			menu.items = orderBy(items, ['order'], ['asc'])
			return menu
		})
	return (
		<React.Fragment>
			<DashboardNavbar openAtStart menu={userMenu} onSelect={onSelect} >
				<Switch>
					{getRoutes(match, location).map((route, key) => ({ ...route, key }))}
				</Switch>
			</DashboardNavbar>

		</React.Fragment>
	)
}