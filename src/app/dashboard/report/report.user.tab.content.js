import React from 'react';
import {
  Paper
} from '@material-ui/core';
import { SkillsTable } from './report.user.tab.skilltable';

export const UserReportTabContent = (props) => {
  const { report } = props
  const { skills } = report
  return (
    <Paper elevation={0}>
      <SkillsTable skills={skills} />
      <p style={{ textAlign: 'center' }}><small>* Means there a usefull tooltip in table header</small></p>
    </Paper >
  )
} 