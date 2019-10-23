import React from 'react';
import moment from 'moment'
import { capitalize } from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators as ProjectActions } from '../laboratory/project/redux/actions'
import { ActionCreators } from './redux/actions';
import { Flex } from '../../../lib/components/flex';
import { Select, MenuItem, FormControl, InputLabel, TextField, Button, Typography, FormControlLabel, Switch } from '@material-ui/core';
import { Typeahead } from '../../../lib/components/material/form/typeahead';
const LineChartTypeOptions = [
  'years',
  'quarters',
  'months',
  'weeks',
  'days',
  'hours',
  'minutes',
  'seconds',
  'milliseconds',
]

const PeriodOpts = Array.from(Array(10), (v, i) => i + 1)

/**
 * This component will show a filter to filter the report by
 * type: string could be one of  [month, days, years,]
 * each: number, the amount of types [6 months, 6 days, 6 years]
 * topic: Array of strings, the topics line. Those topics should be taked from props
 */
class ProjectReportTimelineChartOptions extends React.Component {
  static mapStateToProps = (state) => {
    const { report: root, projects: projectScope } = state
    const { list: listOfProjects } = projectScope
    const { all: projectList = [] } = listOfProjects
    const { project } = root
    const { stadistics, report } = project
    const { timeline, mostSkilledStudents } = stadistics
    const { options, loading } = timeline
    const { type, each, steps, from, topic, projects, id, showProjectFilter, showStudentFilter, separeByTopic } = options
    return { loading, report, mostSkilledStudents, type, each, steps, from, topic, projects, projectList, id, showProjectFilter, showStudentFilter, separeByTopic }
  }

  static mapDispatchToProps = (dispatch) => {
    const { LIST_PROJECTS } = ProjectActions
    const DISPATCHERS = {
      ...bindActionCreators({ ...ActionCreators, LIST_PROJECTS }, dispatch),

    }
    return { DISPATCHERS }
  }
  selected = {}
  state = {
    persistData: false
  }

  componentDidMount() {

    this.props.showProjectFilter && this.props.DISPATCHERS.LIST_PROJECTS()
    // this.props.showStudentFilter && this.props.DISPATCHERS.LIST_STUDENTS()

    const { report, from: fromFilter, id } = this.props
    const takeFromOfLoadedElement = report && report.length && id
    const takeFromFirstLoadElements = !report || (report.length && !id)

    if (takeFromOfLoadedElement) {

      const [firstReport = {}] = report
      const { projects = [] } = firstReport
      const [firstProject = {}] = projects
      const { createdAt: from } = firstProject

      if (fromFilter !== from) {
        this.props.DISPATCHERS.SET_PROJECT_TIMELINE_FILTER({ from })
      }

    }
    else if (takeFromFirstLoadElements) {
      // get the first project that was created for example
    }
    else {
      // is a user report...  get the first project that was created in all report.projects array
    }

  }

  isLoadingReport = () => this.props.loading

  toggle = attribute => () => {
    this.setState({ [attribute]: !this.state[attribute] })
  }

  clearData = () => {
    this.props.DISPATCHERS.SET_PROJECT_TIMELINE_FILTER({ separeByTopic: false })
    this.props.DISPATCHERS.CLEAR_PROJECT_TIMELINE_DATASETS()
  }

  triggerChangeOptions = (data) => this.props.DISPATCHERS.SET_PROJECT_TIMELINE_FILTER(data)

  clearTypeaheadOptions = () => {
    if (!this.state.clearInputs) return
    this.triggerChangeOptions({ topic: [], projects: [] })
    Object
      .keys(this.selected)
      .forEach(typeaheadAttribute => {
        this.selected[typeaheadAttribute] = []
      })
  }

  handleChange = attribute => event => this.triggerChangeOptions({ [attribute]: event.target.value })

  onSelectAllTypeahead = (attribute, options) => () => this.onChangeTypeahead(attribute)(options)

  onChangeTypeahead = nameAttribute => selectedOptions => {
    const arrayOfSelectedOptions = selectedOptions ? selectedOptions : []
    const options = arrayOfSelectedOptions.map(({ value }) => value)
    const { selected = {} } = this

    this.selected = { ...selected, [nameAttribute]: arrayOfSelectedOptions }
    const payload = { [nameAttribute]: options }

    this.triggerChangeOptions(payload)
  }

  loadProjectTimeline = () => {


    const { separeByTopic } = this.props
    const isTopicSelected = this.selected && this.selected.topic && !!this.selected.topic.length
    const shouldSepareByTopic = separeByTopic
      ? separeByTopic && isTopicSelected
      : isTopicSelected
    const { persistData: append } = this.state

    this.props.DISPATCHERS.SET_PROJECT_TIMELINE_FILTER({ separeByTopic: shouldSepareByTopic })
    this.props.DISPATCHERS.GET_PROJECT_TIMELINE()
    if (!append) this.clearData()
    this.clearTypeaheadOptions()

  }


