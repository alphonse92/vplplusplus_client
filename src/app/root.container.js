import 'core-js'
import React from 'react'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import { App } from './app.container'
import './styles.sass'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';


// const PRIMARY = '#f62a2c'
// const SECONDARY = '#f75a3f'
const HoverAndSelected = 'rgba(247, 83,	 61, 0.17) !important'
const PRIMARY_DEGRADEE = 'linear-gradient(45deg, #f62a2c 30%, #f88852 150%)'
const theme = createMuiTheme({
	palette: {
		primary: red,
		secondary: pink,
	},
	overrides: {
		MuiListItem: {
			root: {
				"&$selected": {
					background: HoverAndSelected
				},
				'&:hover': {
					background: HoverAndSelected
				},
				'&:focus': {
					background: HoverAndSelected
				}
			},
		},
		MuiTableRow: {
			root: {
				"&$selected": {
					background: HoverAndSelected
				},
				'&:hover': {
					background: HoverAndSelected,
				}
			},

		},
		MuiButton: {
			primary: {
				background: PRIMARY_DEGRADEE,
				borderRadius: '0%',
				color: 'white !important',
				padding: '7px 23px',
				boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
			},
		},
	},
});


export const Root = () => (
	<MuiThemeProvider theme={theme}>
		<App></App>
	</MuiThemeProvider>
)
