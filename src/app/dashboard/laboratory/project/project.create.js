import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Card, Button, CardHeader, CardActions } from '@material-ui/core';
import { Flex } from '../../../../lib/components/flex'
import { ProjectPreview } from './components/testPreview';
import { ActionCreators } from './redux/actions';
import { ActionCreators as ActionCreatorsForErrors } from './../../../../redux/modals/actions';
import { InputDialog, ConfirmationDialog, Dialog } from '../../../../lib/components/material/modals/input/';
import { get, set } from 'lodash'
import { SelectDialog } from '../../../../lib/components/material/modals/select';
import { EditIcon } from '../../../../lib/components/material/EditIcon';
import { EditTestWindow } from './components/test.editor.window';
import { EditTestCaseWindow } from './components/test.case.editor.window';
import { WindowComponent } from '../../../../lib/components/window-manager';
import { TEST_CASE } from '../../../../constants';
import { Save } from '@material-ui/icons';
import { ProjectService } from '../../../../services/project';
import { WarningCard } from '../../../../lib/components/material/warningCard';
import { VplLang } from '../../../../redux/lang';

class ProjectCreateComponent extends React.Component {

	state = {}

	static DEFAULTS = {
		project: {
			name: <VplLang string="PROJECT_CREATE_NAME" />,
			description: <VplLang string="PROJECT_CREATE_DESCRIPTION" />,
			activity: <VplLang string="PROJECT_CREATE_NO_ACTIVITY_SELECTED" />,
		},
		modals: {
			unsavedChanges: {
				name: "modal-unsave-change",
				title: <VplLang string="PROJECT_NO_SAVED_CHANGES_TITLE" />,
				text: <VplLang string="PROJECT_NO_SAVED_CHANGES_DESCRIPTION" />,
				component: ConfirmationDialog
			},
			project: {
				name: {
					name: "project.name",
					path: 'project.name',
					title: <VplLang string="PROJECT_NAME_MODAL_TITLE" />,
					text: <VplLang string="PROJECT_NAME_MODAL_DESCRIPTION" />,
					component: InputDialog
				},
				description: {
					name: "project.description",
					path: 'project.description',
					title: <VplLang string="PROJECT_DESCRIPTION_MODAL_TITLE" />,
					text: <VplLang string="PROJECT_DESCRIPTION_MODAL_DESCRIPTION" />,
					component: InputDialog
				},
				activity: {
					name: "project.activity",
					path: 'project.activity',
					title: <VplLang string="PROJECT_ACTIVITY_MODAL_TITLE" />,
					text: <VplLang string="PROJECT_ACTIVITY_MODAL_DESCRIPTION" />,
					component: InputDialog
				}
			},
			test: {
				name: {
					name: "test.name",
					title: <VplLang string="PROJECT_TEST_NAME_MODAL_TITLE" />,
					text: <VplLang string="PROJECT_TEST_NAME_MODAL_DESCRIPTION" />,
					component: InputDialog
				},
				description: {
					name: "test.description",
					title: <VplLang string="PROJECT_TEST_DESCRIPTION_MODAL_TITLE" />,
					text: <VplLang string="PROJECT_TEST_DESCRIPTION_MODAL_DESCRIPTION" />,
					component: InputDialog
				},
				objective: {
					name: "test.objective",
					title: <VplLang string="PROJECT_TEST_OBJECTIVE_MODAL_TITLE" />,
					text: <VplLang string="PROJECT_TEST_OBJECTIVE_MODAL_DESCRIPTION" />,
					component: InputDialog
				},
			}
		},
		windows: {
			test: {
				name: 'Test Window',
				component: EditTestWindow,
			},
			testCase: {
				name: 'Test Case Window',
				component: EditTestCaseWindow,
			}
		}
	}

	static mapStateToProps = (state) => {
		const { projects } = state
		const { create, course, topics, error } = projects
		const { project, tests } = create
		const { activities = [] } = course
		return { error, project, tests, activities, topics: topics.list.pagination.docs }
	}

	static mapDispatchToProps = (dispatch) => {
		const DISPATCHERS = {
			...bindActionCreators({ ...ActionCreators }, dispatch),
			...bindActionCreators({ ...ActionCreatorsForErrors }, dispatch)
		}
		return { DISPATCHERS }
	}

	componentWillUnmount() {
		this.props.DISPATCHERS.EDIT_PROJECT_DATA({ project: {}, data: [] })
	}

