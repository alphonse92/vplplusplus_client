import React from 'react';
import { startCase } from 'lodash'
import {
  Paper
  , ListItem
  , ListItemIcon
  , ListItemText
  , Collapse,
  Icon
} from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon
  , ExpandMore as ExpandMoreIcon
  , Code as CodeIcon
} from '@material-ui/icons';
import { UserReportTabContent } from './report.user.tab.content';
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

  render() {

    const { report } = this.props
    const { isOpen } = this.state
    const { firstname, lastname, email, id, skill = 0, projects, skills } = report
    const fullname = startCase(`${firstname} ${lastname}`)
    const color = SkillMapColors[skill.toFixed(0)]

    return (
      <Paper style={{ marginBottom: '13px', backgroundColor: color.color, color: color.text }} >
        <ListItem button onClick={this.toggle}>
          <ListItemIcon>
            <Icon style={{ color: color.text }}>{skill.toFixed(2)}</Icon>
          </ListItemIcon>
          <ListItemText
            inset
            primary={<p style={{ color: skill.text }}>{fullname}</p>}
            secondary={<p tyle={{ color: color.text }} >{`moodle id: ${id} - ${email}  `}</p>} />
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse style={{ root: { padding: '0px' } }} in={isOpen} timeout="auto" unmountOnExit>
          <UserReportTabContent report={report} />
        </Collapse>
      </ Paper>
    )
  }

}