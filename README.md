Framework V3
============

A more comprehensible react-redux framework. *not isomorphic :D*

Install
-------

1. Edit package.json:
 * change "name"
 * change "description"

2. Download & install dependencies:
 `npm install`

3. Delete examples:
 - `/src/example/`
 - `/src/example2/`
 - __*/src/routes.js*__: `/* examples */ ... /* end examples */`
 - __*/src/reducer.js*__: `/* examples */ ... /* end examples */`


Develop
-------

1. Start a dev server:
 `npm start`

2. Load in browser:
 `http://localhost:3000`

3. Edit sources in __*/src*__


Production Build
----------------

1. Compile bundle.js (and other assets) to /public/static/:
 `npm run build`

2. Host the public/ directory (eg. drag it into netlify or `surge .`)



About the dependencies
----------------------

**Manage javascript dependencies with `import` and `export`**
```json
    "webpack": "^3.4.1",
    "webpack-dev-server": "^2.6.1",
```

**Write beautiful futuristic javascript**
```json
    "babel-core": "^6.25.0",
    "babel-eslint": "^7.2.3",
    "babel-loader": "^7.1.1",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "babel-register": "^6.24.1",
```

**CSS and image dependencies in javascript code**
```json
    "file-loader": "^1.0.0",
    "url-loader": "^0.5.9",
    "style-loader": "^0.18.2",
    "css-loader": "^0.28.4",
    "postcss-loader": "^2.0.6",
    "extract-text-webpack-plugin": "^3.0.0",
```

**Forget about browser compatibility**
```json
    "autoprefixer": "^7.1.2",
    "normalize.css": "^7.0.0"
```


**Goodbye `XMLHTTPRequest`**
```json
    "isomorphic-fetch": "2.2.1",
```

**Use the Flux paradigm**
```json
    "redux": "^3.7.2",
    "redux-thunk": "^2.2.0",
    "reselect": "^3.0.1",
```

**Write reusable reactive web components**
```json
    "react": "^15.6.1",
    "react-dom": "^15.6.1",
    "react-helmet": "^5.1.3",
    "react-hot-loader": "^3.0.0-beta.7",
    "react-redux": "^5.0.5",
    "react-router": "^4.1.2",
    "react-router-dom": "^4.1.2",
```

**Catch compile time errors**
```json
    "eslint": "^4.3.0",
    "eslint-loader": "^1.9.0",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-react": "^7.1.0",
```

**Write tests**
```json
    "mocha": "^3.4.2",
    "mocha-eslint": "^4.1.0",
```


Tutorials
========

Create a new page at a new url
------------------------------

1. `cd src`
2. `cp -r example example2`

3. Change component name to Example2

 __*/src/example2/index.js*__
 ```javascript
 export default class Example2 extends Component
 ```

4. Give the component a URL and nest it in our App route

 __*/src/routes.js*__
 ```javascript
 ...
 import Example2 from './example2'

 <Route path="/" component={App}>
   ...
   <Route path="/example2" component={Example2}/>
 </Route>
 ```


Manage state with reducers and actions
--------------------------------------

__*/src/example2/actions.js*__

Create a click *action type* and *action creator*.
Action types must be unique strings.
Action creators must return either:
- an action `{type: ACTION_TYPE_CONSTANT, ...}`
- a function that eventually dispatches actions `(dispatch, getState) => {...}`

```javascript
export const CLICK = 'example2/CLICK'
export const click = () => ({ type: CLICK })
```


__*/src/example2/reducer.js*__

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


__*/src/reducer.js*__

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

__*/src/example2/index.js*__

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

__*/src/example2/index.js*__

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
