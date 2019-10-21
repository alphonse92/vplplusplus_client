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
import { Table, TableHead, TableRow, TableBody, TableCell, Typography } from '@material-ui/core';

const ProjectReportTimeLabelTable = (props) => {
  const { data = [] } = props
  if (!data.length) return <React.Fragment></React.Fragment>
  return (
    <Flex vertical>
      <Typography variant="h6" gutterBottom>Timeline meanings</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Topic</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((def) => {
            const { label, topic, project } = def
            let TopicText = topic && topic.length ? topic.join(',') : "All"
            return (
              <TableRow>
                <TableCell>{label}</TableCell>
                <TableCell>{project}</TableCell>
                <TableCell>{TopicText}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Flex>

  )
}

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
        display: true,
        ticks: {
          beginAtZero: true,
          steps: 20,
          stepValue: 5,
          max: 100
        },
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
    const { datasets, labels, options, loading, error } = timeline
    return { datasets, options, loading, labels, error }
  }

  static mapDispatchToProps = (dispatch) => {
    const DISPATCHERS = {
      ...bindActionCreators({ ...ActionCreators }, dispatch),
    }
    return { DISPATCHERS }
  }

  state = {}

  componentDidMount() {
    this.props.DISPATCHERS.CLEAR_PROJECT_TIMELINE_DATASETS()
    this.props.DISPATCHERS.GET_PROJECT_TIMELINE(this.props.project_id)
  }

  getLabelByTopicAndProject = ({ name: nameTopic }, { name: nameProject }) => `${nameTopic}-${nameProject}`

  onLoadProject = (event) => {

    console.log(event)

    // const { topic = [], projects = [], append } = event

    // let { labelMap = {}, labelIndex = 0 } = this.state

    // // reset if the options isnot appening data to the chart

    // if (!append) {
    //   labelIndex = 0
    //   labelMap = {}
    // }

    // if (topic.length && projects.length) {
    //   topic.forEach(topicSelected => {
    //     const { data: topic } = topicSelected
    //     projects.forEach(projectSelected => {
    //       const { data: project } = projectSelected
    //       const label = this.getLabelByTopicAndProject(topic, project)
    //       labelIndex++
    //       labelMap[label] = { label, topic, project, tag: labelIndex }
    //     })
    //   })
    // } else if (topic.length) {
    //   topic.forEach((topicSelected, index) => {
    //     const { data: topic } = topicSelected
    //     const label = topic.name
    //     labelIndex++
    //     labelMap[label] = { label, topic, tag: labelIndex }
    //   })
    // }

    // this.setState({ labelMap, labelIndex })
  }

  render() {
    const { props } = this
    const { labels, datasets, options = {}, loading: isLoading, error: isError } = props
    const { steps } = options
    const labelDefinitions = []
    const chardatasets = datasets.map((ds, idx) => {
      const idxColor = Math.floor(Math.random() * MATERIAL_COLORS.length)
      const color = MATERIAL_COLORS[idxColor]
      const label = idx
      const data = ds.map(({ skill }) => skill ? skill : 0)
      const custom = {
        data,
        label: idx,
        backgroundColor: color,
        borderColor: color,
        pointBackgroundColor: color,
        pointBorderColor: color
      }

      labelDefinitions.push({ label, ...labels[idx] })

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
      title: {
        display: true,
        text: 'Project Timeline'
      }
    }

    const NoDataComponent = () => <Flex margin='13px' vertical alignItems='center' fontSize='13px' textAlign='center'><ErrorOutlineOutlined /> No data to show</Flex>

    const data = { labels: Array.from(Array(steps), (v, i) => i), datasets: chardatasets }
    const lineProps = { data, options: chartOpts }
    const shouldShow = {
      options: !isError && !isLoading,
      line: !isError && !isLoading && datasets && datasets.length,
      nodata: !isError && !isLoading && (!datasets || !datasets.length),
      loading: isLoading,
      error: isError
    }

    return (
      <Flex vertical margin="13px">
        <ProjectReportTimelineChartOptions
          show={shouldShow.options}
          project_id={this.props.project_id}
          onLoad={this.onLoadProject} />
        <ProjectReportTimeLabelTable data={labelDefinitions} />
        {!!shouldShow.line && <Line {...lineProps} />}
        {!!shouldShow.nodata && <NoDataComponent />}
        {!!shouldShow.loading && <p>Loading timeline</p>}
        {!!shouldShow.error && <p>Something happend please contact to the administrator</p>}
      </Flex >
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
