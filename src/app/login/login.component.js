import React from 'react'
import { MvAuthLogin } from "../../lib/components/auth";

export const LoginComponent = (props) => {
	const singleProps = { url: '' }
	const gcloudProps = true
	const signup = {
		label: 'Do you haven\'t an account?',
		onClick: () => console.log("signup")
	}
	const help = {
		label: 'Need help?',
		onClick: () => console.log("help")
	}
	
	return (
		<MvAuthLogin
			signup={signup}
			help={help}
			onLogin={props.onLogin}
			gcloud={gcloudProps}
			single={singleProps} />)
}