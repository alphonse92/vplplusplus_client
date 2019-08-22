import React from 'react'
import { CodeEditorWithPreview } from '.';
import { capitalize, camelCase, debounce } from 'lodash'
import {
  Paper
  , Button
  , ListItem
  , ListItemIcon
  , ListItemText
  , Collapse
} from '@material-ui/core';
import {
  Code as CodeIcon
} from '@material-ui/icons';


export class EditTestWindow extends React.Component {

  static Events = {
    default: 'save-test-code',
    save: 'save-test-code',
  }

  constructor(props) {
    super(props)
    const { window } = props
    const { setAsSaved = true } = window
    const code = window.data.test.code
    this.state = { code }
    this.saved = setAsSaved
  }

  getTestPayload = ok => {
    const { props } = this
    const { window } = props
    const code = this.editor.getValue()
    const windowData = { ...window }
    windowData.data.test.code = code
    return { ok, window: windowData, path: `test[${window.data.index}]` }
  }

  componentWillUnmount() {
    const payload = this.getTestPayload(!!this.saved)
    this.props.onClose(payload)
  }

  getEditor = (editor, monaco) => {
    this.editor = editor
    this.monaco = monaco
  }


  deleteCodeFromState = () => this.setState({ ...this.state, previewCode: undefined })

  onSave = () => {
    this.saved = true
    this.props.onEmit(EditTestWindow.Events.save, this.getTestPayload(true))
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
public class ${capitalize(camelCase(test.name))} {
 ${codeBase}
 // your unit test methods will be placed below
}
`}


  handleEditorChange = (newValue, e) => {
    const fn = debounce(() => { this.saved = false }, 100)
    fn()
  }

  shouldComponentUpdate(prevProps, prevState) {
    return (this.state.code !== prevProps.window.data.test.code)
      || (this.saved && this.state.code !== prevProps.window.data.test.code)
      || (this.state.previewCode !== prevState.previewCode)
  }

  render() {
    const { previewCode, codeIsOpen = true } = this.state

    const description = "Please configure your test code. This code will be placed before all of tests cases of JUnit Class. "
      + "So, you can writte the @before, @beforeAll, @after and @afterAll methods of JUnit Life Cycle.Also, you can set the test class variables and use it into a test case "
    return (
      <React.Fragment>
        <Paper style={{ marginBottom: '13px' }}>
          <ListItem button>
            <ListItemIcon>
              <CodeIcon />
            </ListItemIcon>
            <ListItemText inset primary='Code Editor' secondary={description} />
          </ListItem>
          <Collapse style={{ root: { padding: '0px' } }} in={codeIsOpen} timeout="auto">
            <CodeEditorWithPreview
              editor={this.editor}
              editorDidMount={this.getEditor}
              getCode={() => this.saved ? this.props.window.data.test.code : this.state.code}
              previewCode={previewCode}
              onShowPreview={this.showPreviewCode}
              onClosePreview={this.deleteCodeFromState}
              onChange={this.handleEditorChange}
            />
          </Collapse>
        </Paper>
        <Button onClick={this.onSave} aria-label="Save">Save</Button>
      </React.Fragment>


    )
  }



}