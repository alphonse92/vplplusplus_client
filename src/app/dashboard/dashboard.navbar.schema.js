import React from 'react'

export const SCHEMA_DEFAULT = {
	toggleable: true,
	defaultSelected: '',
	menu: []
}

export const ITEM_MENU_BY_SCOPE = {
	showDashboardPage: {
		index: 0,
		name: 'home',
		text: 'Home',
		icon: 'fa  fa-tachometer-alt',
		className: '',
		redirect: '/dashboard/'
	},
	showLabPage: {
		index: 1,
		name: 'lab',
		text: 'Laboratory',
		icon: 'fas fa-laptop-code',
		className: '',
		redirect: '/dashboard/laboratory'
	},
	showStudentPage: {
		index: 2,
		name: 'students',
		text: 'Students',
		icon: 'fas fa-user-graduate',
		className: '',
		redirect: '/dashboard/students'
	},
	showConfigurationPage: {
		index: 3,
		name: 'configuration',
		text: 'Configuration',
		icon: 'fas fa-cog',
		className: '',
		redirect: '/dashboard/configuration'
	},
	showHelpPage: {
		index: 6,
		name: 'help',
		text: 'Help',
		icon: 'fas fa-question',
		className: '',
		redirect: '/dashboard/help'
	},
	showLogoutPage: {
		index: 7,
		name: 'logout',
		text: 'Logout',
		icon: 'fas fa-power-off',
		className: '',
		action: 'LOGOUT'
	},
}
