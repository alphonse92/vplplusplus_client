import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Toolbar } from '@material-ui/core';
import { Flex } from '../../../../lib/components/flex'
import { ProjectPreview } from './components/testPreview';
import { ActionCreators } from './redux/actions';
import { InputDialog } from '../../../../lib/components/material/modals/input/';
import { get, set, capitalize, camelCase } from 'lodash'
import { SelectDialog } from '../../../../lib/components/material/modals/select';
import { EditIcon } from '../../../../lib/components/material/EditIcon';
import { TestWindowEditor } from './components';
class ProjectCreateComponent extends React.Component {

	state = {}

	static DEFAULTS = {
		project: {
			name: "New Project",
			description: "Description of the new project",
			activity: 'No Vpl activity selected'
		},
		modals: {
			project: {
				name: {
					title: "Project Title",
					text: "Please set the project title. A project contains a set of tests to be executed",
				},
				description: {
					title: "Project Description",
					text: "The project description define the goal of this set of Tests.",
				},
				activity: {
					title: "Select Vpl Activity",
					text: "Select Vpl Activity"
				}
			},
			test: {
				name: {
					title: 'Set the Test Name',
					text: 'Please set the test name. A test will be converted to a JUnit Vpl ++ Class that will be executed be JUnit Runner VPL ++',
				},
				description: {
					title: 'Set the Test Description',
					text: 'The test description describe a general goal of a set of test cases.',
				},
				objective: {
					title: 'Set the Test Description',
					text: 'The test objective define the general goal of a set of test cases.',
				},
			}
		},
		windows: {
			editTestCode: {
				name: 'test-code',
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

	setModalOpen = (pathToObjectInProps, customTitle, customText) => {

		const schemaDefault = { ...get(ProjectCreateComponent.DEFAULTS.modals, pathToObjectInProps), ...{ title: customTitle, text: customText } }
		this.setState({
			modal: {
				path: pathToObjectInProps,
				...schemaDefault
			}
		})
	}

	editTest = (index, attribute) => {
		const fullpath = `tests[${index}].${attribute}`
		const modalSchema = { ...get(ProjectCreateComponent.DEFAULTS.modals.test, attribute) }
		this.setModalOpen(fullpath, modalSchema.title, modalSchema.text)
	}

	closeModal = () => {
		this.setState({ modal: null })
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

	showWindow = (window, windowData) => {
		const data = { ...window.data, ...windowData }
		const id = data.id || Date.now()
		const windowState = { ...window, data, id }
		this.editor = undefined
		this.setState({ window: windowState })
	}
	/**
	 * This methid will be passed to the editor did mount,
	 * to get the references to the monaco and editor objects
	 */
	setEditor = (editor, monaco) => {
		this.editor = editor
		this.monaco = monaco
	}

	setCodePreview = (codePreview) => {
		this.setState({ codePreview })
	}

	/**
	 * Get callback for on click method.
	 * Returns a code that wrap the base code according 
	 * the property passed (test ort test_case)
	 * 	 *
	 */
	getOnShowPreviewForProperty = (property, baseCode = "", window) => {
		const transformCodeByPropertyMap = {
			test: this.setTestCodePreview,
			test_case: this.setTestCodePreview
		}
		const fnDef = data => baseCode
		const fn = transformCodeByPropertyMap[property] || fnDef
		return () => fn(window.data[property])
	}

	/**
	 * get the code from test
	 */
	setTestCodePreview = (test, ) => {
		const codeEditor = this.editor.getValue()
		const code = `
public class ${capitalize(camelCase(test.name))} {
 ${codeEditor}
 // your unit test methods will be placed below
}
`
		return this.setCodePreview(code)
	}

	closePreviewWindow = () => {
		this.setState({ codePreview: undefined })
	}

	render() {
		const { props, state } = this
		const { modal, window = { name: 'code' }, codePreview: stateCodePreview } = state
		const { tests = [], project } = props

		const showModal = !!modal


		const Title = () => {
			const path = 'project.name'
			return (
				<Toolbar disableGutters>
					<h1>
						{get(this.props, path, ProjectCreateComponent.DEFAULTS.project.name)}
						<EditIcon onClick={() => this.setModalOpen(path)} />
					</h1>
				</Toolbar>
			)
		}
		const Description = () => {
			const path = 'project.description'
			return (
				<p className="description">
					{get(this.props, path, ProjectCreateComponent.DEFAULTS.project.description)}
					<EditIcon onClick={() => this.setModalOpen(path)} />
				</p>

			)
		}
		const Activity = () => {
			const path = 'project.activity'
			const { activity: activity_id } = project
			const isActivitySelecteed = !!activity_id
			const label = isActivitySelecteed
				? this.props.activities.find(({ course_module_id }) => course_module_id === activity_id).name
				: ProjectCreateComponent.DEFAULTS.project.activity
			return (
				<p className="activity">
					{label}
					<EditIcon onClick={() => this.setModalOpen(path)} />
				</p>
			)
		}

		const ProjectWindow = ({ currentWindow, name, component: Component, componentProps }) => {
			if (currentWindow.name === name) return <Component window={window} {...componentProps} />
			return <React.Fragment />
		}

		const EditTestOrTestCaseWindow = ({ property, window }) => {
			const baseCode = this.editor ? this.editor.getValue() : undefined
			return (<TestWindowEditor
				title="Test Code"
				description="Please configure your test code. This code will be placed before all of tests cases of JUnit Class. So, you can writte the @before, @beforeAll, @after and @afterAll methods of JUnit Life Cycle.
			Also, you can set the test class variables and use it into a test case"
				currentCode={stateCodePreview}
				editor={this.editor}
				setEditor={this.setEditor}
				getValue={() => window.data[property].code || window.data.code}
				onShowPreview={this.getOnShowPreviewForProperty(property, baseCode, window)}
				onClosePreview={this.closePreviewWindow}
			/>)

		}
		
		return (
			<React.Fragment>

				{showModal && <InputDialog
					handleClose={({ ok, value }) => ok ? this.setValueFromModal(value) : this.closeModal()}
					open={showModal}
					title={modal.title}
					text={modal.text} />}

				{
					showModal && <SelectDialog
						open={modal.path === 'project.activity'}
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
							onEditTestCode={(test) => this.showWindow(ProjectCreateComponent.DEFAULTS.windows.editTestCode, { test })}
						/>
					</Flex>
					<Flex horizontal width="75%" margin="7px" >
						<Flex vertical width="100%" >
							{window && <ProjectWindow
								currentWindow={window}
								name={ProjectCreateComponent.DEFAULTS.windows.editTestCode.name}
								component={EditTestOrTestCaseWindow}
								componentProps={{ property: 'test' }} />}
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




