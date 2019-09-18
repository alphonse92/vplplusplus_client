import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export const SkillsTable = (props) => {
  const { skills } = props;
  return (
    <Table >
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Level</TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {skills.map(({ description, name, info: { level } }, index) => (
          <TableRow key={index}>
            <TableCell >{name}</TableCell>
            <TableCell >{description}</TableCell>
            <TableCell >{level.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
