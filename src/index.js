import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { applyRouterMiddleware, Router, browserHistory } from 'react-router'
import useScroll from 'react-router-scroll/lib/useScroll';

import routes from './routes'
import createStore from './redux/create'

import './res/css/normalize.css'
import './res/css/skeleton.css'

let store = createStore()

render (
    <Provider store={store}>
      <Router
        routes={routes(store)}
        history={browserHistory}
        render={applyRouterMiddleware(useScroll())}
      />
    </Provider>,
    document.getElementById('app')
)
