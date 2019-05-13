import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Flex, Item } from '../../../..//lib/components/flex'
import { ProjectPreview, TestCasePreview } from './components/projectPreview';

class ProjectListComponent extends React.Component {
	state = {}
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
				}
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

	saveAllProject = (project) => {
		this.props.saveProject(project)
	}

	onCreateProject = () => {

	}

	onDeleteProject = () => {

	}

	onEditProject = () => {

	}

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
			onCloseTestCase,
			onSelectTestCase,
			onCreateTestCase,
			onDeleteTestCase
		} = this

		const { classes, projects = this.defaultProject } = props
		const { currentTestCase } = this.state

		return (
			<React.Fragment>
				<Flex horizontal>
					<ProjectPreview
						projects={projects}

						onCreateProject={onCreateProject}
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
								onCloseTestCase={onCloseTestCase}
							/>
						</Item>

					}
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

const StyledProjectListComponent = withStyles(styles)(ProjectListComponent)
export const ProjectList = props => <StyledProjectListComponent {...props} />




