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

export const CodeEditorWithPreview = ({ title, previewCode, description, editor, getValue, setEditor, onShowPreview, onClosePreview }) => {

	const initialValue = getValue()

	const code = editor
		? editor.getValue()
		: initialValue

	const ButtonHandlePreviewVisibility = ({ open, onShow, onClose }) => !open
		? <button onClick={onShow}>Show preview</button>
		: <button onClick={onClose}>Continue editing</button>

	return (
		<React.Fragment>
			<h3>{title}</h3>
			<p>{description}
				<ButtonHandlePreviewVisibility
					open={!!previewCode}
					onShow={onShowPreview}
					onClose={onClosePreview} />
			</p>
			<CodeEditor
				code={code}
				options={{ readOnly: !!previewCode }}
				editorDidMount={setEditor}
				monacoProperties={{ height: '250px' }} />

			{previewCode && <CodePreview code={previewCode} />}
		</React.Fragment>
	)
}
