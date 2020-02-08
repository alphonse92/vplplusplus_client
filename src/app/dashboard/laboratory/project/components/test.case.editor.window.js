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
import { VplLang } from '../../../../../redux/lang';

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
  ${codeBase}
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
    this.setState({ selectedTopics: this.selectedTopics })
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
            <ListItemText inset primary={<VplLang string="TEST_CASE_TAB_EDIT_BASIC_INFO_TITLE" />} secondary={<VplLang string="TEST_CASE_TAB_EDIT_BASIC_INFO_DESCRIPTION" />} />
            {windowOpen === 'editorIsOpen' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={windowOpen === 'editorIsOpen'} timeout="auto" unmountOnExit>
            <Card elevation={0}>
              <CardContent>

                <TextField
                  id="standard-name"
                  style={{ width: '100%' }}
                  label={<VplLang string="TEST_CASE_TAB_EDIT_BASIC_INFO_NAME_PLACEHOLDER" />}
                  value={TestData.name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label={<VplLang string="TEST_CASE_TAB_EDIT_BASIC_INFO_DESCRIPTION_PLACEHOLDER" />}
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
            <ListItemText inset primary={<VplLang string="TEST_CASE_TAB_CODE_TITLE" />} secondary={<VplLang string="TEST_CASE_TAB_CODE_DESCRIPTION" />} />
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
            <ListItemText inset primary={<VplLang string="TEST_CASE_TAB_GRADE_AND_TOPICS_TITLE" />} secondary={<VplLang string="TEST_CASE_TAB_GRADE_AND_TOPICS_DESCRIPTION" />} />
            {windowOpen === 'topicTabOpen' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={windowOpen === 'topicTabOpen'} timeout="auto" unmountOnExit>
            <Card elevation={0}>

              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  <VplLang string="TEST_CASE_TAB_GRADE_AND_TOPICS_TOPIC_PLACEHOLDER" />
                </Typography>


                <Typeahead
                  id='topics'
                  onChange={this.onChangeTopic}
                  options={topicOptions}
                  defaultValue={this.selectedTopics}
                  name='topics'
                  isDisabled={this.state.readOnly}
                  placeholder=""
                />

               <TextField
                  id="standard-name"
                  label={<VplLang string="TEST_CASE_TAB_GRADE_AND_TOPICS_GRADE_PLACEHOLDER" />}
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
            <ListItemText inset primary={<VplLang string="TEST_CASE_TAB_POSITIVE_TITLE" />} secondary={<VplLang string="TEST_CASE_TAB_POSITIVE_DESCRIPTION" />} />
            {windowOpen === 'positiveTabIsOpen' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={windowOpen === 'positiveTabIsOpen'} timeout="auto" unmountOnExit>
            <Card elevation={0}>
              <CardContent>
                <TextField
                  id="standard-name"
                  style={{ width: '100%' }}
                  label={<VplLang string="TEST_CASE_TAB_POSITIVE_MESSAGE" />}
                  value={TestData.successMessage}
                  onChange={this.handleChange('successMessage')}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label={<VplLang string="TEST_CASE_TAB_POSITIVE_LINK" />}
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
            <ListItemText inset primary={<VplLang string="TEST_CASE_TAB_NEGATIVE_TITLE" />} secondary={<VplLang string="TEST_CASE_TAB_NEGATIVE_DESCRIPTION" />} />
            {windowOpen === 'negativeTabIsOpen' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={windowOpen === 'negativeTabIsOpen'} timeout="auto" unmountOnExit>
            <Card elevation={0}>
              <CardContent>
                <TextField
                  id="standard-name"
                  style={{ width: '100%' }}
                  label={<VplLang string="TEST_CASE_TAB_NEGATIVE_MESSAGE" />}
                  value={TestData.failureMessage}
                  onChange={this.handleChange('failureMessage')}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label={<VplLang string="TEST_CASE_TAB_NEGATIVE_LINK" />}
                  style={{ width: '100%' }}
                  value={TestData.failureMessageLink}
                  onChange={this.handleChange('failureMessageLink')}
                  margin="normal"
                />
              </CardContent>
            </Card>
          </Collapse>
        </Paper>


        {!readOnly && <Button onClick={this.onSave} aria-label="Save" variant="contained" color="primary">{<VplLang string="SAVE" />}</Button>}
      </React.Fragment >
    )
  }



}