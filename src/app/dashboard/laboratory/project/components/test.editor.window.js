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
    const { setAsSaved = true, readOnly  } = window
    const code = window.data.test.code

    this.state = { readOnly }
    this.lastCode = code
    this.saved = setAsSaved
  }

  componentWillUnmount() {
    const payload = this.getTestPayload(!!this.saved)
    this.props.onClose(payload)
  }

  getTestPayload = ok => {
    const { props } = this
    const { window } = props
    const code = this.editor.getValue()
    const windowData = { ...window }
    windowData.data.test.code = code
    return { ok, window: windowData, path: `test[${window.data.index}]` }
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
    const code = this.lastCode
    const newState = {
      ...this.state,
      previewCode: this.getPreviewCode(code, this.props.window.data.test),
    }
    this.setState(newState)
  }

  getPreviewCode = (codeBase, test) => {
    return `
/*
*
* This is a common JUnit Test Class. 
* Setup as you need
*
*/
public class ${capitalize(camelCase(test.name))} {
  ${codeBase}
  // your unit test goes belowasda.
}
`}


  handleEditorChange = (newValue, e) => {
    const fn = debounce(() => {
      this.saved = false
      this.lastCode = newValue
    }, 100)
    fn()
  }

  render() {
    const { previewCode, codeIsOpen = true, readOnly  } = this.state
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
              getCode={() => this.lastCode}
              previewCode={previewCode}
              onShowPreview={this.showPreviewCode}
              onClosePreview={this.deleteCodeFromState}
              onChange={this.handleEditorChange}
              readOnly={ readOnly }
            />
          </Collapse>
        </Paper>
        {!readOnly && < Button onClick={this.onSave} aria-label="Save" variant="contained" color="primary">Save</Button>}
      </React.Fragment>


    )
  }



}