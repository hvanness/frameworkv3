// import React when using JSX
import React, { Component } from 'react'

// connect components to redux state and actions
import { connect } from 'react-redux'

// set the html <title> from our component
import Helmet from 'react-helmet'

// import any actions passed to connect()
import { click } from './actions'

// Component name used for debugging
class Example extends Component {
  render() {
    // gets rerendered (this is optimized) every time a prop changes
    // this.props has the shape {click: ..., numberOfClicks: ...}
    return (
      <div onClick={this.props.click}>
        <Helmet title="example"/>
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
)(Example)
