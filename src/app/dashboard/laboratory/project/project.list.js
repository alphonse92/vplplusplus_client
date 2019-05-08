
import React from 'react'
import { Toolbar } from '@material-ui/core';
import { ProjectTable } from './tables/project.table';

export const ProjectList = (props) => {
	return (
		<React.Fragment>
			<Toolbar disableGutters>
				<h1>Current Projects</h1>
			</Toolbar>
			<ProjectTable />
		</React.Fragment>
	)
}