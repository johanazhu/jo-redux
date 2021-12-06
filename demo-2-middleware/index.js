import { createStore, applyMiddleware } from './redux/index.js';
import { loggerMiddleware, exceptionMiddleware, timeMiddleware } from './middleware.js';

const initState = {
    count: 0
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1
            }
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1
            }
        default:
            return state
    }
}

const store = createStore(reducer, initState, applyMiddleware(loggerMiddleware, exceptionMiddleware, timeMiddleware))

store.subscribe(() => {
    let state = store.getState();
    console.log('state', state)
})

store.dispatch({
    type: 'INCREMENT'
})