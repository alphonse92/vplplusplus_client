import React from 'react'
import { App } from './app.container'

export class Root extends React.Component {
  render() {
    console.log('rendering root')
    return <App></App>
  }
}


