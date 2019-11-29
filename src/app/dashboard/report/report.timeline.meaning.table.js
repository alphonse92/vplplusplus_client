import React from 'react';
import { Flex } from '../../../lib/components/flex';
import { Table, TableHead, TableRow, TableBody, TableCell, Typography, } from '@material-ui/core';
import { VplLang } from '../../../redux/lang';
export const ReportTimelineMeaningTable = (props) => {
  const { data = [] } = props
  if (!data.length) return <React.Fragment></React.Fragment>
  return (
    <Flex vertical>
      <Typography variant="h6" gutterBottom>
        <VplLang string="REPORT_TIMELINE_GENERATOR_TIMELINE_MEANINGS_TITLE" />
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><VplLang string="REPORT_TIMELINE_GENERATOR_TIMELINE_MEANINGS_NUMBER" /></TableCell>
            <TableCell><VplLang string="REPORT_TIMELINE_GENERATOR_TIMELINE_MEANINGS_PROJECT" /></TableCell>
            <TableCell><VplLang string="REPORT_TIMELINE_GENERATOR_TIMELINE_MEANINGS_TOPIC" /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((def, idx) => {
            const { label, topic = [], project = { name: <VplLang string="REPORT_TIMELINE_GENERATOR_TIMELINE_MEANINGS_PROJECT_ALL" /> }, color } = def
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