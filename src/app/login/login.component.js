import React from 'react'
import { MvAuthLogin } from "../../lib/components/auth";

export const LoginComponent = (props) => {
	const singleProps = { url: '' }
	const gcloudProps = true

	const signup = {
		label: 'Do you haven\'t an account?',
		url: process.env.URL_REGISTRY
	}

	return (
		<MvAuthLogin
			onLogin={props.onLogin}
			signup={signup}
			gcloud={gcloudProps}
			single={singleProps} />)
}