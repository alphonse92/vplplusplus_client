import React from 'react';
import {
  Paper,
  Button
} from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import { SkillsTable } from './report.user.tab.skilltable';
import { Flex } from '../../../lib/components/flex';
import ReportIcon from '@material-ui/icons/AssignmentOutlined';
export const UserReportTabContent = (props) => {
  const { report } = props
  const { skills } = report
  return (
    <Paper elevation={0}>
      <Flex horizontal>
        <Button onClick={console.log}><ReportIcon />Open User Report </Button>
      </Flex>
      <SkillsTable skills={skills} />
      <p style={{ textAlign: 'center' }}><small>* Means there a usefull tooltip in table header</small></p>
    </Paper >
  )
} 