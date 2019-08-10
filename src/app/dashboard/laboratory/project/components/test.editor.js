import React from 'react'
import { CodeEditorWithPreview } from './';
import { capitalize, camelCase } from 'lodash'

export class EditTestWindow extends React.Component {

  constructor(props) {
    super(props)
    const { code } = props
    this.state = { code }
  }

  getTestPayload = ok => {
    const { props } = this
    const { window } = props
    const data = { code: this.editor.getValue() }
    return { ok, window, data }
  }

  componentWillUnmount() {
    const payload = this.getTestPayload(false)
    this.props.onClose(payload)
    this.editor = undefined
    this.monaco = undefined
  }

  setEditor = (editor, monaco) => {
    this.editor = editor
    this.monaco = monaco
  }

  

  deleteCodeFromState = () => this.setState({ ...this.state, code: undefined })

  onSave = () => this.props.onClose(this.getTestPayload(true))


  addCodePreviewToState = () => {

    const newState = {
      ...this.state,
      previewCode: this.getPreviewCode(this.editor.getValue(), this.props.window.data.test)
    }

    this.setState(newState)
  }

  getPreviewCode = (codeBase, test) => {
    return `
public class ${capitalize(camelCase(test.name))} {
 ${codeBase}
 // your unit test methods will be placed below
}
`}


  render() {
    const { window } = this.props
    const { previewCode } = this.state
    const description = "Please configure your test code. This code will be placed before all of tests cases of JUnit Class. "
      + "So, you can writte the @before, @beforeAll, @after and @afterAll methods of JUnit Life Cycle.Also, you can set the test class variables and use it into a test case "
    return (
      <React.Fragment>
        <CodeEditorWithPreview
          title="Code Editor"
          description={description}
          editor={this.editor}
          setEditor={this.setEditor}

          getValue={() => window.data.test.code || window.data.code}

          previewCode={previewCode}
          onShowPreview={this.addCodePreviewToState}
          onClosePreview={this.deleteCodeFromState}
        />
        <button onClick={this.onSave}>Save</button>
      </React.Fragment>
    )
  }



}