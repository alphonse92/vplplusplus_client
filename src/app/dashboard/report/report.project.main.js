import React from 'react'
import { ReportProject } from './report.project'

export const Main = (props) => {
	const pathname = '/dashboard/report/student/'
	const showUserReport = (data) => {
		const { id = '' } = data
		props.history.push(`${pathname}${id}`)
	}
	return <ReportProject id={props.match.params.id} showUserReport={showUserReport} />
}