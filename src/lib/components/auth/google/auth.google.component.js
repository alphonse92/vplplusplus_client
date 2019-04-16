import React, { Component } from 'react'


export class MvGoogleAuth extends Component {

  constructor(props) {
    super(props)
    window.addEventListener('google-loaded', this.renderGoogleButton);
  }

  renderGoogleButton = () => {
    /* global gapi */
    gapi.signin2.render('mvauth', { ...this.props })
  }


  render() {
    return <div id="mvauth" />
  }

}