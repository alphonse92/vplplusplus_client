import React from 'react'
import { ProjectTable } from './project/tables/project.table';

export const Main = (props) => {
	const pathname = 'laboratory/project/create/'
	const onCreateNewProject = (id) => props.history.push(`${pathname}${id ? id : ''}`)
	const onCreateNewProjectFromJson = (state) => props.history.push({ pathname, state })

	return (
		<React.Fragment>
			<ProjectTable onCreateNewProject={onCreateNewProject} onCreateNewProjectFromJson={onCreateNewProjectFromJson} />
		</React.Fragment>
	)
}