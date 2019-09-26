import React from 'react'
import { ReportProject } from './report.project'

export const Main = (props) => {
	const pathname = '/dashboard/report/student/'
	const showUserReport = ({ id }) => props.history.push(`${pathname}${id ? id : ''}`)
	return <ReportProject project_id={props.match.params.id} showUserReport={showUserReport} />
}