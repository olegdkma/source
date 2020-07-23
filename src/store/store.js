import {combineReducers, createStore} from 'redux'
import gameRed from "../map/gameReducer";

const reducers = combineReducers({
    game: gameRed
})


const store = createStore(reducers)

window.store = store
export default store