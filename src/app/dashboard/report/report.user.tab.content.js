import React from 'react';
import { startCase } from 'lodash'
import {
  Paper
  , ListItem
  , ListItemIcon
  , ListItemText
  , Collapse,
  Card,
  CardContent,
  Typography
} from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon
  , ExpandMore as ExpandMoreIcon
  , Code as CodeIcon
} from '@material-ui/icons';
import { Flex } from '../../../lib/components/flex';

export class UserReportTabContent extends React.Component {

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
    const { firstname, lastname, email, id, skill, projects, skills } = report
    const fullname = startCase(`${firstname} ${lastname}`)
    return (
      <Card elevation={0}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom> Report of </Typography>
          <Typography variant="h5" component="h2">{fullname}</Typography>

        </CardContent>
      </Card >
    )
  }
}