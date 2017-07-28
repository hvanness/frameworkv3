import React, {Component} from 'react'
import Helmet from 'react-helmet'

export default class Example extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>example</title>
        </Helmet>
        <h1>example</h1>
        <code>
          Hello, World.
        </code>
      </div>
    )
  }
}
