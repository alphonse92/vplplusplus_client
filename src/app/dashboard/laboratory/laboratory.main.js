import React from 'react'
import { ProjectTable } from './project/project.table';

export const Main = (props) => {
	const pathname = 'laboratory/project/create/'
	const onCreateNewProject = (id) => props.history.push(`${pathname}${id ? id : ''}`)
	const onCreateNewProjectFromJson = (state) => props.history.push({ pathname, state })
	const onCreateReport = (id) => props.history.push('report/project/' + id)
	const eventProps = {
		onCreateNewProject,
		onCreateNewProjectFromJson,
		onCreateReport
	}
	return <ProjectTable {...eventProps} />
}