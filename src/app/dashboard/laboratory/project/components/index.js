import React from 'react';
import {
	Toolbar,
	Button,
	IconButton,
} from '@material-ui/core'

import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import AddIcon from '@material-ui/icons/Add';
import { Flex, Item } from '../../../../../lib/components/flex'
import { CodeEditor } from '../../../../../lib/components/code';
import { VplLang } from '../../../../../redux/lang';

export const NewProjectToolbarComponent = ({ goTo }) => (
	<Toolbar disableGutters>
		<Flex horizontal reverse width='100%' height='100%' >
			<Item>
				<Button variant="contained" color="primary" onClick={goTo}><AddIcon /> Start a New Project</Button>
			</Item>
		</Flex>
	</Toolbar>
)

export const CodeEditorWithPreview = ({ title, previewCode, description, editor, getCode, editorDidMount, onShowPreview, onClosePreview, onChange = () => true, readOnly }) => {

	const toggleStyle = {
		root: {
			'&:hover': {
				background: 'transparent !important',
			}
		},
	}

	const ButtonHandlePreviewVisibility = ({ open, onShow, onClose }) => {
		const label = !open ? <VplLang string="SHOW_PREVIEW" /> : <VplLang string="CONTINUE_EDITING" />
		const onClick = !open ? onShow : onClose
		const button = !open
			? (<IconButton aria-label="Show preview" style={toggleStyle}> <ToggleOnIcon /> </IconButton>)
			: (<IconButton aria-label="Close previe" style={toggleStyle}> <ToggleOffIcon /></IconButton>)
		return (
			<div onClick={onClick}>{button}<span>{label}</span></div>
		)
	}
	const code = getCode()
	return (
		<React.Fragment>
			{!readOnly && (<ButtonHandlePreviewVisibility
				open={!!previewCode}
				onShow={onShowPreview}
				onClose={onClosePreview} />)}
			<CodeEditor
				key={Date.now().toString()}
				onChange={onChange}
				code={code}
				options={{ readOnly: (!readOnly && !!previewCode) || readOnly }}
				editorDidMount={editorDidMount}
				monacoProperties={{ height: '250px' }}
				language="java"
			/>

			{(!readOnly && previewCode) && <CodeEditor code={previewCode} options={{ readOnly: true }} language="java" monacoProperties={{ height: '250px' }} />}
		</React.Fragment>
	)
}