	componentDidMount() {
		const { id } = this.props.match.params
		const { state: locationState = {} } = this.props.location
		const { tests = [], ...project } = locationState
		id
			? this.props.DISPATCHERS.LOAD_PROJECT(id)
			: this.props.DISPATCHERS.EDIT_PROJECT_DATA({ project, tests })
		this.props.DISPATCHERS.GET_MOODLE_ACTIVITIES()
		this.props.DISPATCHERS.GET_TOPICS()
	}

	loadProjectData = () => {
		const { id } = this.props.match.params
		this.props.DISPATCHERS.LOAD_PROJECT(id)
	}

	createOrSaveProject = (data) => {

		if (this.isProjectBlocked()) return

		this.props.DISPATCHERS.CREATE_PROJECT(data, {
			onError: this.props.DISPATCHERS.SET_ERROR,
		})
	}

	updateProjectData = data => {
		if (this.isProjectSavedAndIsBeingEdited()) return this.createOrSaveProject(data)
		this.props.DISPATCHERS.EDIT_PROJECT_DATA(data)
	}

	saveTestCase = ({ window: payload }) => {
		const { project, tests } = this.props
		const { data } = payload
		const { indexTest, indexTestCase, test: test_case } = data

		if (!Number(test_case.grade)) {
			this.props.DISPATCHERS.SET_MODAL({
				type: 'info',
				title: <VplLang string="PROJECT_INFO_MODAL_TEST_CASE_GRADE_IS_ZERO_TITLE" />,
				text: <VplLang string="PROJECT_INFO_MODAL_TEST_CASE_GRADE_IS_ZERO_DESCRIPTION" />,
			})
		}

		tests[indexTest].test_cases[indexTestCase] = test_case
		this.updateProjectData({ project, tests })
	}

	handleCreateProject = () => {
		const { project, tests } = this.props
		this.createOrSaveProject({ project, tests })
	}

	handleCreateTest = () => {
		const mock = () => ({
			name: 'My test ' + (this.props.tests.length + 1),
			tags: ['java', 'types'],
			description: 'Describe tu test',
			objective: 'Coloca el objetivo de tu test',
			maxGrade: 5,
			code: `/**
 * 
 * Este es el cuerpo de una prueba unitaria de JUnit
 * Tu podrías acá:
 *  1. Declarar variables
 *  2. Declarar metodos del ciclo de vida de JUnit como BeforeAll
 *  3. Crear métodos privados
 *  4. Declarar instancias privadas, por ejemplo las clases que los estudiantes crearon
 * 
 * Por ejemplo, abajo estoy declarando la clase StudentClass y la llamé studentClassToBeTested
 */
private StudentClass studentClassToBeTested;	
/* 
 * Finalmente acá la estoy declarando
 */

 @Before
 public void doSomeTestOnAMethod() {
	 studentClassToBeTested = new StudentClass();
}`,
			test_cases: []
		})
		const { project, tests } = this.props
		tests.push(mock())
		const data = { project, tests }
		this.updateProjectData(data)
	}

	deleteTestFromStore = (project, index) => {
		const { tests: allTests } = this.props
		// eslint-disable no-unused-vars 
		const tests = allTests.filter((test, indexArray) => index !== indexArray)
		const windowId = index.toString()
		if (this.state.window && this.state.window.id === windowId) this.forceCloseWindow()
		this.props.DISPATCHERS.EDIT_PROJECT_DATA({ project, tests })
	}

	deleteTestFromAPI = (project, test) => {
		return this.props.DISPATCHERS.DELETE_TEST(project._id, test._id)
	}

	handleDeleteTest = (index, test) => {
		const { project } = this.props
		this.deleteTestFromStore(project, index)
		if (test._id) return this.deleteTestFromAPI(project, test)

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

		this.updateProjectData(data)
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
			// just close the modal and return the window to the previous state
			this.closeModal({ window: { ...prevWindow, setAsSaved: false }, nextWindow: nextWindow, waitingForConfirmation: false })
		}

		// handle the data without window intervention 
		const onNext = () => {

			// if the closed window was the test window, then trigger the save test event
			if (prevWindow.name === ProjectCreateComponent.DEFAULTS.windows.test.name) {
				this.onWindowEmit(ProjectCreateComponent.DEFAULTS.windows.test.component.Events.save, payload)
			}			// if the closed window was the test case window, then trigger the save test case event
			else if (prevWindow.name === ProjectCreateComponent.DEFAULTS.windows.testCase.name) {
				this.onWindowEmit(ProjectCreateComponent.DEFAULTS.windows.testCase.component.Events.save, payload)
			}
			// close the modal
			this.closeModal({ window: nextWindow, nextWindow: undefined, waitingForConfirmation: false })
		}

