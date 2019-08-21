import React from 'react'
import { CodeEditorWithPreview } from '.';
import { capitalize, camelCase, debounce } from 'lodash'
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

export class EditTestCaseWindow extends React.Component {

  static Events = {
    default: 'save-test-case',
    save: 'save-test-case',
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

  handleEditorChange = (newValue, e) => {
    const fn = debounce(() => { this.saved = false }, 100)
    fn()
  }

  open = tab => () => {
    const currentValue = !!this.state[tab]
    const newState = { [tab]: !currentValue }
    this.setState(newState)
  }

  render() {
    const { previewCode } = this.state
    const {
      editorIsOpen,
      positiveTabIsOpen,
      negativeTabIsOpen,
      codeIsOpen
    } = this.state

    return (
      <React.Fragment>

        <Paper style={{ marginBottom: '13px' }}>
          <ListItem button onClick={this.open('editorIsOpen')}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText inset primary='Test Case Editor' secondary="Set up your test case information. It will be used to track and analize the students submissions." />
            {editorIsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={editorIsOpen} timeout="auto" unmountOnExit>
            <Card elevation={0}>
              <CardContent>

                <TextField
                  id="standard-name"
                  style={{ width: '100%' }}
                  label="Name"
                  value={this.state.name}
                  // onChange={this.handleChange('name')}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="Objective"
                  style={{ width: '100%' }}
                  value={this.state.objective}
                  // onChange={this.handleChange('name')}
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
            {codeIsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={codeIsOpen} timeout="auto" unmountOnExit>
            <Card elevation={0}>
              <CardContent>

                <CodeEditorWithPreview
                  editor={this.editor}
                  editorDidMount={this.getEditor}
                  getCode={() => this.saved ? this.props.window.data.test.code : this.state.code}
                  previewCode={previewCode}
                  onShowPreview={this.showPreviewCode}
                  onClosePreview={this.deleteCodeFromState}
                  onChange={this.handleEditorChange}
                />
              </CardContent>
            </Card>
          </Collapse>
        </Paper>


        <Paper style={{ marginBottom: '13px' }}>
          <ListItem button onClick={this.open('positiveTabIsOpen')}>
            <ListItemIcon>
              <PositiveIcon />
            </ListItemIcon>
            <ListItemText inset primary="Positive retrospective" secondary="Setup the dialogs when a student resolve the test." />
            {positiveTabIsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={positiveTabIsOpen} timeout="auto" unmountOnExit>
            <Card elevation={0}>
              <CardContent>
                <TextField
                  id="standard-name"
                  style={{ width: '100%' }}
                  label="Name"
                  value={this.state.successMessage}
                  // onChange={this.handleChange('name')}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="Objective"
                  style={{ width: '100%' }}
                  value={this.state.successMessageLink}
                  // onChange={this.handleChange('name')}
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
            <ListItemText inset primary="Positive retrospective" secondary="Setup the dialogs when a student resolve the test." />
            {negativeTabIsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={negativeTabIsOpen} timeout="auto" unmountOnExit>
            <Card elevation={0}>
              <CardContent>
                <TextField
                  id="standard-name"
                  style={{ width: '100%' }}
                  label="Name"
                  value={this.state.failureMessage}
                  // onChange={this.handleChange('name')}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="Objective"
                  style={{ width: '100%' }}
                  value={this.state.failureMessageLink}
                  // onChange={this.handleChange('name')}
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