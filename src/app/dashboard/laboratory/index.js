import React from 'react'
import { Header } from 'semantic-ui-react'
import { ProjectTable } from './project/project.table';

export const LaboratoryContainer = (props) => {
	return (
		<React.Fragment>
			<Header as='h1' dividing>Virtual Programming Lab Projects</Header>
			<ProjectTable />
		</React.Fragment>
	)
}