import React from 'react';
import { startCase } from 'lodash'
import {
  Paper
  , ListItem
  , ListItemIcon
  , ListItemText
  , Collapse
  , Icon
  , Tooltip
} from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon
  , ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';
import { UserReportTableCard } from './report.user.table.card';
import { SkillMapColors } from '../../../constants';

export class UserReportTab extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  openUserReport = report =>
    this.props.showUserReport
      ? () => this.props.showUserReport(report)
      : undefined

  render() {

    const { report } = this.props
    const { isOpen } = this.state
    const { firstname, lastname, email, id, skill = 0 } = report
    const fullname = startCase(`${firstname} ${lastname}`)
    const fixed = +skill.toFixed(0)
    const color = SkillMapColors[fixed - 1]
    const iconStyle = {
      width: '100%',
      height: '100%',
      fontSize: '13px',
    }
    return (
      <Paper style={{ marginBottom: '13px', borderTop: '7px solid', borderTopColor: color.color, color: color.text }} >
        <ListItem button onClick={this.toggle}>
          <ListItemIcon>
            <Tooltip title='Student Skill' placement='bottom' enterDelay={100}>
              <Icon style={iconStyle}>{skill.toFixed(2)}</Icon>
            </Tooltip>

          </ListItemIcon>
          <ListItemText
            inset
            primary={fullname}
            secondary={<small>{`moodle id: ${id} - ${email}  `}</small>} />
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse style={{ root: { padding: '0px' } }} in={isOpen} timeout="auto" unmountOnExit>
          <UserReportTableCard  onOpenUserReport={this.openUserReport(report)} report={report} />
        </Collapse>
      </ Paper>
    )
  }

}