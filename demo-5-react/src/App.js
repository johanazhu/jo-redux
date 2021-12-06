import React, { useEffect, useState } from 'react';
import { createStore } from './redux';
import './App.css';

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

const store = createStore(reducer, initState)

console.log('store', store.getState())

function App() {

    const [count, setCount] = useState(store.getState().count)

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setCount(store.getState().count)
        })
        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }
    }, [])

    const onHandle = () => {
        store.dispatch({
            type: 'INCREMENT'
        })
        console.log('store', store.getState().count)
    }
    return (
        <div className="App">
            <div>{count}</div>
            <button onClick={onHandle}>add</button>
        </div>
    );
}

export default App;
