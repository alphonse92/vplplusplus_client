import React from 'react';
import {
  Paper
  , ListItem
  , ListItemIcon
  , ListItemText
  , Collapse
  , Table
  , TableBody
  , TableHead
  , TableRow
  , TableCell
} from '@material-ui/core';

import {
  ExpandLess as ExpandLessIcon
  , ExpandMore as ExpandMoreIcon,
  TrendingUp
} from '@material-ui/icons';

import { withStyles } from '@material-ui/core/styles';
import { VplLang } from '../../../redux/lang'
class MostSkilledStudentsByTopicCardNoStyled extends React.Component {

  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  shouldComponentUpdate(prevprops, prevstate) {
    return this.state.isOpen !== prevstate.isOpen
      || this.props.project_id !== prevprops.project_id
  }

  render() {

    const { classes, data } = this.props
    const { isOpen } = this.state
    if (!data.lengtyh)
      return (
        <Paper style={{ marginBottom: '13px', borderTop: '7px solid', width: '100%' }} >
          <ListItem button onClick={this.toggle}>
            <ListItemIcon>
              <TrendingUp />
            </ListItemIcon>
            <ListItemText
              inset
              primary={<VplLang string="REPORT_MOST_SKILLED_STUDENTS_TITLE" />}
              secondary={<VplLang string="REPORT_MOST_SKILLED_STUDENTS_DESCRIPTION" />} />
            {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse style={{ root: { padding: '0px' } }} in={isOpen} timeout="auto" unmountOnExit>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><VplLang string="REPORT_MOST_SKILLED_STUDENTS_TABLE_TOPIC" /></TableCell>
                  <TableCell ><VplLang string="REPORT_MOST_SKILLED_STUDENTS_TABLE_STUDENT" /></TableCell>
                  <TableCell ><VplLang string="REPORT_MOST_SKILLED_STUDENTS_TABLE_SKILL" /></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((topic) => {
                  const { name, description, level, students = [] } = topic
                  const [firstStudent, ...restOfStudents] = students
                  const rowSpan = students.length
                  return (
                    <React.Fragment key={name} >
                      <TableRow className={classes.tr}>
                        <TableCell rowSpan={rowSpan}>{description}</TableCell>
                        <TableCell>{firstStudent.fullname}</TableCell>
                        <TableCell rowSpan={rowSpan}>{level.toFixed(2)}</TableCell>
                      </TableRow>
                      {
                        rowSpan > 1 && restOfStudents.map(student => <TableRow key={student.id} className={classes.tr}><TableCell >{student.fullname}</TableCell></TableRow>)
                      }
                    </React.Fragment>
                  )
                })}
              </TableBody>
            </Table>
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

export const MostSkilledStudentsByTopicCard = withStyles(tableStyles)(MostSkilledStudentsByTopicCardNoStyled)