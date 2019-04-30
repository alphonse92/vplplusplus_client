import React from 'react'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

export const DashboardNavbar = (props) => {
	return (
		<React.Fragment>
			<SideNav

				className="fixed sidebar"
				onSelect={(selected) => {
					console.log('onSelect', { selected })
					// selection code
				}}
			>
				<Toggle className="toggle" />
				<Nav defaultSelected="home">

					<NavItem eventKey="home" className="">
						<NavIcon><i className="fa  fa-tachometer-alt" style={{ fontSize: '1.75em' }} /></NavIcon>
						<NavText> Home </NavText>
					</NavItem>

					<NavItem eventKey="laboratory" className="">
						<NavIcon><i className="fas fa-laptop-code" style={{ fontSize: '1.75em' }} /></NavIcon>
						<NavText> Laboratory </NavText>
					</NavItem>


					<NavItem eventKey="students" className="">
						<NavIcon><i className="fas fa-user-graduate" style={{ fontSize: '1.75em' }} /></NavIcon>
						<NavText> Students </NavText>
					</NavItem>

					<NavItem eventKey="configuration" className="">
						<NavIcon><i className="fas fa-cog" style={{ fontSize: '1.75em' }} /></NavIcon>
						<NavText> Configuration </NavText>
					</NavItem>

					<NavItem eventKey="help" className="">
						<NavIcon><i className="fas fa-question" style={{ fontSize: '1.75em' }} /></NavIcon>
						<NavText> Help </NavText>
					</NavItem>



					<NavItem eventKey="logout" className="">
						<NavIcon><i className="fas fa-power-off" style={{ fontSize: '1.75em' }} /></NavIcon>
						<NavText> Logout </NavText>
					</NavItem>

				</Nav>

			</SideNav>

		</React.Fragment>

	)
}