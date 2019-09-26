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
  StarBorder
} from '@material-ui/icons';

import { withStyles } from '@material-ui/core/styles';
import { ProjectReportTimelineChart } from './report.project.timeline.chart';

class ProjectReportTimelineCardNoStyled extends React.Component {

  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {

    const { isOpen } = this.state

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
          <ProjectReportTimelineChart project_id={this.props.project_id} />
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