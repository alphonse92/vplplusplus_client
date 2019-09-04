import React from 'react';
import { Icon } from '@material-ui/core';

export const SCHEMA_DEFAULT = {
	toggleable: true,
	defaultSelected: '',
	menu: []
}

export const GROUPS = {
	Dashboard: {
		order: 0,
		name: 'Dashboard'
	},
	Projects: {
		order: 1,
		name: 'Projects'
	},
	Students: {
		order: 2,
		name: 'Students'
	},
	Configuration: {
		order: 3,
		name: 'Configuration'
	}

}

export const ITEM_MENU_BY_SCOPE = {
	showDashboardPage: {
		order: 0,
		group: GROUPS.Dashboard,
		name: 'home',
		text: 'Home',
		icon: <Icon className="fas fa-tachometer-alt" />,
		className: '',
		redirect: '/dashboard/'
	},
	showLabPage: {
		order: 1,
		group: GROUPS.Projects,
		name: 'lab',
		text: 'Laboratory',
		icon: <Icon className='fas fa-laptop-code' />,
		className: '',
		redirect: '/dashboard/laboratory'
	},
	showStudentPage: {
		order: 2,
		group: GROUPS.Students,
		name: 'students',
		text: 'Students',
		icon: <Icon className='fas fa-user-graduate' />,
		className: '',
		redirect: '/dashboard/students'
	},
	showConfigurationPage: {
		order: 3,
		group: GROUPS.Configuration,
		name: 'configuration',
		text: 'Configuration',
		icon: <Icon className='fas fa-cog' />,
		className: '',
		redirect: '/dashboard/configuration'
	},
	showHelpPage: {
		order: 6,
		group: GROUPS.Configuration,
		name: 'help',
		text: 'Help',
		icon: <Icon className='fas fa-question' />,
		className: '',
		redirect: '/dashboard/help'
	},
	showLogoutPage: {
		order: 7,
		group: GROUPS.Configuration,
		name: 'logout',
		text: 'Logout',
		icon: <Icon className='fas fa-power-off' />,
		className: '',
		action: 'LOGOUT'
	},
}
