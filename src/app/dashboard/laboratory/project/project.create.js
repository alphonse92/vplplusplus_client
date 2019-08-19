/**
 * TODO:
 * improve the should component update method to detect if a confirmation modal is opened and not re render
 */

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
import { EditTestWindow } from './components/test.editor.window';
import { EditTestCaseWindow } from './components/test.case.editor.window';
import { WindowComponent } from '../../../../lib/components/window-manager';

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
				text: "You are closing the edition panel without save changes. Do you wanna save the changes before?",
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
			},
			testCase: {
				name: 'test-case',
				component: EditTestCaseWindow,
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
		const mock = () => ({
			name: 'My test ' + (this.props.tests.length + 1),
			tags: ['java', 'types'],
			description: 'Describe your test',
			objective: 'Set the Objective of this test',
			maxGrade: 5,
			code: "test code example " + Date.now(),
			test_cases: []
		})
		const { project, tests } = this.props
		tests.push(mock())
		this.props.DISPATCHERS.EDIT_PROJECT_DATA({ project, tests })

	}

	deleteTest = (index, test) => {
		const { project, tests: allTests } = this.props
		// eslint-disable no-unused-vars 
		const tests = allTests.filter((test, indexArray) => index !== indexArray)
		this.props.DISPATCHERS.EDIT_PROJECT_DATA({ project, tests })

	}

	setModalOpen = (modal, extraState = {}) => {
		this.setState({ modal, ...extraState })
	}

	editTest = (index, attribute) => {
		const path = `tests[${index}].${attribute}`
		const modalSchema = { ...get(ProjectCreateComponent.DEFAULTS.modals.test, attribute), path }
		this.setModalOpen(modalSchema)
	}

	closeModal = (extra = {}) => {
		this.setState({ modal: undefined, ...extra })
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

	preventUnsavedWindowChange = (payload) => {

		const { window: prevWindow } = payload
		const { nextWindow } = this.state

		const onCancel = () => {
			this.closeModal({ window: { ...prevWindow, setAsSaved: false }, nextWindow: undefined, waitingForConfirmation: false })
		}

		const onNext = () => {
			if (prevWindow.name === ProjectCreateComponent.DEFAULTS.windows.test.name)
				this.onWindowEmit(ProjectCreateComponent.DEFAULTS.windows.test.component.Events.save, payload)
			this.closeModal({ window: nextWindow, nextWindow: undefined, waitingForConfirmation: false })
		}

		const onClose = ({ ok }) => ok ? onNext() : onCancel()
		const { path } = prevWindow
		const modal = ProjectCreateComponent.DEFAULTS.modals.unsavedChanges
		const { title, text, component } = modal
		this.setModalOpen({ title, text, path, onClose, component }, { waitingForConfirmation: true })

	}

	saveTestCase = ({ window: payload }) => {
		const { project, tests } = this.props
		const { data } = payload
		const { indexTest, indexTestCase, test: test_case } = data

		tests[indexTest].test_cases[indexTestCase] = test_case
		this.props.DISPATCHERS.EDIT_PROJECT_DATA({ project, tests })
	}

	saveTest = (index, test) => {
		const { project, tests } = this.props
		tests[index] = test
		this.props.DISPATCHERS.EDIT_PROJECT_DATA({ project, tests })

	}

	saveTestCode = ({ window: payload }) => {
		const { index: test_index, test: testPayload } = payload.data
		const { code } = testPayload
		const test = { ...this.props.tests[test_index], code }

		this.saveTest(test_index, test)

	}

	onCreateTestCase = (index, test) => {
		const mock = () => ({
			name: 'New Test Case',
			objective: 'Objective of my first test case',
			grade: 5,
			code: ' test case code example ' + Date.now(),
			successMessage: 'successMessage',
			successMessageLink: 'successMessageLink',
			failureMessage: 'failureReferenceLink',
		})
		const { project, tests } = this.props
		tests[index].test_cases.push(mock())
		this.props.DISPATCHERS.EDIT_PROJECT_DATA({ project, tests })
	}

	onDeleteTestCase = (test_index, test_case_index, current_test) => {
		const { project, tests } = this.props
		const test = tests[test_index]
		const allTestCases = test.test_cases
		// eslint-disable no-unused-vars 
		const test_cases = allTestCases.filter((test_case, indexArray) => test_case_index !== indexArray)

		test.test_cases = test_cases
		tests[test_case_index] = test

		this.props.DISPATCHERS.EDIT_PROJECT_DATA({ project, tests })
	}

	onSelectTestCase = (indexTest, indexTestCase, testCase) => {
		const id = `${indexTest}-${indexTestCase}`
		this.showWindow(ProjectCreateComponent.DEFAULTS.windows.testCase,
			{ id, indexTest, indexTestCase, test: testCase, path: `test[${indexTest}].test_cases[${indexTestCase}]` })
	}


	onWindowEmit = (windowEvent, payload) => {
		if (windowEvent === 'close') return this.closeWindow()
		if (windowEvent === EditTestWindow.Events.save) return this.saveTestCode(payload)
		if (windowEvent === EditTestCaseWindow.Events.save) return this.saveTestCase(payload)
	}

	/**
	 * This method will be executed by an unmounting window.
	 */
	closeWindow = (payload) => {
		const { ok } = payload
		if (this.state.waitingForConfirmation) return
		if (!ok) return this.preventUnsavedWindowChange(payload)
	}

	showWindow = (window, data) => {

		const id = data.id
		const nextWindow = { ...window, data, id }
		if (!this.state.window) return this.setState({ window: nextWindow })
		if (this.state.window.id === nextWindow.id) return
		this.setState({ window: nextWindow, nextWindow })

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

		const onCloseModalDef = ({ ok, value }) => { ok ? this.setValueFromModal(value) : this.closeModal() }
		const onCloseModal = get(modal, 'onClose', onCloseModalDef)
		return (
			<React.Fragment>
				{
					(showModal && modal.component) && <Dialog
						handleClose={onCloseModal}
						open={showModal}
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
							onEditTestCode={(index, test) => {
								this.showWindow(ProjectCreateComponent.DEFAULTS.windows.test,
									{ id: index.toString(), index, test, path: `test[${index}]` })
							}}
							onSelectTestCase={(indexTest, indexTestCase, testCase) => {
								this.onSelectTestCase(indexTest, indexTestCase, testCase)
							}}
							onCreateTestCase={this.onCreateTestCase}
							onDeleteTestCase={this.onDeleteTestCase}
						/>
					</Flex>
					<Flex horizontal width="75%" margin="7px" >
						<Flex vertical width="100%" >
							<WindowComponent window={window} onClose={this.closeWindow} onEmit={this.onWindowEmit} />
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




