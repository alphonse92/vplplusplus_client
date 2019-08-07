import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Toolbar } from '@material-ui/core';
import { Flex } from '../../../../lib/components/flex'
import { ProjectPreview } from './components/testPreview';
import { ActionCreators } from './redux/actions';

class ProjectCreateComponent extends React.Component {

	static mapStateToProps = (state) => {
		const { projects } = state
		const { create } = projects
		const { project, tests } = create
		return { ...project, tests }
	}

	static mapDispatchToProps = (dispatch) => {
		const DISPATCHERS = bindActionCreators({ ...ActionCreators }, dispatch)
		return { DISPATCHERS }
	}

	defaultTests = [
		{
			id: Math.random(),
			name: 'My first Test',
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
		},
		{
			id: Math.random(),
			name: 'My first Test',
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

	render() {
		const { props } = this
		const { projects = this.defaultTests } = props

		return (
			<React.Fragment>
				<Toolbar disableGutters><h1>New Project</h1></Toolbar>
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




