import React, { Component } from 'react'


export class MvGoogleAuth extends Component {
	static logout = async () => new Promise(async (resolve, reject) => {
		const GoogleAuth = await MvGoogleAuth.getGoogleAuth()
		await GoogleAuth.signOut()
		resolve()
	})
	static getGoogleAuth = async () => new Promise((resolve, reject) => {
		window.gapi.load('auth2', async () => {
			const GoogleAuth = await window.gapi.auth2.init()
			resolve(GoogleAuth)
		})
	})
	static isSignedIn = async () => {
		const GoogleAuth = await MvGoogleAuth.getGoogleAuth()
		const isSignedIn = GoogleAuth.isSignedIn.get()
		return isSignedIn
	}

	constructor(props) {
		super(props)
		window.addEventListener('google-loaded', this.renderGoogleButton);
	}

	async componentDidMount() {
		if (window.gapi) {
			const isSignedIn = await MvGoogleAuth.isSignedIn()
			const { forceSignOut = true } = this.props
			if (forceSignOut && isSignedIn) {
				await MvGoogleAuth.logout()
				console.warn("Signed out from google auth2. It happened because you dont have a session on the application.")
			}
			this.renderGoogleButton()
		}
	}

	renderGoogleButton = () => {
		const { onLogin, ...gapiProps } = this.props
		const onSuccessWrapper = (googleUser) => {
			const profile = googleUser.getBasicProfile();
			this.props.onLogin({
				google: {
					token: googleUser.getAuthResponse().id_token,
					id: profile.getId(),
					fullName: profile.getName(),
					givenName: profile.getGivenName(),
					familyName: profile.getFamilyName(),
					imageURL: + profile.getImageUrl(),
					email: profile.getEmail(),
				}
			})
		}

		window.gapi.signin2.render('mvauth', { ...gapiProps, onsuccess: onSuccessWrapper })
	}


	render() {
		return <div id="mvauth" className="mv-auth-google" />
	}

}