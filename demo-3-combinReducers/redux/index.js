export const createStore = (reducer, initState, enhancer) => {

    if (enhancer) {
        return enhancer(createStore)(reducer, initState)
    }

    let state = initState;
    let listeners = [];

    const subscribe = (fn) => {
        listeners.push(fn)
        // 退订
        return () => {
            const index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach(fn => fn())
    }

    const getState = () => {
        return state
    }

    dispatch({ type: Symbol() })

    return {
        getState,
        dispatch,
        subscribe
    }
}

export const applyMiddleware = (...middlewares) => {
    return (oldCreateStore) => {
        return (reducer, initState) => {
            const store = oldCreateStore(reducer, initState)
            // const chain = middlewares.map(middleware => middleware(store))
            const simpleStore = { getState: store.getState }
            const chain = middlewares.map(middleware => middleware(simpleStore))
            // 获取老 dispatch
            let dispatch = store.dispatch
            chain.reverse().map(middleware => {
                dispatch = middleware(dispatch)
            })

            store.dispatch = dispatch
            return store
        }
    }
}

/**
 * Example
 * const reducer = combinReducers({
 *   counter: counterReducer,
 *   info: infoReducer
 * })
 */
export const combinReducers = (reducers) => {
    const reducerKey = Object.keys(reducers)

    return (state = {}, action) => {
        const nextState = {}
        for (let i = 0; i < reducerKey.length; i++) {
            const key = reducerKey[i]
            const reducer = reducers[key]
            const previousStateForKey = state[key]
            const nextStateForKey = reducer(previousStateForKey, action)
            nextState[key] = nextStateForKey
        }
        return nextState
    }
}

