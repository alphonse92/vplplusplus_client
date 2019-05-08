import React from 'react'
// import { Header } from 'semantic-ui-react'
import { ProjectTable } from './project/table/project.table';
import { Toolbar } from '@material-ui/core';

export const LaboratoryContainer = (props) => {
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