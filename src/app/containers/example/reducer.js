import { CLICK } from './actions'
export default (state = 0, action) => action.type == CLICK ? state + 1 : state
