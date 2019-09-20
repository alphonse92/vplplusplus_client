import React from 'react'
import { ReportBroker } from './report.broker'

export const Main = (props) => {
	console.log(props)
	const pathname = 'laboratory/project/create/'
	const showUserReport = (id) => props.history.push(`${pathname}${id ? id : ''}`)
	return <ReportBroker showUserReport={showUserReport}  {...props} />
}