import React from 'react'
import { DashboardNavbar } from './dashboard.navbar';
import { Project } from './laboratory/project';
import './styles.sass'

const DashboardContainer = props => (
	<div className="dashboard">
		{props.children}
	</div>
)

const DashboardContent = props => (
	<div className="content">
		{props.children}
	</div>
)

export const Dashboard = (props) => {
	return (
		<React.Fragment>
			<DashboardNavbar />
			<DashboardContainer>
				<DashboardContent>
					<Project />
				</DashboardContent>
			</DashboardContainer>
		</React.Fragment>
	)
}