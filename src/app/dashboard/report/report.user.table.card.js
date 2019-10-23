import React from 'react';
import {
  Paper,
  Button
} from '@material-ui/core';
import { SkillsTable } from './report.user.tab.skilltable';
import ReportIcon from '@material-ui/icons/AssignmentOutlined';
export const UserReportTableCard = (props) => {
  const { report, showUserReport, openProject } = props
  const { skills, projects } = report
  const projectsMap = projects.reduce((acc, project) => ({ [project._id]: project }), {})
  const skillsWithProject = skills.map(skill => {
    const { tests } = skill
    const newTests = tests.map(t => ({ ...t, project: projectsMap[t.project] }))
    return { ...skill, tests: newTests }
  })
  return (
    <Paper elevation={0}>
      {props.showUserReport && <Button onClick={() => showUserReport(report)}><ReportIcon />Open User Report </Button>}
      <SkillsTable skills={skillsWithProject} onOpenProject={openProject} />
      <p style={{ textAlign: 'center' }}><small>* Means there a usefull tooltip in table header</small></p>
    </Paper >
  )
} 