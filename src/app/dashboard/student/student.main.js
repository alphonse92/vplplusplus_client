import React from 'react'
import { StudentTable } from './student.table';

export const Main = (props) => {
	const pathname = '/dashboard/report/student/'
	const showUserReport = (data) => {
		const { id = '' } = data
		props.history.push(`${pathname}${id}`)
	}
	return <StudentTable showUserReport={showUserReport}/>
}