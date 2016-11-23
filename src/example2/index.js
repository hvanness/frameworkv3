// import React when using JSX
import React, { Component } from 'react'
// connect components to redux state and actions
import { connect } from 'react-redux'
// set the html <title> from our component
import Helmet from 'react-helmet'
// import any actions passed to connect()
import { click } from './actions'

// Component name (only used for debugging)
class Example2 extends Component {
  // gets rerendered (this is optimized) every time a prop changes
  render() {
    return (
      // access this.props is {click: ..., numberOfClicks: ...}
      <div onClick={this.props.click}>
        <Helmet title="example2"/>
        count is {this.props.count}
      </div>
    )
  }
}

// connect(
//   function from state to props,
//   object containing actions we want to wrap in a dispatch() and pass to our component
// )
// connect is a decorator, so we can pass it our component class
export default connect(
  state => ({
    count: state.numberOfClicks
  }),
  { click }
)(Example2)
