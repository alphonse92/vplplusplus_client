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
	, Button

} from '@material-ui/core';

import {
	Edit as EditIcon,
	Save as SaveIcon,
	Delete as DeleteIcon,

	Close as CloseIcon,

	CreateNewFolder as CreateNewFolderIcon,
	FormatListNumbered as FormatListNumberedIcon,
	ExpandLess as ExpandLessIcon,
	ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';

import Typography from '@material-ui/core/Typography';




import './styles.sass'
import { Flex } from '../../../../../../lib/components/flex';
import { CodeEditor } from '../../../../../../lib/components/code';

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
		isOpen = false,
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
						<Typography color="textSecondary" gutterBottom>Description</Typography>
						<Typography component="p" gutterBottom>{project.description}</Typography>

						<Typography color="textSecondary" gutterBottom>Objective</Typography>
						<Typography component="p" gutterBottom>{project.objective}</Typography>

						<Typography color="textSecondary" gutterBottom>Max Grade</Typography>
						<Typography component="p" gutterBottom>{project.maxGrade}</Typography>

						<Typography color="textSecondary" gutterBottom>Tags</Typography>
						<Typography component="p" gutterBottom>{project.tags && project.tags.join(', ')}</Typography>
					</Collapse>
				</CardContent>
				<CardActions>
					<IconButton onClick={onEditProject} aria-label="Edit Project">
						<DeleteIcon />
					</IconButton>
					<IconButton onClick={onDeleteProject} aria-label="Delete Project">
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
			project: false,
			description: false
		}
	}
	handleClose = window => () => this.setState({ open: Object.assign(this.state.open, { [window]: !this.state.open[window] }) })
	render() {
		const { state, props, handleClose } = this
		const {
			project,
			onEditProject,
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
						onSelectTestCase={onSelectTestCase}
						onDeleteTestCase={onDeleteTestCase} />
				</Collapse>
			</div>
		)
	}
}


const extractTestComponents =
	onSelectTestCase =>
		onDeleteTestCase =>
			test => <ProjectPreviewTestItem key={test.id} onSelectTestCase={onSelectTestCase} onDeleteTestCase={onDeleteTestCase} test={test} />

const ProjectPreviewTests = ({ project, onSelectTestCase, onDeleteTestCase }) => (
	<TestsWrapper>
		{project.tests.map(extractTestComponents(onSelectTestCase)(onDeleteTestCase))}
	</TestsWrapper>
)


const extractProjectComponent =
	actions =>
		project =>
			(
				<Paper>
					<Project
						key={project.id}
						project={project}
						{...actions}
					/>
				</Paper>
			)

const PreviewContent = props => (
	<ProjectsWrapper>
		{props.projects.map(extractProjectComponent(props))}
	</ProjectsWrapper>
)

const PreviewButtons = ({ onCreateProject }) => (
	<Flex horizontal reverse width='100%' >
		<IconButton onClick={onCreateProject} aria-label="Create Project">
			<CreateNewFolderIcon />
		</IconButton>
	</Flex>
)


/* <PreviewButtons onCreateProject={onCreateProject} /> */
export const ProjectPreview = ({

	projects,

	onCreateProject,
	onEditProject,
	onDeleteProject,

	onSelectTestCase,
	onCreateTestCase,
	onDeleteTestCase,

}) => (
		<PreviewWrapper>
			<PreviewButtons onCreateProject={onCreateProject} />
			<PreviewContent

				onCreateProject={onCreateProject}
				onDeleteProject={onDeleteProject}
				onEditProject={onEditProject}

				onSelectTestCase={onSelectTestCase}
				onCreateTestCase={onCreateTestCase}
				onDeleteTestCase={onDeleteTestCase}

				projects={projects} />
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
								<a href={test.successMessageLink} target='_blank'>{test.successMessageLink}</a>
							</TableCell>
							<TableCell>
								<a href={test.failureMessageLink} target='_blank'>{test.failureMessageLink}</a>
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
