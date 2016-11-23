import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './app'

/* examples */
import Example from './example'
import Example2 from './example2'

export default function routes () {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Example}/>
      <Route path="/example2" component={Example2}/>
    </Route>
  )
}
/* end examples */

/*
export default function routes () {
  return (
    <Route path="/" component={App}>
    </Route>
  )
}
*/
