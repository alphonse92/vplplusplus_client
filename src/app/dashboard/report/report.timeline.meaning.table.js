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
            const { label, topic = [], project = { name: 'All projects' }, color } = def
            const topicArray = Array.isArray(topic) ? topic : [topic]
            let TopicText = topicArray.length && topicArray.length > 1
              ? topic.map(({ description }) => description).join(',')
              : topicArray.length === 1
                ? topicArray[0].description
                : "All"
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