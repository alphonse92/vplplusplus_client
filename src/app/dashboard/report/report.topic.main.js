import React from 'react'
import { ReportStudent } from './report.student'

export const Main = (props) => {
	const pathname_project_report = '/dashboard/report/project/'
	const pathname_project_create = '/dashboard/laboratory/project/create/'
	const showProjectReport = ({ _id }) => props.history.push(`${pathname_project_report}${_id ? _id : ''}`)
	const openProject = ({ _id }) => props.history.push(`${pathname_project_create}${_id ? _id : ''}`)
	const callbacks = { showProjectReport, openProject }
	const propsToBePassed = { ...props, ...callbacks, }
	return <ReportStudent  {...propsToBePassed} id={props.match.params.id} />
}