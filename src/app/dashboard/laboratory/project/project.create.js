import React from 'react'
import { Toolbar, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Flex } from '../../../..//lib/components/flex'
import { ProjectPreview } from './components/projectPreview';

class ProjectCreateComponent extends React.Component {
	defaultProject = [
		{
			id: Math.random(),
			name: 'My first project',
			tags: ['java', 'types'],
			description: 'Description of my first project',
			objective: 'Objective of my first project',
			maxGrade: 5,
			tests: [
				{
					id: Math.random(),
					name: 'My first Test case',
					objective: 'Objective of my first test case',
					grade: 5,
					successMessage: 'successMessage',
					successMessageLink: 'successMessageLink',
					failureMessage: 'failureReferenceLink',
				}
			]
		}
	]

	componentDidMount() {

	}

	createProject = () => {

	}

	onCreateTest = () => {

	}

	saveAllProject = (project) => {
		this.props.saveProject(project)
	}

	onFinish = () => {

	}

	render() {
		const { props } = this
		const { classes, projects = this.defaultProject } = props

		return (
			<React.Fragment>
				<Flex horizontal width='50%'>
					<ProjectPreview
						projects={projects}
						onSelectProject={this.onSelectProject}
						onCreateProject={this.onCreateProject}

						onCreateTest={this.onCreateTest}
						onSelectTest={this.onSelectTest}
						onFinish={this.onFinish}
					/>
				</Flex>
			</React.Fragment>
		)
	}
}

const styles = theme => {
	return ({
		root: {
			// width: '100%',
			// marginTop: theme.spacing.unit * 3,
		}
	});
}

const StyledProjectCreateComponent = withStyles(styles)(ProjectCreateComponent)
export const ProjectCreate = props => <StyledProjectCreateComponent {...props} />




