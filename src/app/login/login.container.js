import React from 'react'
import { Card } from 'semantic-ui-react'

import { BusinessNameFooter } from '../common/business-name.footer';
import { LoginComponent } from "./login.component";
import { Flex } from "../../lib/components/flex";
import logo from './../images/logo_ufps.png'
import './styles.sass'
export const LoginContainer = (props) => {
	const { DISPATCHERS } = props
	const onLogin = console.log || DISPATCHERS.LOGIN

	return (
		<Flex className="bg" horizontal width='100%' height='100%' alignItems='center'>
			<Flex vertical width='100%' alignItems='center'>
				<Card>
					<Card.Content>
						<p className='center'><img className="w100" src={logo} alt="Ufps Logo" /></p>
						<LoginComponent onLogin={onLogin} />
						<BusinessNameFooter />
					</Card.Content>
				</Card>
			</Flex>
		</Flex >
	)
}