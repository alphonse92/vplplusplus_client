import React from 'react';
import {
  Paper
  , ListItem
  , ListItemIcon
  , ListItemText
  , Collapse
} from '@material-ui/core';

import {
  ExpandLess as ExpandLessIcon
  , ExpandMore as ExpandMoreIcon,
  TimelapseOutlined
} from '@material-ui/icons';

import { withStyles } from '@material-ui/core/styles';
import { ProjectReportTimelineChart } from './report.timeline.chart';
import { VplLang } from '../../../redux/lang'

class ProjectReportTimelineCardNoStyled extends React.Component {

  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {

    const { isOpen } = this.state
    const {
      title = <VplLang string="PROJECT_TIMELINE" />,
      subtitle = <VplLang string="PROJECT_TIMELINE_DESCRIPTION" />
    } = this.props
    return (
      <Paper style={{ marginBottom: '13px', borderTop: '7px solid', width: '100%' }} >
        <ListItem button onClick={this.toggle}>
          <ListItemIcon>
            <TimelapseOutlined />
          </ListItemIcon>
          <ListItemText
            inset
            primary={title}
            secondary={subtitle} />
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>

        <Collapse style={{ root: { padding: '0px' } }} in={isOpen} timeout="auto" unmountOnExit>
          <ProjectReportTimelineChart />
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

export const ProjectReportTimelineCard = withStyles(tableStyles)(ProjectReportTimelineCardNoStyled)