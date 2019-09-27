import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from './redux/actions';
import { Line } from 'react-chartjs-2';
import { cutStringAndAddDots } from '../../../lib';

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
        scaleLabel: {
          display: true,
          labelString: 'Skill Student Average'
        }
      }]
    },
    tooltips: {
      intersect: true,
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
    const { project = {} } = root
    const { stadistics = {} } = project
    const { timeline = { options: {}, datasets: [] } } = stadistics
    return { timeline }
  }

  static mapDispatchToProps = (dispatch) => {
    const DISPATCHERS = {
      ...bindActionCreators({ ...ActionCreators }, dispatch),
    }
    return { DISPATCHERS }
  }

  componentDidMount() {
    console.log('did mount')
    this.props.DISPATCHERS.GET_PROJECT_TIMELINE(this.props.project_id)
  }

  render() {
    const { timeline, options = {} } = this.props
    const { datasets: storeDataSets = [] } = timeline
    const mostLengthyDataset = storeDataSets.reduce(
      (mostLength, ds) => ds.lenght >= mostLength ? ds.timeline.length : mostLength,
      0
    )
    const labels = Array.from(Array(mostLengthyDataset), (a, index) => index)
    const datasets = storeDataSets.map(ds => {
      const { project, timeline } = ds
      const custom = {
        label: cutStringAndAddDots(project.name),
        data: timeline.map(({ skill }) => skill)
      }
      return { ...ProjectReportTimelineChart.DATASET_BASE, custom }
    })


    return (
      <Line data={{ labels, datasets }} options={{ ...ProjectReportTimelineChart.OPTS_BASE, ...options }} />
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
