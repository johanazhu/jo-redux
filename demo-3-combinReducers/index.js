import { createStore, applyMiddleware, combinReducers } from './redux/index.js';
import { loggerMiddleware, exceptionMiddleware, timeMiddleware } from './middleware.js';
import { counterReducer, infoReducer } from './reducer/index.js';


const reducer = combinReducers({
    counter: counterReducer,
    info: infoReducer,
})

// const store = createStore(reducer, initState, applyMiddleware(loggerMiddleware, exceptionMiddleware, timeMiddleware))

// store.subscribe(() => {
//     // let state = store.getState();
//     // console.log('state', state)
// })
const store = createStore(reducer);
console.dir(store.getState());
// store.dispatch({
//     type: 'INCREMENT'
// })

// store.dispatch({
//     type: 'SET_NAME',
//     name: 'JOJOBO'
// });