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
  , Typography
} from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Code as CodeIcon,
  Edit as EditIcon,
  Add as PositiveIcon,
  Remove as NegativeIcon,
  Grade as GradeIcon
} from '@material-ui/icons';
import { TEST_CASE as TEST_CASE_DEFAULT_VALUES } from '../../../../../constants';
import { Typeahead } from '../../../../../lib/components/material/form/typeahead';

export class EditTestCaseWindow extends React.Component {

  static Events = {
    default: 'save-test-case',
    save: 'save-test-case',
  }

  constructor(props) {
    super(props)
    const { window: windowProp } = props
    const { setAsSaved = true, readOnly } = windowProp
    const test = windowProp.data.test
    if (test.topic) test.topic = test.topic.map((topic) => {
      const _id = topic._id || topic
      return _id
    })
    this.state = { test, readOnly }
    this.lastCode = this.state.test.code
    this.saved = setAsSaved
    this.selectedTopics = this.state.test.topic
      ? this.props.window.data.topics
        .filter(({ _id }) => this.state.test.topic.includes(_id))
        .map(this.extractOptionsFromTopics)
      : []
  }

  getTestPayload = ok => {
    const { props, selectedTopics } = this
    const { window } = props
    const code = this.getEditorCode()
    const windowData = { ...window }
    windowData.data.test = {
      ...TEST_CASE_DEFAULT_VALUES,
      ...this.state.test
    }
    windowData.data.test.code = code
    windowData.data.test.topic = !selectedTopics ? [] : selectedTopics.map(({ value }) => value)
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

  getEditorCode = () => this.lastCode

  showPreviewCode = () => {
    const code = this.getEditorCode()
    const newState = {
      ...this.state,
      previewCode: this.getPreviewCode(code, this.state.test),
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
    const fn = debounce(() => {
      this.saved = false
      this.lastCode = newValue
    }, 100)
    fn()
  }

  open = tab => () => {

    const newState = { ...this.state, windowOpen: this.state.windowOpen === tab ? undefined : tab }
    this.setState(newState)
  }

  handleChange = attribute => (event) => {

    const { state } = this
    const { readOnly } = state
    if (readOnly) return
    const newState = { test: { ...this.state.test, [attribute]: event.target.value } }
    this.saved = false
    this.setState({ ...state, ...newState })
  }

  onChangeTopic = selectedTopics => {
    const { readOnly } = this.state
    if (readOnly) return
    this.saved = false
    this.selectedTopics = selectedTopics
  }

  extractOptionsFromTopics = ({ _id: value, name, description: label }) => {
    return { value, label }
  }

  render() {

    const { previewCode, windowOpen = [], readOnly } = this.state
    const TestData = {
      ...TEST_CASE_DEFAULT_VALUES,
      ...this.state.test
    }
    const TopicList = this.props.window.data.topics || []
    const topicOptions = TopicList.map(this.extractOptionsFromTopics)

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
          <Collapse style={{ root: { padding: '0px' } }} in={windowOpen === 'codeIsOpen'} timeout="auto" unmountOnExit>
            <CodeEditorWithPreview
              editor={this.editor}
              editorDidMount={this.getEditor}
              getCode={() => this.lastCode}
              previewCode={previewCode}
              onShowPreview={this.showPreviewCode}
              onClosePreview={this.deleteCodeFromState}
              onChange={this.handleEditorChange}
              readOnly={readOnly}
            />

          </Collapse>
        </Paper>

        <Paper style={{ marginBottom: '13px' }}>
          <ListItem button onClick={this.open('topicTabOpen')}>
            <ListItemIcon>
              <GradeIcon />
            </ListItemIcon>
            <ListItemText inset primary="Grades And Topics" secondary="Topics allow to track the student progress along the time. The grade allow to quantify the final test result value" />
            {windowOpen === 'topicTabOpen' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={windowOpen === 'topicTabOpen'} timeout="auto" unmountOnExit>
            <Card elevation={0}>

              <CardContent>
                <Typography variant="body2" gutterBottom>
                  Topics are the most important field in the test case. Those are granular, especific and a mandatory.
                  That represents a student knowledge. Are usefull to quantify the student skill.
                  You need to add at least 1. If you need to add more than 3 topics, then consider to create another test case.
                </Typography>


                <Typeahead
                  id='topics'
                  onChange={this.onChangeTopic}
                  options={topicOptions}
                  defaultValue={this.selectedTopics}
                  name='topics'
                  isDisabled={this.state.readOnly}
                  placeholder="Select topic"
                />

                <TextField
                  id="standard-name"
                  label="Grade"
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
                  label="Success Message"
                  value={TestData.successMessage}
                  onChange={this.handleChange('successMessage')}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="Success reference link"
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
            <ListItemText inset primary="Negative retrospective" secondary="Setup the dialogs when a student fail the test." />
            {windowOpen === 'negativeTabIsOpen' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={windowOpen === 'negativeTabIsOpen'} timeout="auto" unmountOnExit>
            <Card elevation={0}>
              <CardContent>
                <TextField
                  id="standard-name"
                  style={{ width: '100%' }}
                  label="Failure message"
                  value={TestData.failureMessage}
                  onChange={this.handleChange('failureMessage')}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="Failure reference link"
                  style={{ width: '100%' }}
                  value={TestData.failureMessageLink}
                  onChange={this.handleChange('failureMessageLink')}
                  margin="normal"
                />
              </CardContent>
            </Card>
          </Collapse>
        </Paper>


        {!readOnly && <Button onClick={this.onSave} aria-label="Save" variant="contained" color="primary">Save</Button>}
      </React.Fragment >
    )
  }



}