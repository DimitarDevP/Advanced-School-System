import { createStore, applyMiddleware } from 'redux'
import rootReducer from "./reducers/index"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'


// wrap ovie vo try/catch vo slucaj da koristat nekoj legacy browser sho ne poddrzva localstorage __reminder__ start 0
const saveStoreToLS = state => {
    const stringified = JSON.stringify(state)
    localStorage.setItem("state", stringified)
}

const loadStoreFromLS = () => {
    const stringified = localStorage.getItem("state")
    if (stringified == null) return undefined
    else return JSON.parse(stringified)
}
// wrap ovie vo try/catch vo slucaj da koristat nekoj legacy browser sho ne poddrzva localstorage __reminder__ end 0

const store = createStore(
    rootReducer,
    loadStoreFromLS(),
    composeWithDevTools(applyMiddleware(thunk))
)

store.subscribe(() => saveStoreToLS(store.getState()))

export default store