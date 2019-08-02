import React from 'react'
import { Toolbar } from '@material-ui/core';
import { ProjectTable } from './project/tables/project.table';

export const Main = (props) => {
	return (
		<React.Fragment>
			<Toolbar disableGutters>
				<h1>
					Virtual Programming Lab Projects
				</h1>
			</Toolbar>
			<ProjectTable/>
		</React.Fragment>
	)
}