import React from 'react';
import {
  Paper,
  Button
} from '@material-ui/core';
import { SkillsTable } from './report.user.tab.skilltable';
import ReportIcon from '@material-ui/icons/AssignmentOutlined';
export const UserReportTabContent = (props) => {
  const { report } = props
  const { skills } = report
  return (
    <Paper elevation={0}>
      <Button onClick={console.log}><ReportIcon />Open User Report </Button>
      <SkillsTable skills={skills} />
      <p style={{ textAlign: 'center' }}><small>* Means there a usefull tooltip in table header</small></p>
    </Paper >
  )
} 