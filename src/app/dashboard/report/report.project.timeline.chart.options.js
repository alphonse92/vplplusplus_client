import React from 'react';
import { capitalize } from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from './redux/actions';
import { Line } from 'react-chartjs-2';
import ErrorOutlineOutlined from '@material-ui/icons/ErrorOutlineOutlined';
import { cutStringAndAddDots } from '../../../lib';
import { Flex } from '../../../lib/components/flex';

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
    const { datasets, options } = timeline
    return { datasets, options }
  }

  static mapDispatchToProps = (dispatch) => {
    const DISPATCHERS = {
      ...bindActionCreators({ ...ActionCreators }, dispatch),
    }
    return { DISPATCHERS }
  }

  loadRepor = () => {
    // DISPATCHERS.SETFILTER
    // DISPACHERS.LOAD_REPORT
  }

  render() {
    return <p>{JSON.stringify(this.props.options)}</p>
  }
}

const ConnectedProjectReportTimelineChartOptions = connect(
  ProjectReportTimelineChartOptions.mapStateToProps,
  ProjectReportTimelineChartOptions.mapDispatchToProps,
)(ProjectReportTimelineChartOptions)

export {
  ConnectedProjectReportTimelineChartOptions as ProjectReportTimelineChartOptions
}