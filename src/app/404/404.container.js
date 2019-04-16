import React from 'react'
import { Flex } from "../../lib/components/flex";

export const PageNotFound = (props) => {
	return (
		<Flex horizontal width='100%' height='100%' alignItems='center'>
			<Flex vertical width='100%' alignItems='center'>
			<p className='center'>Ooooops! This page not exists</p>
			</Flex>
		</Flex >
	)
}