import React, { Component } from 'react'
import { MvAuthLogin } from "../../lib/components/auth";

export const LoginComponent = (props) => {
	const gcloudProps = {
		onsuccess: function onSignIn(googleUser) {
			var profile = googleUser.getBasicProfile();
			// console.log("ID: " + profile.getId());
			// console.log('Full Name: ' + profile.getName());
			// console.log('Given Name: ' + profile.getGivenName());
			// console.log('Family Name: ' + profile.getFamilyName());
			// console.log("Image URL: " + profile.getImageUrl());
			// console.log("Email: " + profile.getEmail());
			var id_token = googleUser.getAuthResponse().id_token;
			// console.log("ID Token: " + id_token);

		}
	}

	const singleProps = {
		url: ''
	}


	return (
		<MvAuthLogin
			onLogin={props.onLogin}
			gcloud={gcloudProps}
			single={singleProps} />)
}