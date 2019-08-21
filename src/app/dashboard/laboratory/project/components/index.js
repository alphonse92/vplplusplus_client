import React from 'react';
import { Toolbar, Button, } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { Flex, Item } from '../../../../../lib/components/flex'
import { CodeEditor } from '../../../../../lib/components/code';

export const NewProjectToolbarComponent = ({ goTo }) => (
	<Toolbar disableGutters>
		<Flex horizontal reverse width='100%' height='100%' >
			<Item>
				<Button onClick={goTo}><AddIcon /> Start a New Project</Button>
			</Item>
		</Flex>
	</Toolbar>
)

export const CodePreview = ({ code }) => {
	return (
		<React.Fragment>
			<h3>Code Preview </h3>
			<p>You JUnit class will looks like </p>
			<CodeEditor
				code={code}
				options={{ readOnly: true }}
				monacoProperties={{ height: '250px' }} />
		</React.Fragment>
	)
}

export const CodeEditorWithPreview = ({ title, previewCode, description, editor, getCode, editorDidMount, onShowPreview, onClosePreview, onChange = () => true }) => {


	const ButtonHandlePreviewVisibility = ({ open, onShow, onClose }) => !open
		? <button onClick={onShow}>Show preview</button>
		: <button onClick={onClose}>Continue editing</button>
	const code = getCode()
	return (
		<React.Fragment>
			{!!title && <h3>{title}</h3>}
			{!!description && <p>description</p>}
			<ButtonHandlePreviewVisibility
				open={!!previewCode}
				onShow={onShowPreview}
				onClose={onClosePreview} />
			<CodeEditor
				key={Date.now().toString()}
				onChange={onChange}
				code={code}
				options={{ readOnly: !!previewCode }}
				editorDidMount={editorDidMount}
				monacoProperties={{ height: '250px' }} />

			{previewCode && <CodePreview code={previewCode} />}
		</React.Fragment>
	)
}
