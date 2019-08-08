import React from 'react'
import { Toolbar } from '@material-ui/core';
import { ProjectTable } from './project/tables/project.table';

export const Main = (props) => {
	
	const onCreateNewProject = () => {
		props.history.push('laboratory/project/create')
	}

	return (
		<React.Fragment>
			<Toolbar disableGutters>
				<h1>
					Virtual Programming Lab Projects
				</h1>
			</Toolbar>
			<ProjectTable onCreateNewProject={onCreateNewProject} />
		</React.Fragment>
	)
}