import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import { Root } from './components/app/root.container'
import { store, history } from './redux/configureStore'

const RootComponent = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Root />
    </ConnectedRouter>
  </Provider>
)
ReactDOM.render(RootComponent, document.getElementById('root')
)
