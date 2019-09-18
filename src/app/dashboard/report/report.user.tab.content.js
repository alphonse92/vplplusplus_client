import React from 'react';
import {
  Paper
} from '@material-ui/core';
import { SkillsTable } from './report.user.tab.skilltable';

export const UserReportTabContent = ()=>{
  const { report } = this.props
  const { skills } = report
  return (
    <Paper>
      <SkillsTable skills={skills} />
    </Paper >
  )
} 