  render() {

    if (!this.props.show) return <React.Fragment></React.Fragment>

    const { props, selected = {}, state } = this
    const { persistData, clearInputs } = state
    const { topic: selectedTopics = [], projects: selectedProjects = [], selectedStudents = [] } = selected
    const { type, each, steps, from, projectList = [], studentList = [] } = props

    const topics = this.props.showTopicFilter
      ? this.props.mostSkilledStudents.map(({ description, name, _id }) => ({ _id, description, name }))
      : []
    const topicOptions = topics.map((data) => {
      const { name: value, description: label } = data
      return { value, label, data }
    })

    const projectsOptions = projectList.map((data) => {
      const { name: label, _id: value } = data
      return { value, label, data }
    })

    const studentOptions = studentList.map((data) => {
      const { name, lastname, _id: value } = data
      const label = `${name} ${lastname}`
      return { value, label, data }
    })

    const width = `${100 / 4}%`
    const marginRowBottom = "13px"
    const STYLE_TYPEAHEAD = { container: () => ({ flexGrow: 1 }) }

    return (
      <Flex vertical>
        <Typography variant="h6" gutterBottom>Timeline Generator Options</Typography>
        {this.props.showTopicFilter && <Flex vertical marginBottom={marginRowBottom}>
          <Flex horizontal>
            <Typeahead
              id='topics'
              name='topics'
              onChange={this.onChangeTypeahead('topic')}
              options={topicOptions}
              defaultValue={[...selectedTopics]}
              placeholder="Select topic"
              portal={false}
              styles={STYLE_TYPEAHEAD}
            />
            <Button color="primary" onClick={this.onSelectAllTypeahead('topic', topicOptions)} >Select all</Button>
          </Flex>
        </Flex>}
        {this.props.showProjectFilter && <Flex vertical marginBottom={marginRowBottom}>
          <Flex horizontal>
            <Typeahead
              id='projects'
              name='projects'
              onChange={this.onChangeTypeahead('projects')}
              options={projectsOptions}
              defaultValue={[...selectedProjects]}
              placeholder="Compare with another projects"
              portal={false}
              styles={STYLE_TYPEAHEAD}
            />
            <Button color="primary" onClick={this.onSelectAllTypeahead('projects', projectsOptions)} >Select all</Button>
          </Flex>
        </Flex>}
        {this.props.showStudentFilter && <Flex vertical marginBottom={marginRowBottom}>
          <Flex horizontal>
            <Typeahead
              id='students'
              name='students'
              onChange={this.onChangeTypeahead('students')}
              options={studentOptions}
              defaultValue={[...selectedStudents]}
              placeholder="Compare with another students"
              portal={false}
              styles={STYLE_TYPEAHEAD}
            />
            <Button color="primary" onClick={this.onSelectAllTypeahead('students', studentOptions)} >Select all</Button>
          </Flex>
        </Flex>}
        <Flex horizontal marginBottom={marginRowBottom}>
          <Flex vertical width={width}>
            <FormControl >
              <TextField
                label="Start at"
                type="date"
                defaultValue={moment(from).format('YYYY-MM-DD')}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleChange('from')}
              />
            </FormControl>
          </Flex>
          <Flex vertical width={width}>
            <FormControl >
              <InputLabel shrink htmlFor="type-label-placeholder">Time range</InputLabel>
              <Select
                disabled={persistData}
                value={type}
                onChange={this.handleChange('type')}>
                {LineChartTypeOptions.map(opt => <MenuItem key={opt} value={opt}>{capitalize(opt)}</MenuItem>)}
              </Select>
            </FormControl>
          </Flex>
          <Flex vertical width={width}>
            <FormControl >
              <InputLabel shrink htmlFor="each-label-placeholder">Period</InputLabel>
              <Select
                disabled={persistData}
                value={each}
                onChange={this.handleChange('each')}>
                {PeriodOpts.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </Select>
            </FormControl>
          </Flex>
          <Flex vertical width={width}>
            <FormControl >
              <InputLabel shrink htmlFor="steps-label-placeholder">Frequency</InputLabel>
              <Select
                disabled={persistData}
                value={steps}
                onChange={this.handleChange('steps')}>
                {PeriodOpts.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </Select>
            </FormControl>
          </Flex>
        </Flex>
        <Flex horizontal reverse marginBottom={marginRowBottom}>
          <Button color="primary" onClick={this.loadProjectTimeline}>Load</Button>
          <Button color="primary" onClick={this.clearData}>Reset</Button>
          <FormControlLabel
            control={
              <Switch
                checked={persistData}
                onChange={this.toggle('persistData')}
                color="primary"
              />
            }
            label="Add to the current chart"
          />
          <FormControlLabel
            control={
              <Switch
                checked={clearInputs}
                onChange={this.toggle('clearInputs')}
                color="primary"
              />
            }
            label="Clear inputs"
          />

        </Flex>
      </Flex>

    )
  }
}

const ConnectedProjectReportTimelineChartOptions = connect(
  ProjectReportTimelineChartOptions.mapStateToProps,
  ProjectReportTimelineChartOptions.mapDispatchToProps,
)(ProjectReportTimelineChartOptions)

export {
  ConnectedProjectReportTimelineChartOptions as ProjectReportTimelineChartOptions
}