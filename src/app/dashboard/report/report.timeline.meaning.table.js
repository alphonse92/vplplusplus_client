import React from 'react';
import { Flex } from '../../../lib/components/flex';
import { Table, TableHead, TableRow, TableBody, TableCell, Typography, } from '@material-ui/core';
export const ReportTimelineMeaningTable = (props) => {
  const { data = [] } = props
  if (!data.length) return <React.Fragment></React.Fragment>
  return (
    <Flex vertical>
      <Typography variant="h6" gutterBottom>Timeline meanings</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Topic</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((def, idx) => {
            const { label, topic, project, color } = def
            let TopicText = topic && topic.length ? topic.map(({ description }) => description).join(',') : "All"
            return (
              <TableRow key={idx}>
                <TableCell><span style={{ padding: '7px', backgroundColor: color }}>{label}</span></TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{TopicText}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Flex>

  )
}