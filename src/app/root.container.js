import "@babel/polyfill"
import React from 'react'
import { App } from './app.container'
import './styles.sass'

export class Root extends React.Component {
  render() {
    return <App></App>
  }
}


