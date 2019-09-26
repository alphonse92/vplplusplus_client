import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from './redux/actions';
import { ActionCreators as ActionCreatorsForErrors } from '../../../redux/modals/actions';
import {
  Paper
  , ListItem
  , ListItemIcon
  , ListItemText
  , Collapse
} from '@material-ui/core';

import { Line } from 'react-chartjs-2';

import {
  ExpandLess as ExpandLessIcon
  , ExpandMore as ExpandMoreIcon,
  StarBorder
} from '@material-ui/icons';

import { withStyles } from '@material-ui/core/styles';

class ProjectReportTimelineCardNoStyled extends React.Component {

  state = {
    isOpen: false
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
      ...bindActionCreators({ ...ActionCreatorsForErrors }, dispatch)
    }
    return { DISPATCHERS }
  }


  componentDidMount(prevProps) {

  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {

    console.log(this.props)

    const example = [
      {
        "from": "2019-07-29T21:59:49.244Z",
        "to": "2019-07-30T21:59:49.244Z",
        "tag": "2019-07-30",
        "skill": 81.94444444444444,
        "variation": 81.94444444444444
      }]


    const { isOpen } = this.state
    const { data } = this.props
    const chartOpts = {
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
            labelString: 'AVG Skill Achieved'
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

    const LineData = {
      labels: [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7,],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40,]
        },
        {
          label: 'My second dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [0, 65, 65, 65, 65, 65, 65, 0, 65, 65, 65, 65, 65, 65, 0, 65, 65, 65, 65, 65, 65, 0, 65, 65, 65, 65, 65, 65,]
        }
      ]
    };
    return (
      <Paper style={{ marginBottom: '13px', borderTop: '7px solid', width: '100%' }} >
        <ListItem button onClick={this.toggle}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText
            inset
            primary="Project timeline"
            secondary="You can see the project progress along the time" />
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse style={{ root: { padding: '0px' } }} in={isOpen} timeout="auto" unmountOnExit>
          <Line data={LineData} options={chartOpts} />
        </Collapse>
      </ Paper>
    )
  }

}

const tableStyles = theme => ({
  tr: {
    '&:hover': {
      backgroundColor: 'transparent !important'
    }
  }
});

export const ProjectReportTimelineCardStyled = withStyles(tableStyles)(ProjectReportTimelineCardNoStyled)

export const ProjectReportTimelineCard = connect(
  ProjectReportTimelineCardNoStyled.mapStateToProps,
  ProjectReportTimelineCardNoStyled.mapDispatchToProps,
)(ProjectReportTimelineCardStyled)
