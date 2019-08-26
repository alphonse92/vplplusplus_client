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
	Code as CodeIcon,
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

const cutStringAndAddDots = (str, max = 25) => str.length > max ? `${str.substring(0, max)}...` : str
const wrapInItalic = (shouldWrap, txt) => !!shouldWrap ? <i>{txt}</i> : <>{txt}</>


const ProjectPreviewTestItem = ({ onSelectTestCase, onDeleteTestCase, test, project_index, index }) => {
	return (
		<ListItem button onClick={() => onSelectTestCase(project_index, index, test)}>
			<ListItemIcon>
				<i className="fas fa-flask"></i>
			</ListItemIcon>
			<ListItemText inset primary={cutStringAndAddDots(test.name)} secondary={cutStringAndAddDots(test.objective)} />
			<ListItemSecondaryAction onClick={() => onDeleteTestCase(project_index, index, test)}>
				<IconButton aria-label="Remove Case"> <DeleteIcon /> </IconButton>
			</ListItemSecondaryAction>
		</ListItem >
	)
}



const ProjectDescriptionCard =
	({
		onToggle,
		isOpen = true,
		onEditProject,
		onDeleteProject,
		onEditProjectCode,
		onCreateTestCase,
		editable = true,
		index,
		project }) => (
			<Card elevation={0}>
				<CardContent>
					<Typography color="textSecondary" gutterBottom>Project Name </Typography>
					{project._id && <Typography color="textSecondary" gutterBottom><small>{project._id}</small></Typography>}
					<Typography variant="h6" component="h6" gutterBottom onClick={onToggle}>
						{project.name}
						{editable && <EditIconMaterial onClick={onEditProject('name')} />}
						{isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</Typography>

					<Collapse in={isOpen} timeout="auto" unmountOnExit>

						<Typography color="textSecondary" gutterBottom>Description </Typography>
						<Typography component="p" gutterBottom>{project.description} {editable && <EditIconMaterial onClick={onEditProject('description')} />}</Typography>

						<Typography color="textSecondary" gutterBottom>Objective</Typography>
						<Typography component="p" gutterBottom>{project.objective}{editable && <EditIconMaterial onClick={onEditProject('objective')} />}</Typography>

					</Collapse>
				</CardContent>
				<CardActions>
					{editable && (
						<React.Fragment>
							<IconButton onClick={() => onDeleteProject(index, project)} aria-label="Edit Project">
								<DeleteIcon />
							</IconButton>
							<IconButton onClick={() => onCreateTestCase(index, project)}>
								<i className="fas fa-plus " />
							</IconButton>
						</React.Fragment>
					)}
					<IconButton onClick={() => onEditProjectCode(index, project)}>
						<CodeIcon />
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
			editable = true,
			project,
			index,
			onEditProject,
			onEditProjectCode,
			onDeleteProject,
			onSelectTestCase,
			onCreateTestCase,
			onDeleteTestCase,
		} = props
		const { open } = state
		return (
			<div className="project">
				<ListItem button onClick={handleClose('project')}>
					<ListItemIcon>
						<FormatListNumberedIcon />
					</ListItemIcon>
					<ListItemText inset primary={wrapInItalic(project._id, cutStringAndAddDots(project.name, 10))} secondary={cutStringAndAddDots(project.description)} />
					{open.project ? <ExpandLessIcon /> : <ExpandMoreIcon />}
				</ListItem>
				<Collapse in={open.project} timeout="auto" unmountOnExit>
					<ProjectDescriptionCard
						editable={editable}
						onCreateTestCase={onCreateTestCase}
						onEditProject={onEditProject}
						onEditProjectCode={onEditProjectCode}
						onDeleteProject={onDeleteProject}
						onToggle={handleClose('description')}
						isOpen={open.description}
						index={index}
						project={project} />
					<ProjectPreviewTests
						editable={editable}
						project={project}
						project_index={index}
						onSelectTestCase={onSelectTestCase}
						onDeleteTestCase={onDeleteTestCase} />
				</Collapse>
			</div>
		)
	}
}




const ProjectPreviewTests = ({ project_index, project, onSelectTestCase, onDeleteTestCase }) => (
	<TestsWrapper>
		{project.test_cases.map((test, index) => {
			return (
				<ProjectPreviewTestItem
					key={index}
					index={index}
					project={project}
					project_index={project_index}
					onSelectTestCase={onSelectTestCase}
					onDeleteTestCase={onDeleteTestCase}
					test={test} />
			)
		})}
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
						onEditProject={attribute => () => {
							actions.onEditProject(index, attribute)
						}}
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
			{props.editable && <div onClick={onCreateProject} className="shadowBtn"><i className="fa fa-plus " />Create Test </div>}
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
	editable = true,
	onEditTestCode,

	onSelectTestCase,
	onCreateTestCase,
	onDeleteTestCase,

}) => (
		<PreviewWrapper>

			<PreviewContent
				editable={editable}
				projects={tests}
				onCreateProject={onCreateTest}
				onDeleteProject={onDeleteTest}
				onEditProject={onEditTest}
				onEditProjectCode={onEditTestCode}

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
