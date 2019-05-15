import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { get, pick } from 'lodash'

import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { ProjectCreateForm } from '../forms/project.create.form'
import { PROJECT } from '../redux/paths';
import { ActionCreators } from '../redux/actions';


const mapDispatchToProps = (dispatch) => bindActionCreators(
	pick(
		ActionCreators, [
			'TOGGLE_CREATE_PROJECT_DIALOG'
		]
	)
	, dispatch)

const mapStateToProps = (state) => ({
	show: get(state, `${PROJECT.root}.${PROJECT.dialogs.create.show}`),
	data: get(state, `${PROJECT.root}.${PROJECT.dialogs.create.data}`),
})

function Transition(props) {
	return <Slide direction="up" {...props} />;
}
const ProjectFormDialogView = (props) => {
	return (
		<Dialog
			fullScreen
			open={props.show}
			TransitionComponent={Transition}
		>
			<ProjectCreateForm />
		</Dialog>
	)
}


export const ProjectFormDialog = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectFormDialogView)