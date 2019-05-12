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
	, CardActions
	, CardContent
	, Button
	, Collapse
} from '@material-ui/core';

import {
	CreateNewFolder as CreateNewFolderIcon,
	FormatListNumbered as FormatListNumberedIcon,
	Delete as DeleteIcon,
	ExpandLess as ExpandLessIcon,
	ExpandMore as ExpandMoreIcon,
	Edit as EditIcon,
} from '@material-ui/icons';

import Typography from '@material-ui/core/Typography';




import './styles.sass'
import { Flex } from '../../../../../../lib/components/flex';

const SubHeader = ({ text }) => <ListSubheader component="div">{text}</ListSubheader>



const PreviewWrapper = props => <div className="previewProjects">{props.children}</div>
const ProjectsWrapper = props => <div className="projects">{props.children}</div>
const TestsWrapper = props => <List component="nav" className="tests" subheader={<SubHeader text="Test cases" />}>{props.children}</List>



const Test = ({ onDeleteTestCase, test }) => (
	<ListItem button>
		<ListItemIcon>
			<i class="fas fa-flask"></i>
		</ListItemIcon>

		<ListItemText inset primary={test.name} secondary={test.objective} />
		<ListItemSecondaryAction onClick={() => onDeleteTestCase(test)}>
			<IconButton aria-label="Remove">
				<DeleteIcon />
			</IconButton>
		</ListItemSecondaryAction>
	</ListItem>
)



const ProjectDescription = ({ onToggle, isOpen = false, onEditProject, onDeleteProject, project }) => (
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
		const { project, onEditProject, onDeleteProject, onDeleteTestCase } = props
		const { open } = state
		return (
			<React.Fragment>
				<ListItem button onClick={handleClose('project')}>
					<ListItemIcon>
						<FormatListNumberedIcon />
					</ListItemIcon>
					<ListItemText inset primary={project.name} secondary={project.description} />
					{open.project ? <ExpandLessIcon /> : <ExpandMoreIcon />}
				</ListItem>
				<Collapse in={open.project} timeout="auto" unmountOnExit>
					<ProjectDescription
						onEditProject={onEditProject}
						onDeleteProject={onDeleteProject}
						onToggle={handleClose('description')}
						isOpen={open.description}
						project={project} />
					<Tests project={project} onDeleteTestCase={onDeleteTestCase} />
				</Collapse>
			</React.Fragment>
		)
	}
}


const extractTestComponents = onDeleteTestCase => test => <Test onDeleteTestCase={onDeleteTestCase} test={test} />

const Tests = ({ project, onDeleteTestCase }) => (
	<TestsWrapper>
		{project.tests.map(extractTestComponents(onDeleteTestCase))}
	</TestsWrapper>
)


const extractProjectComponent =
	onEditProject =>
		onDeleteProject =>
			onDeleteTestCase =>
				onCreateTestCase =>
					project =>
						(
							<ProjectsWrapper key={project.id}>
								<Project
									project={project}
									onEditProject={onEditProject}
									onDeleteProject={onDeleteProject}
									onDeleteTestCase={onDeleteTestCase}
									onCreateTestCase={onCreateTestCase}
								/>
							</ProjectsWrapper>
						)

const PreviewContent = ({ onEditProject, onDeleteProject, onDeleteTestCase, onCreateTestCase, projects }) =>
	(
		<div className="projects">
			{
				projects.map(
					extractProjectComponent
						(onEditProject)
						(onDeleteProject)
						(onDeleteTestCase)
						(onCreateTestCase)
				)
			}
		</div>
	)

const PreviewButtons = ({ onCreateProject }) =>
	(
		<Flex horizontal reverse width='100%' >
			<IconButton onClick={onCreateProject} color="primary" aria-label="Create Project"><CreateNewFolderIcon /></IconButton>
		</Flex>
	)




/* <PreviewButtons onCreateProject={onCreateProject} /> */
const ProjectPreviewBase = ({
	onCreateProject,
	onDeleteProject,
	onEditProject,
	onCreateTestCase,
	onDeleteTestCase,
	projects
}) => (
		<Paper>
			<PreviewWrapper>
				<PreviewContent
					onCreateTestCase={onCreateTestCase}
					onDeleteProject={onDeleteProject}
					onEditProject={onEditProject}
					onDeleteTestCase={onDeleteTestCase}
					projects={projects} />
			</PreviewWrapper>
		</Paper>

	)

export const ProjectPreview = ProjectPreviewBase

