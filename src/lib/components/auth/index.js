import React, { Component } from 'react'
import { MvGoogleAuth } from './google/auth.google.component'
import { MvSingleAuth } from './single/auth.single.component'

const MvAuthFrame = (props) => {
	return (
		<div className="mv-login-frame">
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

export const MvAuthLogin = (props) => {
	const { gcloud, single, onLogin } = props
	return (
		<MvAuth>
			{single && <MvSingleAuth onLogin={onLogin} {...single} />}
			{gcloud && <MvGoogleAuth onLogin={onLogin} {...gcloud} />}
		</MvAuth>
	)
}



