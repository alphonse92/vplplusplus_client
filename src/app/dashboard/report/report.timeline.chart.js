import React from 'react';
import { capitalize } from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from './redux/actions';
import { Line } from 'react-chartjs-2';
import ErrorOutlineOutlined from '@material-ui/icons/ErrorOutlineOutlined';
import { Flex } from '../../../lib/components/flex';
import { ProjectReportTimelineChartOptions } from './report.timeline.chart.options';
import { MATERIAL_COLORS } from '../../../constants';
import { Switch, FormControlLabel } from '@material-ui/core';
import { ReportTimelineMeaningTable } from './report.timeline.meaning.table';
import { VplLang } from '../../../redux/lang';

const DATASET_BASE = {

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
}


const OPTS_BASE = {
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
    callbacks: {
      label: function (tooltipItem, myData) {
        const index = tooltipItem.datasetIndex
        const def = `No label ${index}`
        const { label } = myData.datasets[index]
        const text = isNaN(label)
          ? def
          : `DATASET #${label} - VALUE:  ${parseFloat(tooltipItem.value).toFixed(2)}`
        return text
      }
    }
  }
}


class ProjectReportTimelineChart extends React.Component {

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
    this.props.DISPATCHERS.GET_PROJECT_TIMELINE(this.props.options.id)
  }

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

      return [...acc, { ...DATASET_BASE, ...custom }]
    }, [])

    const chartOpts = {
      ...{
        ...OPTS_BASE,
        scales: {
          ...OPTS_BASE.scales,
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
      label={<VplLang string="REPORT_TIMELINE_GENERATOR_OPTIONS_HIDE_EMPTY_DATA" />}
    />

    const NoDataComponent = (props) => {
      const def_error = 'Something happend please contact to the administrator'
      const no_data_label = <VplLang string="REPORT_TIMELINE_GENERATOR_OPTIONS_NO_DATA_TO_SHOWN" />
      const Wrapper = ({ children }) => <Flex margin='13px' vertical alignItems='center' fontSize='13px' textAlign='center'>
        <ErrorOutlineOutlined />{children}
      </Flex>


      if (!props.error) return <Wrapper>{no_data_label}</Wrapper>

      const { data = {} } = props.error
      const { error = { status: 500 } } = data
      const { message = def_error } = error
      const text = props.error.status === 500 ? def_error : message
      return (
        <Flex margin='13px' vertical alignItems='center' fontSize='13px' textAlign='center'><ErrorOutlineOutlined />
          {text}
        </Flex>
      )
    }

    return (
      <Flex vertical margin="13px">
        <ProjectReportTimelineChartOptions show={shouldShow.options} project_id={this.props.id} />
        {!!shouldShow.line && <ToggleEmptyData />}
        {!!shouldShow.line && <ReportTimelineMeaningTable data={labelDefinitions} />}
        {!!shouldShow.line && <Line {...lineProps} />}
        {!!shouldShow.nodata && <NoDataComponent error={error} />}
        {!!shouldShow.loading && <p><VplLang string="LOADING" /></p>}
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
