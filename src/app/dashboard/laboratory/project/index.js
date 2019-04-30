import React from 'react'
import { ProjectTable } from './project.table';
import { Header } from 'semantic-ui-react';

export const Project = () => {
	return (
		<React.Fragment>
			<Header as="h1" dividing>Virtual Programming Lab ++ Sandbox </Header>
			<ProjectTable />
		</React.Fragment>
	)
}