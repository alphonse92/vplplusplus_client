import React from 'react'
import { Toolbar } from '@material-ui/core';
import { ProjectTable } from './project/tables/project.table';

export const Main = (props) => {
	const pathname = 'laboratory/project/create/'
	const onCreateNewProject = (id) => props.history.push(`${pathname}${id ? id : ''}`)
	const onCreateNewProjectFromJson = (state) => props.history.push({ pathname, state })

	return (
		<React.Fragment>
			<Toolbar disableGutters>
				<h1>
					Virtual Programming Lab Projects
				</h1>
			</Toolbar>
			<ProjectTable onCreateNewProject={onCreateNewProject} onCreateNewProjectFromJson={onCreateNewProjectFromJson} />
		</React.Fragment>
	)
}