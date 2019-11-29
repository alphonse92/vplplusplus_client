import React from 'react'
import { Link } from 'react-router-dom'

import { Flex } from '../../lib/components/flex';
import { BusinessNameFooter } from '../common/business-name.footer';
import './styles.sass'
import { VplLang } from '../../redux/lang';

export const MainPage = (props) => {
	return (
		<Flex horizontal width='100%' height='100%' alignItems='center'>
			<Flex vertical width='100%' alignItems='center' overflowY={'scroll'}>
				<div className="w100">
					<h1 className="center">Virtual Programming Lab ++</h1>
					<p className='center'><VplLang string="VPLPP_INTRO_1" /> <a href="https://github.com/jcrodriguez-dis/moodle-mod_vpl" target='_blank' rel="noopener noreferrer">VPL</a> <VplLang string="VPLPP_INTRO_2" />
					</p>
					<h2 className='center'><VplLang string="VPLPP_INTRO_QUESTION_2" /></h2>
					<p className='center'><VplLang string="VPLPP_INTRO__ANSWER_2" /></p>
					<h2 className='center'><VplLang string="VPLPP_INTRO_QUESTION_3" /></h2>
					<p className='center'><VplLang string="VPLPP_INTRO__ANSWER_3" /></p>
					<p className='center'><Link className="ui button" to="/login"><VplLang string="VPLPP_INTRO_BUTTON_LABEL" /></Link></p>
					<BusinessNameFooter />
				</div>
			</Flex>
		</Flex >
	)

}