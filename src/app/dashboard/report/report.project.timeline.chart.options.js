import React from 'react';
import moment from 'moment'
import { capitalize } from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from './redux/actions';
import { cutStringAndAddDots } from '../../../lib';
import { Flex } from '../../../lib/components/flex';
import { Select, MenuItem, FormControl, InputLabel, TextField } from '@material-ui/core';

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
    const { timeline } = stadistics
    const { options } = timeline
    return { options, report }
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
    const { report, project_id, options } = this.props
    if (report.length && project_id) {
      // if project_id exists, then all user reports has the same project
      const [firstReport = {}] = report
      const { projects = [] } = firstReport
      const [firstProject = {}] = projects
      const { createdAt: from } = firstProject
      const { from: fromFilter } = options
      fromFilter !== from && this.props.DISPATCHERS.SET_PROJECT_TIMELINE_FILTER({ from })
    }
    else if (report.length && !project_id) {
      // get the first project that was created for example
    }
    else {
      // is a user report...  get the first project that was created in all report.projects array
    }
  }

  handleChange = attribute => event => {
    this.props.DISPATCHERS.SET_PROJECT_TIMELINE_FILTER({ [attribute]: event.target.value })
    this.props.DISPATCHERS.CLEAR_PROJECT_TIMELINE_DATASETS()
    this.props.DISPATCHERS.GET_PROJECT_TIMELINE(this.props.project_id)
  };

  render() {
    const { type, each, steps, from } = this.props.options
    const MarginRight = '13px'
    return <Flex vertical>

      <Flex horizontal>
        <Flex marginRight={MarginRight}>
          <FormControl >
            <InputLabel shrink htmlFor="from-label-placeholder">Time range</InputLabel>
            <TextField
              label="From"
              type="date"
              defaultValue={from || moment().format('YYYY-MM-DD')}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange('from')}
            />
          </FormControl>
        </Flex>
        <Flex marginRight={MarginRight}>
          <FormControl >
            <InputLabel shrink htmlFor="type-label-placeholder">Time range</InputLabel>
            <Select
              value={type}
              onChange={this.handleChange('type')}>
              {LineChartTypeOptions.map(opt => <MenuItem key={opt} value={opt}>{capitalize(opt)}</MenuItem>)}
            </Select>
          </FormControl>
        </Flex>
        <Flex marginRight={MarginRight}>
          <FormControl >
            <InputLabel shrink htmlFor="each-label-placeholder">Period</InputLabel>
            <Select
              value={each}
              onChange={this.handleChange('each')}>
              {PeriodOpts.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </Select>
          </FormControl>
        </Flex>
        <Flex marginRight={MarginRight}>
          <FormControl >
            <InputLabel shrink htmlFor="steps-label-placeholder">Frequency</InputLabel>
            <Select
              value={steps}
              onChange={this.handleChange('steps')}>
              {PeriodOpts.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </Select>
          </FormControl>
        </Flex>
        <Flex marginRight={MarginRight}>
          <p>Take {steps} of {each} {type} from {from}</p>
        </Flex>
      </Flex>
    </Flex>
  }
}

const ConnectedProjectReportTimelineChartOptions = connect(
  ProjectReportTimelineChartOptions.mapStateToProps,
  ProjectReportTimelineChartOptions.mapDispatchToProps,
)(ProjectReportTimelineChartOptions)

export {
  ConnectedProjectReportTimelineChartOptions as ProjectReportTimelineChartOptions
}