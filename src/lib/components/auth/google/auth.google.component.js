import React, { Component } from 'react'


export class MvGoogleAuth extends Component {

	constructor(props) {
		super(props)
		window.addEventListener('google-loaded', this.renderGoogleButton);
	}

	componentDidMount() {
		if (window.gapi) this.renderGoogleButton()
	}

	renderGoogleButton = () => {
		const { onLogin, ...gapiProps } = this.props
		const onSuccessWrapper = (googleUser) => {
			const profile = googleUser.getBasicProfile();
			this.props.onLogin({
				token: googleUser.getAuthResponse().id_token,
				id: profile.getId(),
				fullName: profile.getName(),
				givenName: profile.getGivenName(),
				familyName: profile.getFamilyName(),
				imageURL: + profile.getImageUrl(),
				email: profile.getEmail(),
			})
		}

		window.gapi.signin2.render('mvauth', { ...gapiProps, onsuccess: onSuccessWrapper })
	}


	render() {
		return <div id="mvauth" className="mv-auth-google" />
	}

}