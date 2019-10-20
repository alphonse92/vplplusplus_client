import React from 'react';
import moment from 'moment'
import { capitalize } from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from './redux/actions';
import { Flex } from '../../../lib/components/flex';
import { Select, MenuItem, FormControl, InputLabel, TextField, Button, Typography } from '@material-ui/core';
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
    const { report: root } = state
    const { project } = root
    const { stadistics, report } = project
    const { timeline, mostSkilledStudents } = stadistics
    const { options, loading } = timeline
    const { type, each, steps, from, topic } = options
    return { loading, report, mostSkilledStudents, type, each, steps, from, topic }
  }

  static mapDispatchToProps = (dispatch) => {
    const DISPATCHERS = {
      ...bindActionCreators({ ...ActionCreators }, dispatch),
    }
    return { DISPATCHERS }
  }
  state = {
    age: LineChartTypeOptions[0]
  }

  componentDidMount() {

    const { report, project_id, from: fromFilter } = this.props
    if (report.length && project_id) {
      // if project_id exists, then all user reports has the same project
      const [firstReport = {}] = report
      const { projects = [] } = firstReport
      const [firstProject = {}] = projects
      const { createdAt: from } = firstProject
      if (fromFilter !== from) {
        this.props.DISPATCHERS.SET_PROJECT_TIMELINE_FILTER({ from })
      }
    }
    else if (report.length && !project_id) {
      // get the first project that was created for example
    }
    else {
      // is a user report...  get the first project that was created in all report.projects array
    }
  }
  isLoadingReport = () => this.props.loading

  loadProjectTimeline = clean => () => {
    if (clean) this.props.DISPATCHERS.CLEAR_PROJECT_TIMELINE_DATASETS()
    const options = { separeByTopic: this.selected && this.selected.topic && !!this.selected.topic.length }
    this.props.DISPATCHERS.GET_PROJECT_TIMELINE(this.props.project_id, options)
  }

  triggerChangeOptions = (data) => {
    this.props.DISPATCHERS.SET_PROJECT_TIMELINE_FILTER(data)
  }

  handleChange = attribute => event => {
    this.triggerChangeOptions({ [attribute]: event.target.value })
  };

  onChangeTypeahead = nameAttribute => selectedOptions => {
    const arrayOfSelectedTopics = selectedOptions ? selectedOptions : []
    const options = arrayOfSelectedTopics.map(({ value }) => value)

    const { selected = {} } = this
    this.selected = { ...selected, [nameAttribute]: arrayOfSelectedTopics }

    this.triggerChangeOptions({ [nameAttribute]: options })
  }

  onSelectAllTypeahead = (attribute, options) => () => this.onChangeTypeahead(attribute)(options)

  render() {

    if (!this.props.show) return <React.Fragment></React.Fragment>

    const { props, selected = {} } = this
    const { topic: selectedTopics = [], projects: selectedProjects = [] } = selected
    const { type, each, steps, from } = props
    const topics = this.props.mostSkilledStudents.map(({ description, name, _id }) => ({ _id, description, name }))
    const topicOptions = topics.map(({ name: value, description }, index) => ({ value, label: `${value} - ${description}`, index }))
    const width = `${100 / 4}%`
    const marginRowBottom = "13px"
    const styleTypeahead = { container: () => ({ flexGrow: 1 }) }

    return (
      <Flex vertical>
        <Typography variant="h6" gutterBottom>Timeline Generator Options</Typography>
        <Flex vertical marginBottom={marginRowBottom}>
          <Flex horizontal>
            <Typeahead
              id='topics'
              name='topics'
              onChange={this.onChangeTypeahead('topic')}
              options={topicOptions}
              defaultValue={[...selectedTopics]}
              placeholder="Select topic"
              portal={false}
              styles={styleTypeahead}
            />
            <Button color="primary" onClick={this.onSelectAllTypeahead('topic', topicOptions)} >Select all</Button>
          </Flex>
        </Flex>
        <Flex vertical marginBottom={marginRowBottom}>
          <Flex horizontal>
            <Typeahead
              id='projects'
              name='projects'
              onChange={this.onChangeTypeahead('topic')}
              options={topicOptions}
              defaultValue={[...selectedProjects]}
              placeholder="Compare with another projects"
              portal={false}
              styles={styleTypeahead}
            />
            <Button color="primary" onClick={this.onSelectAllTypeahead('topic', topicOptions)} >Select all</Button>
          </Flex>
        </Flex>
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
                value={steps}
                onChange={this.handleChange('steps')}>
                {PeriodOpts.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </Select>
            </FormControl>
          </Flex>
        </Flex>
        <Flex horizontal reverse marginBottom={marginRowBottom}>
          <Button color="primary" onClick={this.loadProjectTimeline(true)}>Clean and reload</Button>
          <Button color="primary" onClick={this.loadProjectTimeline(false)}>Reload</Button>
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