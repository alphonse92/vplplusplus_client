import React from 'react';
import { capitalize } from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from './redux/actions';
import { Line } from 'react-chartjs-2';
import ErrorOutlineOutlined from '@material-ui/icons/ErrorOutlineOutlined';
import { cutStringAndAddDots } from '../../../lib';
import { Flex } from '../../../lib/components/flex';
import { Select, MenuItem } from '@material-ui/core';

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
    return <Flex horizontal>
      <Select
        value={this.props.options.type}
        onChange={this.handleChange('type')}>
        {LineChartTypeOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
      </Select>
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