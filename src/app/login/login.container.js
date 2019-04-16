import React from 'react'
import { LoginComponent } from "./login.component";
import { Flex } from "../../lib/components/flex";
import { Card } from 'semantic-ui-react'
import './styles.sass'
export const LoginContainer = (props) => {
	return (
		<Flex horizontal width='100%' height='100%' alignItems='center'>
			<Flex vertical width='100%' alignItems='center'>
				<Card>
					<Card.Content>
						<LoginComponent />
						<p className='center'>Universidad Francisco de Paula Santander</p>
					</Card.Content>
				</Card>
			</Flex>
		</Flex >
	)
}