Install
=======

1. Edit package.json:
 - change "name"
 - change "description"

2. Download & install dependencies:
 `npm install`

3.
Delete examples:
 - `/src/example/`
 - `/src/example2/`
 - */src/routes.js:* /* examples */ ... /* end examples */
 - */src/reducer.js:* /* examples */ ... /* end examples */

Develop
=======

1. Start a dev server:
 `npm start`

2. Load in browser:
 `http://localhost:3000`

3. Edit sources in /src


Production Build
================

1. Compile bundle.js (and other assets) to /public/static/:
 `npm run build`

2. Host the public/ directory
 - drag it into netlify
 or
 - surge .



About the dependencies
======================

Manage javascript dependencies with `import` and `export`
--------------------------------------------
    "webpack": "^1.13.3",
    "webpack-dev-server": "^1.16.2",

Write beautiful futuristic javascript
-------------------------------------
    "babel-core": "^6.18.2",
    "babel-eslint": "^7.1.1",
    "babel-loader": "^6.2.8",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-react": "^6.16.0",
    "babel-preset-stage-0": "^6.16.0",

CSS and image dependencies in javascript code
---------------------------------------------
    "file-loader": "^0.9.0",
    "url-loader": "^0.5.7",
    "style-loader": "^0.13.1",
    "css-loader": "^0.26.0",
    "postcss-loader": "^1.1.1",
    "extract-text-webpack-plugin": "^1.0.1",

Forget about browser compatibility
----------------------------------
    "autoprefixer": "^6.5.3",

Goodbye `XMLHTTPRequest`
------------------------
    "isomorphic-fetch": "^2.2.1",

Use the Flux paradigm
---------------------
    "redux": "^3.6.0",
    "redux-thunk": "^2.1.0",
    "reselect": "^2.5.4",

Write reusable reactive web components
--------------------------------------
    "react": "^15.3.1",
    "react-redux": "^4.4.6",
    "react-dom": "^15.3.1",
    "react-helmet": "^3.2.2",
    "react-router": "^3.0.0",
    "react-hot-loader": "^1.3.0",

Catch compile time errors
-------------------------
    "eslint": "^3.10.2",
    "eslint-loader": "^1.6.1",
    "eslint-plugin-import": "^2.2.0",
    "eslint-plugin-react": "^6.7.1"


Tutorials
========

Create a new page at a new url
------------------------------
1. `cd src` `cp -r example example2`
2. `vim example2/index.js`

Change component name to Example2:

```javascript
export default class Example2 extends Component
```


3. `vim routes.js`

Give the component a URL and nest it in our App route

```javascript
<Route path="/" component={App}>
  ...
  <Route path="/example2" component={Example2}/>
</Route>
```


Make sure the component is imported

```javascript
import Example2 from './example2'
```

Test the component
`npm start`
http://localhost/example2


Manage state with reducers and actions
--------------------------------------

*/src/example2/actions.js*

Create a click *action type* and *action creator*.
Action types must be unique strings.
Action creators must return either:
 - an action `{type: ACTION_TYPE_CONSTANT, ...}`
 - a function that eventually dispatches actions `(dispatch, getState) => {...}`

```javascript
export const CLICK = 'example2/CLICK'
export const click = () => ({ type: CLICK })
```


*/src/example2/reducer.js*

Create a state reducer that:
 - is initially 0
 - increments on CLICK actions and
 - stays constant for all other actions

```javascript
import { CLICK } from './actions'
export default (state = 0, action) => (
  action.type == CLICK
    ? state + 1
    : state
)
```


*/src/reducer.js*

Add our reducer to the global reducer. Reducers can be composed to form a single state tree.

```javascript
import { combineReducers } from 'redux'
import numberOfClicks from './example2/reducer'

export default combineReducers({numberOfClicks})
```



Use the global state in your component
--------------------------------------

Assume the global state is like:
  `{numberOfClicks: 0}`
and you want it in your component as:
  `this.props.count`

*/src/example2/index.js*

```javascript
import { connect } from 'react-redux'
```

```javascript
class Example2 extends Component {...}
export default connect(
  state => ({
    count: state.numberOfClicks
  })
)(Example2)
```


Change the global state from your component
-------------------------------------------

*/src/example2/index.js*

Connect the component to the action

```javascript
import { click } from './actions'

...

export default connect(
  mapStateToProps,
  { click }
)(Example2)
```

Tie our component's onClick handler to our click action

```javascript
<div onClick={this.props.click}>
```
