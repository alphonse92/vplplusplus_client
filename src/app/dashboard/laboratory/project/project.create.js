import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Toolbar } from '@material-ui/core';
import { Flex } from '../../../../lib/components/flex'
import { ProjectPreview } from './components/testPreview';
import { ActionCreators } from './redux/actions';
import { InputDialog } from '../../../../lib/components/material/modals/input/';
import { get } from 'lodash'
import { SelectDialog } from '../../../../lib/components/material/modals/select';
import { EditIcon } from '../../../../lib/components/material/EditIcon';
class ProjectCreateComponent extends React.Component {

	state = {}

	static DEFAULTS = {
		project: {
			name: "New Project",
			description: "Description of the new project",
			activity: 'No Vpl activity selected'
		},
		modals: {
			projectName: 'projectName',
			projectDescription: 'projectDescription',
			projectActivity: 'projectActivity'
		}
	}
	static mapStateToProps = (state) => {
		const { projects } = state
		const { create, course, topics } = projects
		const { project, tests } = create
		const { activities = [] } = course
		return { project, tests, activities, topics }
	}

	static mapDispatchToProps = (dispatch) => {
		const DISPATCHERS = bindActionCreators({ ...ActionCreators }, dispatch)
		return { DISPATCHERS }
	}

	componentDidMount() {
		this.props.DISPATCHERS.GET_MOODLE_ACTIVITIES()
		this.props.DISPATCHERS.GET_TOPICS()
	}

	createProject = () => {

	}

	onCreateTest = () => {

	}

	saveAllProject = (project) => {

	}

	onFinish = () => {

	}

	createNewTestcase = () => {
		const mock = {
			name: 'My test',
			tags: ['java', 'types'],
			description: 'Describe your test',
			objective: 'Set the Objective of this test',
			maxGrade: 5,
			test_cases: [
				// {
				// 	name: 'My first Test case',
				// 	objective: 'Objective of my first test case',
				// 	grade: 5,
				// 	successMessage: 'successMessage',
				// 	successMessageLink: 'successMessageLink',
				// 	failureMessage: 'failureReferenceLink',
				// }
			]
		}
		this.props.DISPATCHERS.ADD_TEST_TO_CURRENT_PROJECT(mock)
	}

	deleteTest = (index, test) => {
		this.props.DISPATCHERS.DELETE_TEST_FROM_CURRENT_PROJECT(index, test)
	}

	setModalOpen = (currentModal) => {
		this.setState({ currentModal })
	}
	closeModal = () => {
		this.setState({ currentModal: 'ANY' })
	}

	setProjectAttribute = (attribute, value) => {
		const project = { ...this.props.project, [attribute]: value }
		this.props.DISPATCHERS.CREATE_MODIFY_CURRENT_PROJECT(project)
		this.closeModal()
	}

	setMoodleActivity = ({ ok, value }) => {
		if (ok) this.setProjectAttribute('activity', Number(value))
		else this.closeModal()
	}

	openEditTestModal = (attributeName) => {

	}

	render() {
		const { props } = this
		const { tests = [], project } = props

		const Title = () => (
			<Toolbar disableGutters>
				<h1>
					{
						get(project, 'name', ProjectCreateComponent.DEFAULTS.project.name)
					}
					<EditIcon onClick={() => this.setModalOpen(ProjectCreateComponent.DEFAULTS.modals.projectName)} />
				</h1>
			</Toolbar>
		)
		const Description = () => (
			<p className="description">
				{get(project, 'description', ProjectCreateComponent.DEFAULTS.project.description)}
				<EditIcon onClick={() => this.setModalOpen(ProjectCreateComponent.DEFAULTS.modals.projectDescription)} />
			</p>
		)
		const Activity = () => {
			const { activity: activity_id } = project
			const isActivitySelecteed = !!activity_id
			const label = isActivitySelecteed
				? this.props.activities.find(({ course_module_id }) => course_module_id === activity_id).name
				: ProjectCreateComponent.DEFAULTS.project.activity
			return (
				<p className="description">
					{label}
					<EditIcon onClick={() => this.setModalOpen(ProjectCreateComponent.DEFAULTS.modals.projectActivity)} />
				</p>
			)
		}

		return (
			<React.Fragment>
				<InputDialog
					handleClose={({ ok, value }) => ok ? this.setProjectAttribute('name', value) : this.closeModal()}
					open={this.state.currentModal === ProjectCreateComponent.DEFAULTS.modals.projectName}
					title="Project Title" text="Please set the project title. A project contains a set of tests to be executed" />
				<InputDialog
					handleClose={({ ok, value }) => ok ? this.setProjectAttribute('description', value) : this.closeModal()}
					open={this.state.currentModal === ProjectCreateComponent.DEFAULTS.modals.projectDescription}
					title="Project descripton" text="The project description is" />
				
				<InputDialog
					handleClose={({ ok, value }) => ok ? this.setTestAttribute('description', value) : this.closeModal()}
					open={this.state.currentModal === ProjectCreateComponent.DEFAULTS.modals.projectDescription}
					title="Project descripton" text="The project description is" />

				<SelectDialog
					open={this.state.currentModal === ProjectCreateComponent.DEFAULTS.modals.projectActivity}
					title="Select Vpl Activity"
					optionsKey="course_module_id"
					onClose={this.setMoodleActivity}
					getLabel={option => option.name}
					getValue={option => option.course_module_id}
					options={this.props.activities} />
				<Title />
				<Description />
				<Activity />
				<Flex horizontal width="25%">
					<Flex vertical width="100%">
						<ProjectPreview
							tests={tests}
							onCreateTest={this.createNewTestcase}
							onDeleteTest={this.deleteTest}
							onEditTest={this.editTest}

							onSelectProject={this.onSelectProject}
							onSelectTest={this.onSelectTest}
							onFinish={this.onFinish}
						/>
					</Flex>

				</Flex>
				<Flex horizontal width='50%'>

				</Flex>
			</React.Fragment>
		)
	}
}

const ConnectedComponent = connect(
	ProjectCreateComponent.mapStateToProps,
	ProjectCreateComponent.mapDispatchToProps
)(ProjectCreateComponent)

export const ProjectCreate = props => <ConnectedComponent {...props} />




