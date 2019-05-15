import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Flex, Item } from '../../../..//lib/components/flex'
import { ProjectPreview, TestCasePreview } from './components/projectPreview';
import { ProjectFormDialog } from './dialogs/project.create.dialog';

class ProjectListComponent extends React.Component {
	state = {
		dialogs: {
			project: false,
			testCase: false
		}
	}
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
					successMessageLink: 'http://google.com',
					failureMessage: 'failureReferenceLink',
					failureMessageLink: 'http://google.com',
				},
				{
					id: Math.random(),
					name: 'My first Test case',
					objective: 'Objective of my first test case',
					grade: 5,
					successMessage: 'successMessage',
					successMessageLink: 'http://google.com',
					failureMessage: 'failureReferenceLink',
					failureMessageLink: 'http://google.com',
				},
				{
					id: Math.random(),
					name: 'My first Test case',
					objective: 'Objective of my first test case',
					grade: 5,
					successMessage: 'successMessage',
					successMessageLink: 'http://google.com',
					failureMessage: 'failureReferenceLink',
					failureMessageLink: 'http://google.com',
				},
				{
					id: Math.random(),
					name: 'My first Test case',
					objective: 'Objective of my first test case',
					grade: 5,
					successMessage: 'successMessage',
					successMessageLink: 'http://google.com',
					failureMessage: 'failureReferenceLink',
					failureMessageLink: 'http://google.com',
				},
			]
		},
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
					successMessageLink: 'http://google.com',
					failureMessage: 'failureReference',
					failureMessageLink: 'http://google.com',
				}
			]
		}
	]

	componentDidMount() {

	}

	// dialogs

	toggleDialog = (dialog, value) => {
		const state = this.state
		const isOpen = typeof value === 'undefined'
			? this.state.dialogs[dialog]
			: !!value
		const newState = { ...state }
		newState.dialogs[dialog] = !isOpen
		this.setState(newState)
	}

	// Project events
	onCreateProject = (project) => {
		console.log("on Project create", project)
		this.toggleDialog('project', false)
	}

	onDeleteProject = () => {

	}

	onEditProject = () => {

	}


	saveAllProject = (project) => {
		this.props.saveProject(project)
	}

	// test case events

	onCloseTestCase = () => this.setState({ currentTestCase: undefined })
	onSelectTestCase = (test) => {
		console.log(test)
		let currentTestCase = this.state.currentTestCase
		if (!currentTestCase) return this.setState({ currentTestCase: test })
		if (currentTestCase && currentTestCase.id == test.id) return this.onCloseTestCase()
		return this.setState({ currentTestCase: test })
	}

	onCreateTestCase = () => {

	}

	onEditTestCase = () => {

	}

	onDeleteTestCase = () => {

	}

	render() {
		const {
			props,
			state,
			// project actions
			onCreateProject,
			onDeleteProject,
			onEditProject,
			// test cases action 
			onSelectTestCase,
			onCreateTestCase,
			onDeleteTestCase,
			onCloseTestCase,
			onEditTestCase,
		} = this

		const {
			dialogs
		} = state

		const openProjectDialog = () => this.toggleDialog('project', false)

		const { classes, projects = this.defaultProject } = props
		const { currentTestCase } = this.state

		return (
			<React.Fragment>
				<ProjectFormDialog />
				<Flex horizontal>
					<ProjectPreview
						projects={projects}
						onCreateProject={openProjectDialog}
						onDeleteProject={onDeleteProject}
						onEditProject={onEditProject}
						onSelectTestCase={onSelectTestCase}
						onCreateTestCase={onCreateTestCase}
						onDeleteTestCase={onDeleteTestCase}
					/>

					{
						currentTestCase &&
						<Item flexGrow='1'>
							<TestCasePreview
								test={currentTestCase}
								onCreateTestCase={onCreateTestCase}
								onDeleteTestCase={onDeleteTestCase}
								onEditTestCase={onEditTestCase}
								onCloseTestCase={onCloseTestCase} />
						</Item>

					}
				</Flex>
			</React.Fragment>
		)
	}
}

const styles = theme => {
	return ({
		root: {}
	});
}

const StyledProjectListComponent = withStyles(styles)(ProjectListComponent)
export const ProjectList = props => <StyledProjectListComponent {...props} />




