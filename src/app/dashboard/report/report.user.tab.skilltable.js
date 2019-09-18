import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { SkillMapColors } from '../../../constants';

export const SkillLevelTag = props => {
  const { skill = 0 } = props
  const integer = +skill.toFixed(0)
  const fixed = +skill.toFixed(2)
  const color = SkillMapColors[integer - 1]
  console.log(integer + 0)
  console.log({ integer, fixed, skill, color, SkillMapColors })
  return <span style={{ padding: '7px 13px', backgroundColor: color.color, color: color.text }}>{fixed}</span>
}

export const SkillsTable = (props) => {
  const { skills } = props;
  return (
    <Table >
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Level</TableCell>
          <TableCell>Effort</TableCell>
          <TableCell>Cases</TableCell>
          <TableCell>Cases Approved</TableCell>
          <TableCell>Cases Not Approved</TableCell>
          <TableCell>Penalization</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {skills.map(({ description, name, info: { approved, effort, level, negative_coefficent, not_approved, total } }, index) => (
          <TableRow key={index}>
            <TableCell >{name}</TableCell>
            <TableCell >{description}</TableCell>
            <TableCell ><SkillLevelTag skill={level} /></TableCell>
            <TableCell >{effort}</TableCell>
            <TableCell >{total}</TableCell>
            <TableCell >{approved}</TableCell>
            <TableCell >{not_approved}</TableCell>
            <TableCell >{negative_coefficent.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
