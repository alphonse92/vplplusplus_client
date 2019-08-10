import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Toolbar } from '@material-ui/core';
import { Flex } from '../../../../lib/components/flex'
import { ProjectPreview } from './components/testPreview';
import { ActionCreators } from './redux/actions';
import { InputDialog, ConfirmationDialog, Dialog } from '../../../../lib/components/material/modals/input/';
import { get, set } from 'lodash'
import { SelectDialog } from '../../../../lib/components/material/modals/select';
import { EditIcon } from '../../../../lib/components/material/EditIcon';
import { EditTestWindow } from './components/test.editor';
class ProjectCreateComponent extends React.Component {

	state = {}

	static DEFAULTS = {
		project: {
			name: "New Project",
			description: "Description of the new project",
			activity: 'No Vpl activity selected'
		},
		modals: {
			unsavedChanges: {
				name: "modal-unsave-change",
				title: "Unsaved changes detected",
				text: "You are closing the edition panel without save changes. Are you sure to continue ?.",
				component: ConfirmationDialog
			},
			project: {
				name: {
					name: "project.name",
					path: 'project.name',
					title: "Project Title",
					text: "Please set the project title. A project contains a set of tests to be executed",
					component: InputDialog
				},
				description: {
					name: "project.description",
					path: 'project.description',
					title: "Project Description",
					text: "The project description define the goal of this set of Tests.",
					component: InputDialog
				},
				activity: {
					name: "project.activity",
					path: 'project.activity',
					title: "Select Vpl Activity",
					text: "Select Vpl Activity",
					component: InputDialog
				}
			},
			test: {
				name: {
					name: "test.name",
					title: 'Set the Test Name',
					text: 'Please set the test name. A test will be converted to a JUnit Vpl ++ Class that will be executed be JUnit Runner VPL ++',
					component: InputDialog
				},
				description: {
					name: "test.description",
					title: 'Set the Test Description',
					text: 'The test description describe a general goal of a set of test cases.',
					component: InputDialog
				},
				objective: {
					name: "test.objective",
					title: 'Set the Test Description',
					text: 'The test objective define the general goal of a set of test cases.',
					component: InputDialog
				},
			}
		},
		windows: {
			test: {
				name: 'test',
				component: EditTestWindow,
				data: {
					code: `
private StudentClass test;

@Before
public void setUp(){
	test = new StudentClass();
}`

				}
			}
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



	createNewTestcase = () => {
		const mock = {
			name: 'My test',
			tags: ['java', 'types'],
			description: 'Describe your test',
			objective: 'Set the Objective of this test',
			maxGrade: 5,
			test_cases: [
				{
					name: 'My first Test case',
					objective: 'Objective of my first test case',
					grade: 5,
					successMessage: 'successMessage',
					successMessageLink: 'successMessageLink',
					failureMessage: 'failureReferenceLink',
				}
			]
		}
		const { project, tests } = this.props
		tests.push(mock)
		this.props.DISPATCHERS.EDIT_PROJECT_DATA({ project, tests })

	}

	deleteTest = (index, test) => {
		const { project, tests: allTests } = this.props
		// eslint-disable no-unused-vars 
		const tests = allTests.filter((test, indexArray) => index !== indexArray)
		this.props.DISPATCHERS.EDIT_PROJECT_DATA({ project, tests })

	}

	setModalOpen = (modal) => {
		this.setState({ modal })
	}

	editTest = (index, attribute) => {
		const path = `tests[${index}].${attribute}`
		const modalSchema = { ...get(ProjectCreateComponent.DEFAULTS.modals.test, attribute), path }
		this.setModalOpen(modalSchema)
	}

	closeModal = () => {
		this.setState({ modal: undefined })
	}

	setValueFromModal = (value) => {
		const { path } = this.state.modal
		const { project, tests } = this.props
		const data = { project, tests }

		set(data, path, value)

		this.props.DISPATCHERS.EDIT_PROJECT_DATA(data)
		this.closeModal()
	}

	setMoodleActivity = ({ ok, value }) => {
		if (ok) this.setProjectAttribute('activity', Number(value))
		else this.closeModal()
	}

	saveTest = (index, test) => {

	}


	preventUnsavedWindowChange = (window, data, nextWindow) => {
		console.log('prevent un saved changes', { window, data, nextWindow })

		const onCancel = () => {
			console.log('skiping changes')
			const returnWindow = { ...window, data }
			this.setState({ window: returnWindow })
		}

		const onSave = () => {
			console.log('saving changes')
			this.setState({ window: nextWindow })
		}

		const onClose = ({ ok }) => ok ? onSave() : onCancel()

		const path = `test[${window.data.index}]`
		const modal = ProjectCreateComponent.DEFAULTS.modals.unsavedChanges
		const { title, text } = modal

		this.setModalOpen({ title, text, path, onClose })

	}

	closeWindow = (payload) => {
		const { ok, window, data } = payload
		const { window: nextWindow } = this.state
		if (!ok) return this.preventUnsavedWindowChange(window, data, nextWindow)
	}

	showWindow = (window, windowData) => {

		const data = { ...window.data, ...windowData }
		const id = data.id || Date.now()
		const windowState = { ...window, data, id }
		this.setState({ window: windowState })

	}

	closePreviewWindow = () => {
		this.setState({ codePreview: undefined })
	}

	shouldComponentUpdate() {
		return !this.state.stopRendering
			|| this.state.modal.name !== ProjectCreateComponent.DEFAULTS.modals.unsavedChanges.name
	}

	render() {
		const { props, state } = this
		const { modal, window } = state
		const { tests = [], project } = props

		const showModal = !!modal


		const Title = () => {
			return (
				<Toolbar disableGutters>
					<h1>
						{get(this.props, 'project.name', ProjectCreateComponent.DEFAULTS.project.name)}
						<EditIcon onClick={() => this.setModalOpen(ProjectCreateComponent.DEFAULTS.modals.project.name)} />
					</h1>
				</Toolbar>
			)
		}
		const Description = () => {
			return (
				<p className="description">
					{get(this.props, 'project.description', ProjectCreateComponent.DEFAULTS.project.description)}
					<EditIcon onClick={() => this.setModalOpen(ProjectCreateComponent.DEFAULTS.modals.project.description)} />
				</p>

			)
		}
		const Activity = () => {
			const { activity: activity_id } = project
			const isActivitySelecteed = !!activity_id
			const label = isActivitySelecteed
				? this.props.activities.find(({ course_module_id }) => course_module_id === activity_id).name
				: ProjectCreateComponent.DEFAULTS.project.activity
			return (
				<p className="activity">
					{label}
					<EditIcon onClick={() => this.setModalOpen(ProjectCreateComponent.DEFAULTS.modals.project.activity)} />
				</p>
			)
		}

		const WindowComponent = ({ window, onClose, component }) => {
			const Component = window.component
			return <Component window={window} onClose={onClose} />
		}
		const onCloseModalDef = ({ ok, value }) => ok ? this.setValueFromModal(value) : this.closeModal()
		const onCloseModal = get(modal, 'onClose', onCloseModalDef)

		return (
			<React.Fragment>
				{
					(showModal && modal.component) && <Dialog
						handleClose={onCloseModal}
						open={showModal}
						onRender={() => this.setState({ stopRendering: true })}
						component={modal.component}
						title={modal.title}
						text={modal.text} />
				}
				{
					(showModal && modal.path === 'project.activity') && <SelectDialog
						open={true}
						title={modal.title}
						text={modal.text}
						optionsKey="course_module_id"
						onClose={({ ok, value }) => ok ? this.setValueFromModal(Number(value)) : this.closeModal()}
						getLabel={option => option.name}
						getValue={option => option.course_module_id}
						options={this.props.activities} />
				}

				<Flex vertical width="100%" margin="7px">
					<Title />
					<Description />
					<Activity />
				</Flex>

				<Flex horizontal width="100%">
					<Flex vertical width="25%" margin="7px" >
						<ProjectPreview
							editable={!project.summaries || project.summaries.length === 0}
							tests={tests}
							onCreateTest={this.createNewTestcase}
							onDeleteTest={this.deleteTest}
							onEditTest={this.editTest}
							onEditTestCode={(test, index) => this.showWindow(ProjectCreateComponent.DEFAULTS.windows.test, { index, test })}
						/>
					</Flex>
					<Flex horizontal width="75%" margin="7px" >
						<Flex vertical width="100%" >
							{window && <WindowComponent window={window} onClose={this.closeWindow} />}
						</Flex>
					</Flex>
				</Flex>

			</React.Fragment >
		)
	}
}

const ConnectedComponent = connect(
	ProjectCreateComponent.mapStateToProps,
	ProjectCreateComponent.mapDispatchToProps
)(ProjectCreateComponent)

export const ProjectCreate = props => <ConnectedComponent {...props} />




