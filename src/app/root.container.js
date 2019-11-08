import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import lightBlue from '@material-ui/core/colors/lightBlue';
import { App } from './app.container'
import './styles.sass'


const theme = createMuiTheme({
	typography: {
		useNextVariants: true,
	},
	palette: {
		primary: red,
		secondary: lightBlue,
	},
	overrides: {
		MuiIcon: {
			root: {
				'&.fas': {
					width: 'auto !important',
					height: 'auto !important',
				}
			},
		},
	},
});

export const Root = () => (
	<MuiThemeProvider theme={theme}>
		<App></App>
	</MuiThemeProvider>
)
