import React from 'react'
import { MvGoogleAuth } from './google/auth.google.component'
import { MvSingleAuth } from './single/auth.single.component'
import './styles.sass'
import { MvSignUp } from './signup';

const MvAuthFrame = (props) => {
	return (
		<div className="mv-login-frame">
			{props.children}
		</div>
	)
}
const MvAuthItem = (props) => {
	return (
		<div className="mv-login-method">
			{props.children}
		</div>
	)
}
const MvAuth = (props) => {
	return (
		<MvAuthFrame>
			{props.children}
		</MvAuthFrame>
	)
}

const MvAuthLogin = (props) => {
	const { gcloud, single, onLogin, signup } = props
	return (
		<MvAuth>
			{single && <MvAuthItem><MvSingleAuth onLogin={onLogin} {...single} /> </MvAuthItem>}
			{gcloud && <MvAuthItem> <MvGoogleAuth onLogin={onLogin} /> </MvAuthItem>}
			{(signup && signup.url )&& <MvAuthItem><MvSignUp {...signup} /></MvAuthItem>}
		</MvAuth>
	)
}
MvAuthLogin.logout = () => Promise.all([MvGoogleAuth.logout(), MvSingleAuth.logout()])
export { MvAuthLogin }



