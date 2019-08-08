import React from 'react';
import {
	Paper
	, IconButton
	, List
	, ListSubheader
	, ListItem
	, ListItemIcon
	, ListItemText
	, ListItemSecondaryAction
	, Card
	, CardHeader
	, CardActions
	, CardContent
	, Collapse
	, Table
	, TableHead
	, TableBody
	, TableRow
	, TableCell
} from '@material-ui/core';

import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Close as CloseIcon,
	CreateNewFolder as CreateNewFolderIcon,
	FormatListNumbered as FormatListNumberedIcon,
	ExpandLess as ExpandLessIcon,
	ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';

import Typography from '@material-ui/core/Typography';
import { Flex } from '../../../../../../lib/components/flex';
import { CodeEditor } from '../../../../../../lib/components/code';
import { EditIcon as EditIconMaterial } from '../../../../../../lib/components/material/EditIcon';

import './styles.sass'

const SubHeader = ({ text }) => <ListSubheader component="div">{text}</ListSubheader>
const PreviewWrapper = props => <div className="previewProjects">{props.children}</div>
const ProjectsWrapper = props => <div className="projects">{props.children}</div>
const TestsWrapper = props => <List component="nav" className="tests" subheader={<SubHeader text="Test cases" />}>{props.children}</List>



const ProjectPreviewTestItem = ({ onSelectTestCase, onDeleteTestCase, test }) => (
	<ListItem button onClick={() => onSelectTestCase(test)}>
		<ListItemIcon>
			<i className="fas fa-flask"></i>
		</ListItemIcon>
		<ListItemText inset primary={test.name} secondary={test.objective} />
		<ListItemSecondaryAction onClick={() => onDeleteTestCase(test)}>
			<IconButton aria-label="Remove">
				<DeleteIcon />
			</IconButton>
		</ListItemSecondaryAction>
	</ListItem>
)



