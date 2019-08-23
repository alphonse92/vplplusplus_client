import React from 'react';
import MonacoEditor from 'react-monaco-editor';

const THEME_DEFAULT = "vs-dark"
const LANG_DEFAULT = 'javascript'
const OPTIONS_DEFAULT = {
	selectOnLineNumbers: true,
	automaticLayout: true
}
export class CodeEditor extends React.Component {
	state = {}

	componentDidMount(prevProps, prevState) {
		const { state: currentState, props: currentProps } = this
		const newCodeInjectedByProps = currentState.code !== currentProps.code
		if (newCodeInjectedByProps) return this.setState({ code: this.props.code })
	}

	editorDidMount = (editor, monaco) => {
		this.editor = editor
		this.editor.focus();
		if (this.props.editorDidMount) this.props.editorDidMount(editor, monaco)
	}

	onChange = (newValue, e) => {
		this.props.onChange(newValue, e)
	}

	render() {

		const {
			props,
			state,
			onChange,
			editorDidMount
		} = this

		const {
			language = LANG_DEFAULT,
			theme = THEME_DEFAULT,
			options: optionsFromProps = OPTIONS_DEFAULT
		} = props

		const { code } = state;
		const options = { OPTIONS_DEFAULT, ...optionsFromProps }
		return (
			<MonacoEditor
				language={language}
				theme={theme}
				value={code}
				options={options}
				onChange={onChange}
				editorDidMount={editorDidMount}
				{...this.props.monacoProperties}
			/>
		);
	}
}