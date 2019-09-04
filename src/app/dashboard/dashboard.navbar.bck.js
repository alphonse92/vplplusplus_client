import React from 'react'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { SCHEMA_DEFAULT, ITEM_MENU_BY_SCOPE } from './dashboard.navbar.schema'
import { orderBy } from 'lodash'

const getMenuByScopes = scopes => scopes.map(scope => ITEM_MENU_BY_SCOPE[scope])
const getMenuComponentByMenuSchemaReducer = (array, menuschema) => menuschema ? array.concat([
	<NavItem key={menuschema.name} eventKey={menuschema.name} className="">
		<NavIcon><i className={menuschema.icon} style={{ fontSize: '1.75em' }} /></NavIcon>
		<NavText> {menuschema.text} </NavText>
	</NavItem>
]) : array
const getMenuComponentByMenuSchema = arrayOfMenuSchemas => arrayOfMenuSchemas.reduce(getMenuComponentByMenuSchemaReducer, [])
const getNavBarBySchema = (customSchema, props) => {
	const { scopes, onSelect } = props
	const schema = { ...SCHEMA_DEFAULT, ...customSchema }
	const { toggleable, defaultSelected } = schema
	const menuSchemas = getMenuByScopes(scopes)
	const menu = getMenuComponentByMenuSchema(orderBy(menuSchemas, ['index'], ['asc']))

	return (
		<React.Fragment>
			<SideNav
				className="fixed sidebar"
				onSelect={(name) => onSelect(menuSchemas.find(menuSchema => menuSchema.name === name))}>
				<Toggle disabled={!toggleable} className="toggle" />
				<Nav defaultSelected={defaultSelected}>{menu}</Nav>
			</SideNav>
		</React.Fragment>
	)
}

const schema = {
	toggleable: true,
	defaultSelected: 'dashboard',
}

export const DashboardNavbar = props => getNavBarBySchema(schema, props)



