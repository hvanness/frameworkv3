import React, {Component} from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { Route } from 'react-router'
import 'normalize.css'
import Example from './example/containers'

export default class App extends Component {
  render() {
    return (
      <div>
        <Helmet titleTemplate="SITE | %s">
          <title>HOME</title>
        </Helmet>

        <Link to="/example">example</Link>
        <Route path="/example" component={Example}/>
      </div>
    )
  }
}
