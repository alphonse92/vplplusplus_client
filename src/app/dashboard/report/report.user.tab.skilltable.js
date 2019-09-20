import React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Tooltip,
  Collapse,
  TableCell,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  Typography,
  Button
  // ListItemSecondaryAction,
  // IconButton
} from '@material-ui/core'
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  ErrorOutline as SubmissionFailedIcon,
  DoneAll as SubmisionSuccessfullIcon,
  // AssignmentOutlined as ReportIcon,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { orderBy } from 'lodash'
import { SkillMapColors } from '../../../constants';
import { Flex } from '../../../lib/components/flex';


export const SkillLevelTag = props => {
  const { skill = 0 } = props
  const integer = +skill.toFixed(0)
  const fixed = +skill.toFixed(2)
  const color = SkillMapColors[integer - 1]
  return <span style={{ padding: '3px', backgroundColor: color.color, color: color.text }}>{fixed}%</span>
}

const SkillMoreInfoStyles = theme => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent !important',
      cursor: 'pointer'
    }
  }
});

class SkillMoreInfoNoStyled extends React.Component {

  state = {}

  toggle = id => () => {
    if (this.state.currentOpenTest !== id)
      return this.setState({ currentOpenTest: id })
    return this.setState({ currentOpenTest: undefined })
  }

  openProjectReport = project => () => {

  }
  openReportt = project => () => {

  }
  render() {
    const { currentOpenTest } = this.state
    const { skill, classes } = this.props
    const { tests = [] } = skill

    return (
      <List >
        <ListSubheader>{`Test Cases`}</ListSubheader>
        {
          tests.map((test) => {
            const { name, objective, _id, summaries = [], project } = test
            const isOpen = currentOpenTest === _id
            return (
              <React.Fragment key={_id}>
                <ListItem classes={classes} onClick={this.toggle(_id)}>
                  <ListItemIcon><i className="fas fa-flask"></i></ListItemIcon>
                  <ListItemText primary={name} secondary={
                    <React.Fragment>
                      <Typography component="span">{objective}</Typography>
                      {`Project: ${project.name}`}
                    </React.Fragment>
                  } />
                  {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse style={{ root: { padding: '0px' } }} in={isOpen} timeout="auto" unmountOnExit>
                  <Flex marginLeft="4em" vertical>
                    <Flex horizontal>
                      <Button variant="contained" style={{marginRight:'13px'}}color="secondary" onClick={this.openProjectReport(project)} >Open project report</Button>
                      <Button variant="contained" color="secondary" onClick={this.openReportt(project)} >Open project</Button>
                    </Flex>
                    <Flex vertical>
                      <List>
                        {
                          summaries.map(({ _id, approved, createdAt }) => {
                            const IconSummary = () => !approved
                              ? <SubmissionFailedIcon />
                              : <SubmisionSuccessfullIcon />
                            const label = approved
                              ? 'Submission passed'
                              : 'Submission not passed'
                            return (
                              <ListItem key={_id} >
                                <ListItemIcon><IconSummary /></ListItemIcon>
                                <ListItemText primary={label} secondary={createdAt} />
                              </ListItem>
                            )
                          })
                        }
                      </List>
                    </Flex>
                  </Flex>
                </Collapse>
              </React.Fragment>
            )
          })
        }
      </List>
    )
  }
}

export const SkillMoreInfo = withStyles(SkillMoreInfoStyles)(SkillMoreInfoNoStyled)

class SkillsTableNoStyled extends React.Component {

  state = {
    showMoreInfoMap: {

    }
  }

  showMoreInfo = name => () => {
    const map = this.state.showMoreInfoMap
    this.setState({ showMoreInfoMap: { ...map, [name]: !map[name] } })
  }

  render() {
    const { skills: noOrderedSkills, classes } = this.props;
    const skills = orderBy(noOrderedSkills, ['info.level'], ['desc'])
    return (
      <React.Fragment>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Topic</TableCell>
              <TableCell >The student knows</TableCell>
              <TableCell>
                <Tooltip title=" (%) The level shows the student hability of a topic." placement='bottom'>
                  <div>Level*</div>
                </Tooltip>
              </TableCell>
              <TableCell >
                <Tooltip title="Shows the number of attempts to resolve a test case (unit test)" placement='bottom'>
                  <div>Effort*</div>
                </Tooltip>
              </TableCell>
              <TableCell >
                <Tooltip title="Test cases approved" placement='bottom'>
                  <div>Approved*</div>
                </Tooltip>
              </TableCell>
              <TableCell >
                <Tooltip title="Test cases not approved" placement='bottom'>
                  <div>Not Approved*</div>
                </Tooltip>
              </TableCell>
              <TableCell ><div>Cases</div></TableCell>
              <TableCell >
                <Tooltip title="This coefficient has been multiplied to the level to punish a student that never resolved a test case" placement='bottom'>
                  <div>Penalization*</div>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((skill, index) => {
              const { description, name, info: { approved, effort, level, negative_coefficent, not_approved, total } } = skill
              const showMoreInfo = !!this.state.showMoreInfoMap[name]
              return (
                <React.Fragment key={name} >
                  <TableRow onClick={this.showMoreInfo(name)} style={{ cursor: 'pointer' }}>
                    <TableCell >{name}</TableCell>
                    <TableCell >{description}</TableCell>
                    <TableCell ><SkillLevelTag skill={level} /></TableCell>
                    <TableCell >{effort}</TableCell>
                    <TableCell >{approved}</TableCell>
                    <TableCell >{not_approved}</TableCell>
                    <TableCell >{total}</TableCell>
                    <TableCell >{negative_coefficent.toFixed(2)}</TableCell>
                  </TableRow>
                  {
                    showMoreInfo &&
                    <TableRow classes={classes}>
                      <TableCell colSpan="8">
                        <Collapse style={{ root: { padding: '0px' } }} in={showMoreInfo} timeout="auto" unmountOnExit>
                          <SkillMoreInfo skill={skill} />
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  }
                </React.Fragment>
              )
            })}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

const SkillsTableStyles = theme => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent !important'
    }
  }
});
export const SkillsTable = withStyles(SkillsTableStyles)(SkillsTableNoStyled)