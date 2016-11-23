import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import './normalize.css'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  render() {
    return (
      <div>
        <Helmet titleTemplate="SITE | %s" title="HOME"/>
        {this.props.children}
      </div>
    )
  }
}
