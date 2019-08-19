import React from 'react'
import { CodeEditorWithPreview } from '.';
import { capitalize, camelCase, debounce } from 'lodash'

export class EditTestCaseWindow extends React.Component {

  static Events = {
    default: 'save-test-code',
    save: 'save-test-code',
  }

  constructor(props) {
    super(props)
    const { window } = props
    const { setAsSaved = true } = window
    this.state = { ...window.data.test }
    this.saved = setAsSaved
  }

  getTestPayload = ok => {
    const { props } = this
    const { window } = props
    const code = this.editor.getValue()
    const windowData = { ...window }
    windowData.data.test = { ...this.state }
    windowData.data.test.code = code
    return { ok, window: windowData,  }
  }

  componentWillUnmount() {
    const payload = this.getTestPayload(!!this.saved)
    console.log('unmounting test case window', payload)
    this.props.onClose(payload)
  }

  getEditor = (editor, monaco) => {
    this.editor = editor
    this.monaco = monaco
  }


  deleteCodeFromState = () => this.setState({ ...this.state, previewCode: undefined })

  onSave = () => {
    this.saved = true
    this.props.onEmit(EditTestCaseWindow.Events.save, this.getTestPayload(true))
  }


  showPreviewCode = () => {
    const code = this.editor.getValue()
    const newState = {
      ...this.state,
      previewCode: this.getPreviewCode(code, this.props.window.data.test),
      code
    }
    this.setState(newState)
  }

  getPreviewCode = (codeBase, test) => {
    return `
@Test()
public void ${capitalize(camelCase(test.name))}() {
  // Begin of your Code section
  ${codeBase}
  // End of your  code section
}
`}

  shouldComponentUpdate(prevProps, prevState) {
    return (this.state.code !== prevProps.window.data.test.code)
      || (this.saved && this.state.code !== prevProps.window.data.test.code)
      || (this.state.previewCode !== prevState.previewCode)
  }

  handleEditorChange = (newValue, e) => {
    const fn = debounce(() => { this.saved = false }, 100)
    fn()
  }

  render() {
    const { previewCode } = this.state
    const description = "Please set the Junit test method body. That code will be wraped into the JUnit test method."
    return (
      <React.Fragment>
        <h3>Test case editor</h3>
        <p>Set up your test case information. It will be used to track and analize the students submissions.</p>
        <CodeEditorWithPreview
          title="Code Editor"
          description={description}
          editor={this.editor}
          editorDidMount={this.getEditor}
          getCode={() => this.saved ? this.props.window.data.test.code : this.state.code}
          previewCode={previewCode}
          onShowPreview={this.showPreviewCode}
          onClosePreview={this.deleteCodeFromState}
          onChange={this.handleEditorChange}
        />
        <button onClick={this.onSave}>Save</button>
      </React.Fragment>
    )
  }



}