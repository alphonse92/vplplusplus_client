import React from 'react';
import {
  Paper,
  Button
} from '@material-ui/core';
import { SkillsTable } from './report.user.tab.skilltable';
import ReportIcon from '@material-ui/icons/AssignmentOutlined';
import { VplLang } from '../../../redux/lang';
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
      {props.showUserReport && <Button onClick={() => showUserReport(report)}><ReportIcon /><VplLang string="REPORT_OPEN_STUDENT_REPORT_BTN_LABEL" /> </Button>}
      <SkillsTable skills={skillsWithProject} onOpenProject={openProject} />
      <p style={{ textAlign: 'center' }}><small><VplLang string="REPORT_STUDENT_TABLE_HELP_INFO" /></small></p>
    </Paper >
  )
} 