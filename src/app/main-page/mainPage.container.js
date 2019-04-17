import React from 'react'
import { Link } from 'react-router-dom'

import { Flex } from '../../lib/components/flex';
import { BusinessNameFooter } from '../common/business-name.footer';
import './styles.sass'

export const MainPage = (props) => {
	return (
		<Flex horizontal width='100%' height='100%' alignItems='center'>
			<Flex vertical width='100%' alignItems='center' overflowY={'scroll'}>
				<div className="w100">
					<h1 className="center">Virtual Programming Lab ++</h1>
					<p className='center'>
						Vpl++ is an extension of VPL moodle plugin created by Juan Carlos Rodríguez-del-Pino. This software does not modify the code of <a href="https://github.com/jcrodriguez-dis/moodle-mod_vpl" target='_blank' rel="noopener noreferrer">VPL</a> just 	extend it functionality.
							</p>
					<h2 className='center'>¿How it Works?</h2>
					<p className='center'>
						It works because VPL++ provides a Java JUnit Runner on the VPL execution jail. This runner build and test the student activities. After it, sends the activity result to the VPL++ API.
							</p>
					<h2 className='center'>¿What can i do with this?</h2>
					<p className='center'>
						This client provides a set the features to visualize students ant teachers activities. Ie. the teacher can create the VPL activities on the fly and import it from VPL Moodle plugin
							</p>
					<p className='center'><Link className="ui button" to="/login">¡ Go to the App !</Link></p>
					<BusinessNameFooter />
				</div>
			</Flex>
		</Flex >
	)

}