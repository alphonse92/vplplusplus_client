import React from 'react';
import { capitalize } from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from './redux/actions';
import { Line } from 'react-chartjs-2';
import ErrorOutlineOutlined from '@material-ui/icons/ErrorOutlineOutlined';
import { cutStringAndAddDots } from '../../../lib';
import { Flex } from '../../../lib/components/flex';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@material-ui/core';

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
    const { stadistics } = project
    const { timeline } = stadistics
    const { options } = timeline
    return { options }
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

  handleChange = attribute => event => {
    this.props.DISPATCHERS.SET_PROJECT_TIMELINE_FILTER({ [attribute]: event.target.value })
    this.props.DISPATCHERS.CLEAR_PROJECT_TIMELINE_DATASETS()
    this.props.DISPATCHERS.GET_PROJECT_TIMELINE(this.props.project_id)
  };

  render() {
    const { type, each, steps, from } = this.props.options

    return <Flex horizontal>
      <p>Every {each} {type} from {from ? 'project starts' : from} Until {steps} periods</p>
      <FormControl >
        <InputLabel shrink htmlFor="age-label-placeholder">Period</InputLabel>
        <Select
          value={type}
          onChange={this.handleChange('type')}>
          {LineChartTypeOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
        </Select>
        <FormHelperText>Select the project period submissions. Default: project creation date</FormHelperText>
      </FormControl>

      <FormControl >
        <InputLabel shrink htmlFor="age-label-placeholder">Period</InputLabel>
        <Select
          value={each}
          onChange={this.handleChange('each')}>
          {PeriodOpts.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
        </Select>
        <FormHelperText>This value shows the period frequency</FormHelperText>
      </FormControl>

      <FormControl >
        <InputLabel shrink htmlFor="age-label-placeholder">Steps</InputLabel>
        <Select
          value={steps}
          onChange={this.handleChange('steps')}>
          {PeriodOpts.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
        </Select>
        <FormHelperText>This value shows many times the report will taked </FormHelperText>
      </FormControl>


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