import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import reducer from './modules/reducer'
import thunkMiddleware from 'redux-thunk'

export default function createStore () {
    const store = _createStore(reducer, compose(
        applyMiddleware(thunkMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ))

    return store
}
