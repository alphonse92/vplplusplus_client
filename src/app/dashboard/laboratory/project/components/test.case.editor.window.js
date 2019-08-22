import React from 'react'
import { CodeEditorWithPreview } from '.';
import { capitalize, camelCase, debounce, isEqual } from 'lodash'
import TextField from '@material-ui/core/TextField';

import {
  Paper
  , Button
  , ListItem
  , ListItemIcon
  , ListItemText
  , Card
  , CardContent
  , Collapse
} from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Code as CodeIcon,
  Edit as EditIcon,
  Add as PositiveIcon,
  Remove as NegativeIcon
} from '@material-ui/icons';
import { TEST_CASE as TEST_CASE_DEFAULT_VALUES } from '../../../../../constants';

export class EditTestCaseWindow extends React.Component {

  static Events = {
    default: 'save-test-case',
    save: 'save-test-case',
  }

  constructor(props) {
    super(props)
    const { window } = props
    const { setAsSaved = true } = window
    this.state = { test: { ...window.data.test } }
    this.saved = setAsSaved
  }

  getTestPayload = ok => {
    const { props } = this
    const { window } = props
    const code = this.getEditorCode()
    const windowData = { ...window }
    windowData.data.test = {
      ...TEST_CASE_DEFAULT_VALUES,
      ...this.state.test
    }
    windowData.data.test.code = code
    return { ok, window: windowData }
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
    this.props.onEmit(EditTestCaseWindow.Events.save, this.getTestPayload(true))
  }

  getEditorCode = () => this.editor ? this.editor.getValue() : this.state.code

  showPreviewCode = () => {
    const code = this.getEditorCode()
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

  handleEditorChange = (newValue, e) => {
    const fn = debounce(() => { this.saved = false }, 100)
    fn()
  }

  open = tab => () => {

    const newState = { ...this.state, windowOpen: this.state.windowOpen === tab ? undefined : tab }
    this.setState(newState)
  }

  handleChange = attribute => (event) => {
    const { state } = this
    const newState = { test: { ...this.state.test, [attribute]: event.target.value } }
    this.setState({ ...state, ...newState })
  }

  // shouldComponentUpdate(prevProps, prevState) {
  //   return (this.state.code !== prevProps.window.data.test.code)
  //     || (this.saved && this.state.code !== prevProps.window.data.test.code)
  //     || (this.state.previewCode !== prevState.previewCode)

  //     || this.state.windowOpen !== prevState.windowOpen

  //     || isEqual(this.state.test, prevState.test)



  // }

  render() {
    const { previewCode, windowOpen } = this.state
    const TestData = {
      ...TEST_CASE_DEFAULT_VALUES,
      ...this.state.test
    }

    return (
      <React.Fragment>

        <Paper style={{ marginBottom: '13px' }}>
          <ListItem button onClick={this.open('editorIsOpen')}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText inset primary='Test Case Editor' secondary="Set up your test case information. It will be used to track and analize the students submissions." />
            {windowOpen === 'editorIsOpen' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={windowOpen === 'editorIsOpen'} timeout="auto" unmountOnExit>
            <Card elevation={0}>
              <CardContent>

                <TextField
                  id="standard-name"
                  style={{ width: '100%' }}
                  label="Name"
                  value={TestData.name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="Objective"
                  style={{ width: '100%' }}
                  value={TestData.objective}
                  onChange={this.handleChange('objective')}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="Objective"
                  style={{ width: '100%' }}
                  value={TestData.grade}
                  onChange={this.handleChange('grade')}
                  margin="normal"
                />
              </CardContent>
            </Card>
          </Collapse>
        </Paper>


        <Paper style={{ marginBottom: '13px' }}>
          <ListItem button onClick={this.open('codeIsOpen')}>
            <ListItemIcon>
              <CodeIcon />
            </ListItemIcon>
            <ListItemText inset primary='Code Editor' secondary="Please set the Junit test method body. That code will be wraped into the JUnit test method." />
            {windowOpen === 'codeIsOpen' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse style={{ root: { padding: '0px' } }} in={windowOpen === 'codeIsOpen'} timeout="auto">
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


        <Paper style={{ marginBottom: '13px' }}>
          <ListItem button onClick={this.open('positiveTabIsOpen')}>
            <ListItemIcon>
              <PositiveIcon />
            </ListItemIcon>
            <ListItemText inset primary="Positive retrospective" secondary="Setup the dialogs when a student resolve the test." />
            {windowOpen === 'positiveTabIsOpen' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={windowOpen === 'positiveTabIsOpen'} timeout="auto" unmountOnExit>
            <Card elevation={0}>
              <CardContent>
                <TextField
                  id="standard-name"
                  style={{ width: '100%' }}
                  label="Name"
                  value={TestData.successMessage}
                  onChange={this.handleChange('successMessage')}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="Objective"
                  style={{ width: '100%' }}
                  value={TestData.successMessageLink}
                  onChange={this.handleChange('successMessageLink')}
                  margin="normal"
                />
              </CardContent>
            </Card>
          </Collapse>
        </Paper>




        <Paper style={{ marginBottom: '13px' }}>
          <ListItem button onClick={this.open('negativeTabIsOpen')}>
            <ListItemIcon>
              <NegativeIcon />
            </ListItemIcon>
            <ListItemText inset primary="Positive retrospective" secondary="Setup the dialogs when a student fail the test." />
            {windowOpen === 'negativeTabIsOpen' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={windowOpen === 'negativeTabIsOpen'} timeout="auto" unmountOnExit>
            <Card elevation={0}>
              <CardContent>
                <TextField
                  id="standard-name"
                  style={{ width: '100%' }}
                  label="Name"
                  value={TestData.failureMessage}
                  onChange={this.handleChange('failureMessage')}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="Objective"
                  style={{ width: '100%' }}
                  value={TestData.failureMessageLink}
                  onChange={this.handleChange('failureMessageLink')}
                  margin="normal"
                />
              </CardContent>
            </Card>
          </Collapse>
        </Paper>


        <Button onClick={this.onSave} aria-label="Save">Save</Button>
      </React.Fragment >
    )
  }



}