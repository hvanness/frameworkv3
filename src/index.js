import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './routes'

import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import thunkMiddleware from 'redux-thunk'

const devTools = window.devToolsExtension ? window.devToolsExtension() : a=>a
const store = createStore(
  reducer,
  compose(applyMiddleware(thunkMiddleware), devTools)
)

render(
  <Provider store={store}>
    <Router
      routes={routes(store)}
      history={browserHistory}
    />
  </Provider>,
  document.getElementById('app')
)
