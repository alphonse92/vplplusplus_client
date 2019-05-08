import React from 'react'
import { ProjectTable } from './project/table/project.table';
import { Toolbar } from '@material-ui/core';

export const Main = (props) => {
	return (
		<React.Fragment>
			<Toolbar disableGutters>
				<h1>
					Virtual Programming Lab Projects
				</h1>
			</Toolbar>
			<ProjectTable />
		</React.Fragment>
	)
}