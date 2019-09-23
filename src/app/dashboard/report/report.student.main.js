import React from 'react'
import { ReportBroker } from './report.broker'

export const Main = (props) => {
	const pathname_project_report = '/dashboard/report/project/'
	const pathname_project_create = '/dashboard/laboratory/project/create/'
	const showProjectReport = ({ _id }) => props.history.push(`${pathname_project_report}${_id ? _id : ''}`)
	const openProject = ({ _id }) => props.history.push(`${pathname_project_create}${_id ? _id : ''}`)
	const callbacks = { showProjectReport, openProject }
	const propsToBePassed = { ...props, ...callbacks }
	return <ReportBroker  {...propsToBePassed} />
}