		// if user confirm, then next, else just cancel
		const onClose = ({ ok }) => ok ? onNext() : onCancel()
		const { path } = prevWindow
		const modal = ProjectCreateComponent.DEFAULTS.modals.unsavedChanges
		const { title, text, component } = modal
		// set the onClose modal event to handle the confirmation response from the modal.
		this.setModalOpen({ title, text, path, onClose, component }, { waitingForConfirmation: true })

	}

	closeWindow = (payload) => {
		const { ok } = payload
		if (this.state.waitingForConfirmation) return
		if (!ok && !this.state.forceCloseWindow) return this.preventUnsavedWindowChange(payload)
		this.setState({ window: this.state.nextWindow, forceCloseWindow: false })
	}


	showWindow = (windowToBeOpen, data) => {
		const id = data.id
		const nextWindow = { ...windowToBeOpen, data, id, readOnly: this.isProjectBlocked() }
		document.getElementById('VPL_APP_ROOT').scrollTo(0, 0)
		if (!this.state.window) {
			return this.setState({ window: nextWindow })
		}

		if (this.state.window.id === nextWindow.id) {
			return
		}

		this.setState({ window: undefined, nextWindow })
	}

	saveTest = (index, test) => {
		const { project, tests } = this.props
		tests[index] = test
		this.updateProjectData({ project, tests })
	}

	saveTestCode = ({ window: payload }) => {
		const { index: test_index, test: testPayload } = payload.data
		const { code } = testPayload
		const test = { ...this.props.tests[test_index], code }

		this.saveTest(test_index, test)

	}

	createTestCaseToTheStore = (index, test) => {
		const { project, tests } = this.props
		tests[index].test_cases.push({ ...TEST_CASE, topic: this.props.topics[0] ? [this.props.topics[0]] : [] })
		this.props.DISPATCHERS.EDIT_PROJECT_DATA({ project, tests })
	}

	handleCreateTestCase = (index, test) => {
		this.createTestCaseToTheStore(index, test)
		if (this.isProjectSavedAndIsBeingEdited()) return this.createOrSaveProject()
	}

	deleteTestCaseFromStore = (project, test, test_index, test_case_index) => {
		const { tests } = this.props

		const allTestCases = test.test_cases
		// eslint-disable no-unused-vars 
		const test_cases = allTestCases.filter((test_case, indexArray) => test_case_index !== indexArray)

		test.test_cases = test_cases
		tests[test_case_index] = test

		const windowId = this.getTestCaseId(test_index, test_case_index)

		if (this.state.window && this.state.window.id === windowId) this.forceCloseWindow()

		this.props.DISPATCHERS.EDIT_PROJECT_DATA({ project, tests })

	}

	deleteTestCaseFromAPI = (project, test, test_case) => {
		this.props.DISPATCHERS.DELETE_TEST_CASE(project.id, test._id, test_case._id, { after: this.loadProjectData })
	}

	handleTestCaseDelete = (test_index, test_case_index, test_case) => {
		const { project, tests } = this.props
		const test = tests[test_index]
		if (test_case._id) this.deleteTestCaseFromAPI(project, test, test_case)
		else this.deleteTestCaseFromStore(project, test, test_index, test_case_index)
	}

	getTestCaseId = (test_index, test_case_index) => `${test_index}-${test_case_index}`

	onSelectTestCase = (test_index, test_case_index, testCase, topics) => {
		const id = this.getTestCaseId(test_index, test_case_index)

		this.showWindow(ProjectCreateComponent.DEFAULTS.windows.testCase,
			{ id, topics, indexTest: test_index, indexTestCase: test_case_index, test: testCase, path: `test[${test_index}].test_cases[${test_case_index}]` })
	}


	onWindowEmit = (windowEvent, payload) => {
		if (windowEvent === 'close') return this.closeWindow()
		if (windowEvent === EditTestWindow.Events.save) return this.saveTestCode(payload)
		if (windowEvent === EditTestCaseWindow.Events.save) return this.saveTestCase(payload)
	}


	areThereTestCasesWithZeroGrade = () => {
		const { tests } = this.props
		for (let idxTest in tests) {
			const test = tests[idxTest]
			const { test_cases } = test
			for (let idxTestCase in test_cases) {
				const testCase = test_cases[idxTestCase]
				if (testCase.grade === 0) return true;
			}

		}
	}
	forceCloseWindow = extraState => this.setState({ window: undefined, forceCloseWindow: true, ...extraState })
	isProjectBlocked = () => ProjectService.isBlocked(this.props.project)
	isProjectSavedAndIsBeingEdited = () => !!this.props.project._id
	render() {
		const { props, state } = this
		let { modal, window } = state
		const { tests = [], project } = props
		const { exported = false } = project
		const showModal = !!modal
		const activities = this.props.activities || []
		const { activity: activity_id } = project
		const isActivitySelected = !!activity_id
		const showZeroGradeMessage = this.areThereTestCasesWithZeroGrade()
		const activity = isActivitySelected
			? activities.find(({ course_module_id }) => course_module_id === activity_id)
			: ProjectCreateComponent.DEFAULTS.project.activity
		const moodle_activity_label = activity ? activity.name : ''
		const isBlocked = this.isProjectBlocked()

		const onCloseModalDef = ({ ok, value }) => { ok ? this.setValueFromModal(value) : this.closeModal() }
		const onCloseModal = get(modal, 'onClose', onCloseModalDef)

		const NameAndDescription = () => <Flex vertical width="100%" margin="7px">
			<Card>
				<CardHeader
					action={
						<small>{this.isProjectBlocked() ? <VplLang string="PROJECT_NOT_EDITABLE" /> : <VplLang string="PROJECT_CREATE_EDITING_ON" />}: {this.props.project._id || <VplLang string="PROJECT_CREATE_NAME" />} </small>
					}
					title={
						<React.Fragment>
							{get(this.props, 'project.name', ProjectCreateComponent.DEFAULTS.project.name)}
							{!isBlocked && <EditIcon onClick={() => this.setModalOpen(ProjectCreateComponent.DEFAULTS.modals.project.name)} />}
						</React.Fragment>
					}
					subheader={
						<React.Fragment>
							{get(this.props, 'project.description', ProjectCreateComponent.DEFAULTS.project.description)}
							{!isBlocked && <EditIcon onClick={() => this.setModalOpen(ProjectCreateComponent.DEFAULTS.modals.project.description)} />}
						</React.Fragment>
					}
				/>
				<CardActions>
					{
						!this.props.project._id && <Button onClick={this.handleCreateProject} color="primary">{this.props.project._id ? <VplLang string="SAVE" /> : <VplLang string="CREATE" />} { <VplLang string="PROJECT" />} <Save /></Button>
					}
				</CardActions>
			</Card>
		</Flex>

		const ProjectActivity = () => <Flex vertical width="100%" margin="7px">
			<Card>
				<CardHeader
					title={<VplLang string="PROJECT_ACTIVITY_MODAL_TITLE" />}
					subheader={
						<React.Fragment>
							{moodle_activity_label}
							{!isBlocked && <EditIcon onClick={() => this.setModalOpen(ProjectCreateComponent.DEFAULTS.modals.project.activity)} />}
						</React.Fragment>
					}
				/>
			</Card>
		</Flex>

		const ProjectInfoHeader = () => (
			<Flex vertical width="100%">
				<NameAndDescription />
				{exported && <ProjectActivity />}
			</Flex>
		)

		const final_view = (
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

				<ProjectInfoHeader />
				<WarningCard show={showZeroGradeMessage} title={<VplLang string="PROJECT_INFO_MODAL_TEST_CASE_GRADE_IS_ZERO_TITLE" />} message={<VplLang string="PROJECT_INFO_MODAL_TEST_CASE_GRADE_IS_ZERO_DESCRIPTION" />} />
				<Flex horizontal width="100%">
					<Flex vertical width="25%" margin="7px" >
						{project._id && <ProjectPreview
							editable={!isBlocked}
							tests={tests}
							onCreateTest={this.handleCreateTest}
							onDeleteTest={this.handleDeleteTest}
							onEditTest={this.editTest}
							onEditTestCode={(index, test) => {
								this.showWindow(ProjectCreateComponent.DEFAULTS.windows.test,
									{ id: index.toString(), index, test, path: `test[${index}]` })
							}}
							onSelectTestCase={(indexTest, indexTestCase, testCase) => {
								this.onSelectTestCase(indexTest, indexTestCase, testCase, this.props.topics)
							}}
							onCreateTestCase={this.handleCreateTestCase}
							onDeleteTestCase={this.handleTestCaseDelete}
						/>}
					</Flex>
					<Flex vertical width="75%" margin="7px" >
						<Flex vertical width="100%" >
							<WindowComponent window={window} onClose={this.closeWindow} onEmit={this.onWindowEmit} />
						</Flex>
					</Flex>
				</Flex>
			</React.Fragment >
		)

		return this.props.match.params.id && !this.props.project._id
			? <p>Loading</p>
			: final_view
	}
}

const ConnectedComponent = connect(
	ProjectCreateComponent.mapStateToProps,
	ProjectCreateComponent.mapDispatchToProps
)(ProjectCreateComponent)

export const ProjectCreate = props => <ConnectedComponent {...props} />




