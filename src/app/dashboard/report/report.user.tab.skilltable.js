import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { SkillMapColors } from '../../../constants';
import { Tooltip, Collapse } from '@material-ui/core';

export const SkillLevelTag = props => {
  const { skill = 0 } = props
  const integer = +skill.toFixed(0)
  const fixed = +skill.toFixed(2)
  const color = SkillMapColors[integer - 1]
  return <span style={{ padding: '3px', backgroundColor: color.color, color: color.text }}>{fixed}</span>
}

export class SkillsTable extends React.Component {
  
  state = {
    showMoreInfoMap: {

    }
  }

  showMoreInfo = name => () => {
    const map = this.state.showMoreInfoMap
    this.setState({ showMoreInfo: { ...map, [name]: !!map[name] } })
  }

  render() {
    const { skills } = this.props;
    return (
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Topic</TableCell>
            <TableCell>The student know</TableCell>
            <TableCell>
              <Tooltip title=" (%) The level shows the student hability of a topic." placement='bottom'>
                <div>Level*</div>
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Shows the number of attempts to resolve a test case (unit test)" placement='bottom'>
                <div>Effort*</div>
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Test cases approved" placement='bottom'>
                <div>Approved*</div>
              </Tooltip>

            </TableCell>
            <TableCell>
              <Tooltip title="Test cases not approved" placement='bottom'>
                <div>Not Approved*</div>
              </Tooltip>
            </TableCell>
            <TableCell><div>Cases</div></TableCell>
            <TableCell>
              <Tooltip title="This coefficient has been multiplied to the level to punish a student that never resolved a test case" placement='bottom'>
                <div>Penalization*</div>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {skills.map((skill, index) => {
            const { description, name, info: { approved, effort, level, negative_coefficent, not_approved, total } } = skill
            return (
              <React.Fragment>
                <TableRow key={index} onClick={this.showMoreInfo(name)}>
                  <TableCell >{name}</TableCell>
                  <TableCell >{description}</TableCell>
                  <TableCell ><SkillLevelTag skill={level} /></TableCell>
                  <TableCell >{effort}</TableCell>
                  <TableCell >{approved}</TableCell>
                  <TableCell >{not_approved}</TableCell>
                  <TableCell >{total}</TableCell>
                  <TableCell >{negative_coefficent.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow colSpan="8">
                  <Collapse style={{ root: { padding: '0px' } }} in={this.state.showMoreInfoMap[name]} timeout="auto" unmountOnExit>
                    <TableCell colSpan="8">More info</TableCell>
                  </Collapse>
                </TableRow>
              </React.Fragment>

            )
          })}
        </TableBody>
      </Table>
    );
  }
}
