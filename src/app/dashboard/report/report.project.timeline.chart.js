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
import { Table, TableHead, TableRow, TableBody, TableCell, Typography, Switch, FormControlLabel } from '@material-ui/core';

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
          {data.map((def, idx) => {
            const { label, topic, project, color } = def
            let TopicText = topic && topic.length ? topic.map(({ description }) => description).join(',') : "All"
            return (
              <TableRow key={idx}>
                <TableCell><span style={{ padding: '7px', backgroundColor: color }}>{label}</span></TableCell>
                <TableCell>{project.name}</TableCell>
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

  state = {
    hideEmptyDatasets: true
  }

  componentDidMount() {
    this.props.DISPATCHERS.CLEAR_PROJECT_TIMELINE_DATASETS()
    this.props.DISPATCHERS.GET_PROJECT_TIMELINE(this.props.project_id)
  }

  getLabelByTopicAndProject = ({ name: nameTopic }, { name: nameProject }) => `${nameTopic}-${nameProject}`

  toggleEmptyData = () => this.setState({ hideEmptyDatasets: !this.state.hideEmptyDatasets })

  render() {
    const { props, state } = this
    const { hideEmptyDatasets } = state
    const { labels, datasets, options = {}, loading: isLoading, error } = props
    const { steps } = options
    const labelDefinitions = []
    const chardatasets = datasets.reduce((acc, ds, idx) => {
      const data = ds.map(({ skill }) => skill ? skill : 0)
      const sum = data.reduce((sum, d) => d + sum, 0)
      if (hideEmptyDatasets && !sum) {
        return acc
      }

      const label = acc.length
      const color = MATERIAL_COLORS[label]
      const custom = {
        data,
        label,
        backgroundColor: color,
        borderColor: color,
        pointBackgroundColor: color,
        pointBorderColor: color
      }

      labelDefinitions.push({ color, label, ...labels[idx] })

      return [...acc, { ...ProjectReportTimelineChart.DATASET_BASE, ...custom }]
    }, [])

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



    const data = { labels: Array.from(Array(steps), (v, i) => i), datasets: chardatasets }
    const lineProps = { data, options: chartOpts }
    const shouldShow = {
      options: !isLoading,
      line: !isLoading && datasets && datasets.length,
      nodata: (!isLoading && error) || (!isLoading && (!datasets || !datasets.length)),
      loading: isLoading,
    }
    const ToggleEmptyData = () => <FormControlLabel
      control={
        <Switch
          checked={hideEmptyDatasets}
          onChange={this.toggleEmptyData}
          color="primary"
        />
      }
      label="Hidde empty datat"
    />

    const NoDataComponent = (props) => {
      const def_error = 'Something happend please contact to the administrator'
      const no_data_label = 'No data to show'
      const Wrapper = () => <Flex margin='13px' vertical alignItems='center' fontSize='13px' textAlign='center'>
        <ErrorOutlineOutlined />{props.children}
      </Flex>


      if (!props.error) return <Wrapper>{no_data_label}</Wrapper>

      const { data = {} } = props.error
      const { error = {} } = data
      const { message = def_error } = error
      const text = props.status === 500 ? def_error : message
      return (
        <Flex margin='13px' vertical alignItems='center' fontSize='13px' textAlign='center'><ErrorOutlineOutlined />
          {text}
        </Flex>
      )
    }
    return (
      <Flex vertical margin="13px">
        <ProjectReportTimelineChartOptions show={shouldShow.options} project_id={this.props.project_id} />
        {!!shouldShow.line && <ToggleEmptyData />}
        {!!shouldShow.line && <ProjectReportTimeLabelTable data={labelDefinitions} />}
        {!!shouldShow.line && <Line {...lineProps} />}
        {!!shouldShow.nodata && <NoDataComponent error={error} />}
        {!!shouldShow.loading && <p>Loading timeline</p>}
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
