import React, { Component } from 'react'
import { LoginComponent } from "./login.component";
import { Flex, Item } from "../../lib/components/flex";



export const LoginContainer = (props) => {
	return (
		<Flex horizontal width='100%'>
			<Flex vertical width='100%'>
				<div style={{ width: '200px' }}>
					<LoginComponent />
				</div>
			</Flex>
		</Flex>
	)
}