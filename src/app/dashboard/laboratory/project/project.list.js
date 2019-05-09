
import React from 'react'
import { Toolbar } from '@material-ui/core';
import { ProjectTable } from './tables/project.table';
import { NewProjectToolbarComponent } from './components';

export const ProjectList = props => {
	const redirects = {
		create: () => props.history.push('project/create')
	}
	return (
		<React.Fragment>
			<Toolbar disableGutters>
				<h1>Current Projects</h1>
			</Toolbar>
			<NewProjectToolbarComponent goTo={redirects.create} />
			<ProjectTable />
		</React.Fragment>
	)
}