const ProjectDescriptionCard =
	({
		onToggle,
		isOpen = true,
		onEditProject,
		onCreateTestCase,
		onDeleteProject,
		project }) => (
			<Card elevation={0}>
				<CardContent>
					<Typography color="textSecondary" gutterBottom>Project Name</Typography>
					<Typography variant="h5" component="h2" gutterBottom onClick={onToggle}>
						{project.name}
						<IconButton>
							{isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
						</IconButton>
					</Typography>

					<Collapse in={isOpen} timeout="auto" unmountOnExit>
						<Typography color="textSecondary" gutterBottom>Description </Typography>
						<Typography component="p" gutterBottom>{project.description} <EditIconMaterial onClick={onEditProject} /></Typography>

						<Typography color="textSecondary" gutterBottom>Objective</Typography>
						<Typography component="p" gutterBottom>{project.objective}</Typography>

						<Typography color="textSecondary" gutterBottom>Max Grade</Typography>
						<Typography component="p" gutterBottom>{project.maxGrade}</Typography>

						<Typography color="textSecondary" gutterBottom>Tags</Typography>
						<Typography component="p" gutterBottom>{project.tags && project.tags.join(', ')}</Typography>
					</Collapse>
				</CardContent>
				<CardActions>
					<IconButton onClick={onDeleteProject} aria-label="Edit Project">
						<DeleteIcon />
					</IconButton>
					<IconButton onClick={onEditProject} aria-label="Delete Project">
						<EditIcon />
					</IconButton>
					<IconButton onClick={onCreateTestCase}>
						<i className="fas fa-plus " />
					</IconButton>
				</CardActions>
			</Card>
		)

class Project extends React.Component {
	state = {
		open: {
			project: true,
			description: true
		}
	}
	handleClose = window => () => this.setState({ open: Object.assign(this.state.open, { [window]: !this.state.open[window] }) })
	render() {
		const { state, props, handleClose } = this
		const {
			project,
			index,
			onEditProject: editProjectBase,
			onDeleteProject,
			onSelectTestCase,
			onCreateTestCase,
			onDeleteTestCase,
		} = props
		const onEditProject = console.log
		const { open } = state
		return (
			<div className="project">
				<ListItem button onClick={handleClose('project')}>
					<ListItemIcon>
						<FormatListNumberedIcon />
					</ListItemIcon>
					<ListItemText inset primary={project.name} secondary={project.description} />
					{open.project ? <ExpandLessIcon /> : <ExpandMoreIcon />}
				</ListItem>
				<Collapse in={open.project} timeout="auto" unmountOnExit>
					<ProjectDescriptionCard
						onCreateTestCase={onCreateTestCase}
						onEditProject={onEditProject}
						onDeleteProject={onDeleteProject}
						onToggle={handleClose('description')}
						isOpen={open.description}
						project={project} />
					<ProjectPreviewTests
						project={project}
						projectIndex={index}
						onSelectTestCase={onSelectTestCase}
						onDeleteTestCase={onDeleteTestCase} />
				</Collapse>
			</div>
		)
	}
}


const extractTestComponents =
	project =>
		onSelectTestCase =>
			onDeleteTestCase =>
				(test, index) => {
					return (
						<ProjectPreviewTestItem key={index} onSelectTestCase={onSelectTestCase} onDeleteTestCase={onDeleteTestCase} project={project} test={test} />
					)
				}

const ProjectPreviewTests = ({ project, onSelectTestCase, onDeleteTestCase }) => (
	<TestsWrapper>
		{project.test_cases.map(extractTestComponents(project)(onSelectTestCase)(onDeleteTestCase))}
	</TestsWrapper>
)


const extractProjectComponent =
	actions =>
		(project, index) =>
			(
				<Paper key={index}>
					<Project
						project={project}
						index={index}
						{...actions}
						onEditProject={projectSection =>
							actions.onEditTest(index, projectSection)
						}
						onDeleteProject={() => {
							actions.onDeleteProject(index, project)
						}}
					/>
				</Paper>
			)

const PreviewContent = props => {
	const { onCreateProject, ...rest } = props
	return (
		<ProjectsWrapper>
			{props.projects.map(extractProjectComponent(rest))}
			<div onClick={onCreateProject} className="shadowBtn"><i className="fa fa-plus " />Create Test </div>
		</ProjectsWrapper>
	)
}

export const PreviewButtons = ({ onCreateProject }) => (
	<Flex horizontal reverse width='100%' >
		<IconButton onClick={onCreateProject} >
			<CreateNewFolderIcon aria-label="Create Project" />
		</IconButton>
	</Flex>
)



export const ProjectPreview = ({

	tests,
	onDeleteTest,
	onCreateTest,
	onEditTest,

	onEditProject,
	onDeleteProject,

	onSelectTestCase,
	onCreateTestCase,
	onDeleteTestCase,

}) => (
		<PreviewWrapper>

			<PreviewContent
				projects={tests}
				onCreateProject={onCreateTest}
				onDeleteProject={onDeleteTest}
				onEditProject={onEditTest}

				onSelectTestCase={onSelectTestCase}
				onCreateTestCase={onCreateTestCase}
				onDeleteTestCase={onDeleteTestCase}

			/>
		</PreviewWrapper>
	)



export const TestCasePreview = ({
	test,
	onCreateTestCase,
	onDeleteTestCase,
	onEditTestCase,
	onCloseTestCase
}) => (
		<Card>
			<CardHeader
				action={
					<React.Fragment>
						{onDeleteTestCase && <IconButton onClick={onDeleteTestCase}><DeleteIcon /></IconButton>}
						{onEditTestCase && <IconButton onClick={onEditTestCase}><EditIcon /></IconButton>}
						<IconButton onClick={onCloseTestCase}><CloseIcon /></IconButton>
					</React.Fragment>
				}
				title={test.name}
				subheader={` ${test.grade} Points | ${test.objective} `}
			/>
			<CardContent>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Success</TableCell>
							<TableCell>Failure</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>

						<TableRow>
							<TableCell>{test.successMessage}</TableCell>
							<TableCell>{test.failureMessage}</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>
								<a href={test.successMessageLink} rel="noopener noreferrer" target='_blank'>{test.successMessageLink}</a>
							</TableCell>
							<TableCell>
								<a href={test.failureMessageLink} rel="noopener noreferrer" target='_blank'>{test.failureMessageLink}</a>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>

				<div style={{ height: '200px', width: '100%' }}>
					<CodeEditor options={{ readOnly: true }} />
				</div>

			</CardContent>

		</Card>
	)
