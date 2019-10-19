import React from 'react';
import { capitalize } from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from './redux/actions';
import { Line } from 'react-chartjs-2';
import ErrorOutlineOutlined from '@material-ui/icons/ErrorOutlineOutlined';
import { cutStringAndAddDots } from '../../../lib';
import { Flex } from '../../../lib/components/flex';
import { ProjectReportTimelineChartOptions } from './report.project.timeline.chart.options';
import { MATERIAL_COLORS } from '../../../constants';
import { Typography } from '@material-ui/core';

class ProjectReportTimelineChart extends React.Component {
  static DATASET_BASE = {

    fill: false,
    lineTension: 0,
    backgroundColor: 'rgba(75,192,192,0.4)',

    borderColor: 'rgba(75,192,192,1)',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointBackgroundColor: '#fff',

    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    // data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40,]
  }

  static OPTS_BASE = {
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Time period'
        }
      }],
      yAxes: [{
        min: 0,
        max: 100,
        scaleLabel: {
          display: true,
          labelString: 'Skill Student Average',
        }
      }]
    },
    tooltips: {
      intersect: false,
      mode: 'index',
      callbacks: {
        label: function (tooltipItem, myData) {
          var label = myData.datasets[tooltipItem.datasetIndex].label || '';
          if (label) {
            label += ': ';
          }
          label += parseFloat(tooltipItem.value).toFixed(2);
          return label;
        }
      }
    }
  }

  static mapStateToProps = (state) => {
    const { report: root } = state
    const { project } = root
    const { stadistics } = project
    const { timeline } = stadistics
    const { datasets, labels, options, loading } = timeline
    return { datasets, options, loading, labels }
  }

  static mapDispatchToProps = (dispatch) => {
    const DISPATCHERS = {
      ...bindActionCreators({ ...ActionCreators }, dispatch),
    }
    return { DISPATCHERS }
  }

  componentDidMount() {
    this.props.DISPATCHERS.CLEAR_PROJECT_TIMELINE_DATASETS()
    this.props.DISPATCHERS.GET_PROJECT_TIMELINE(this.props.project_id)
  }

  render() {
    const { props } = this
    const { labels, datasets, options = {} } = props
    const { steps } = options
    const chardatasets = datasets.map((ds, idx) => {
      const idxColor = Math.floor(Math.random() * MATERIAL_COLORS.length)
      const color = MATERIAL_COLORS[idxColor]
      const label = cutStringAndAddDots(labels[idx])
      const data = ds.map(({ skill }) => skill)
      const custom = {
        data,
        label,
        backgroundColor: color,
        borderColor: color,
        pointBackgroundColor: color,
        pointBorderColor: color
      }
      return { ...ProjectReportTimelineChart.DATASET_BASE, ...custom }
    })

    const chartOpts = {
      ...{
        ...ProjectReportTimelineChart.OPTS_BASE,
        scales: {
          ...ProjectReportTimelineChart.OPTS_BASE.scales,
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: `Every ${options.steps} ${capitalize(options.type)} from ${options.from ? options.from : 'project starts'}`
            }
          }],
        },
      },
      ...options,

    }

    const NoDataComponent = () => <Flex margin='13px' vertical alignItems='center' fontSize='13px' textAlign='center'><ErrorOutlineOutlined /> No data to show</Flex>

    const data = { labels: Array.from(Array(steps), (v, i) => i), datasets: chardatasets }
    const lineProps = { data, options: chartOpts }
    const isLoading = this.props.loading

    const shouldShow = {
      options: !isLoading,
      line: !isLoading && datasets && datasets.length,
      nodata: !isLoading && (!datasets || !datasets.length),
      loading: isLoading
    }

    return (
      <React.Fragment>
        <ProjectReportTimelineChartOptions show={shouldShow.options} project_id={this.props.project_id} />
        {shouldShow.line && (
          <React.Fragment>
            <Typography variant="title" gutterBottom>Timeline</Typography>
            <Line {...lineProps} />
          </React.Fragment>

        )}
        {shouldShow.nodata && <NoDataComponent />}
        {shouldShow.loading && <p>Loading timeline</p>}
      </React.Fragment >
    )

  }
}

const ProjectReportTimelineChartConnected = connect(
  ProjectReportTimelineChart.mapStateToProps,
  ProjectReportTimelineChart.mapDispatchToProps,
)(ProjectReportTimelineChart)

export {
  ProjectReportTimelineChartConnected as ProjectReportTimelineChart
}
