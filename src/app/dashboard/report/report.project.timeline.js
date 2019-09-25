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

class ProjectReportTimelineCardNoStyled extends React.Component {

  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {

    const { isOpen } = this.state
    const { data } = this.props

    return (
      <Paper style={{ marginBottom: '13px', borderTop: '7px solid', width: '100%' }} >
        <ListItem button onClick={this.toggle}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText
            inset
            primary="Most Skilled Students"
            secondary="By topic" />
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse style={{ root: { padding: '0px' } }} in={isOpen} timeout="auto" unmountOnExit>
          <p>Timeline</p>
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