import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { get, pick } from 'lodash'
import { Flex, Item } from '../../../../lib/components/flex'
import { ProjectPreview, TestCasePreview } from './components/testPreview';


import { ActionCreators } from './redux/actions';
import { PROJECT } from './redux/paths';

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


	showProjectModal = () => {
		this.props.TOGGLE_CREATE_PROJECT_DIALOG(true)
	}

	// Project events
	onCreateProject = (project) => {
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
		let currentTestCase = this.state.currentTestCase
		if (!currentTestCase) return this.setState({ currentTestCase: test })
		if (currentTestCase && currentTestCase.id === test.id) return this.onCloseTestCase()
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

			// project actions
			showProjectModal,
			onDeleteProject,
			onEditProject,
			// test cases action 
			onSelectTestCase,
			onCreateTestCase,
			onDeleteTestCase,
			onCloseTestCase,
			onEditTestCase,
		} = this

		const { projects = this.defaultProject } = props
		const { currentTestCase } = this.state
		return (
			<React.Fragment>

				<Flex horizontal>
					<ProjectPreview
						projects={projects}
						onCreateProject={showProjectModal}
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

const mapDispatchToProps = (dispatch) => bindActionCreators(
	pick(
		ActionCreators, [
			'TOGGLE_CREATE_PROJECT_DIALOG'
		]
	)
	, dispatch)

const mapStateToProps = (state) => ({
	show: get(state, `${PROJECT.root}.${PROJECT.dialogs.create.show}`),
	data: get(state, `${PROJECT.root}.${PROJECT.dialogs.create.data}`),
})

const ProjectListConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectListComponent)


export const ProjectList = props => <ProjectListConnected {...props} />





