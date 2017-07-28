import React, {Component} from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { Route } from 'react-router'
import 'normalize.css'
import Example from '../example'
import Example2 from '../example2'

export default class App extends Component {
  render() {
    return (
      <div>
        <Helmet titleTemplate="SITE | %s">
          <title>HOME</title>
        </Helmet>
        <div>
          <Link to="/example">example</Link>
        </div>
        <div>
          <Link to="/example2">example2</Link>
        </div>
        <Route path="/example" component={Example}/>
        <Route path="/example2" component={Example2}/>
      </div>
    )
  }
}
