import React from 'react';
import {
  Paper,
  Button
} from '@material-ui/core';
import { SkillsTable } from './report.user.tab.skilltable';
import ReportIcon from '@material-ui/icons/AssignmentOutlined';
export const UserReportTableCard = (props) => {
  const { report } = props
  const { skills, projects } = report
  const projectsMap = projects.reduce((acc, project) => ({ [project._id]: project }), {})
  const skillsWithProject = skills.map(skill => {
    const { tests } = skill
    const newTests = tests.map(t => ({ ...t, project: projectsMap[t.project] }))
    return { ...skill, tests: newTests }
  })
  console.log(skillsWithProject)
  return (
    <Paper elevation={0}>
      {props.onOpenUserReport && <Button onClick={props.onOpenUserReport}><ReportIcon />Open User Report </Button>}
      <SkillsTable skills={skillsWithProject} />
      <p style={{ textAlign: 'center' }}><small>* Means there a usefull tooltip in table header</small></p>
    </Paper >
  )
} 