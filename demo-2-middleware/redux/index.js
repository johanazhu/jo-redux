export const createStore = (reducer, initState, enhancer) => {

    if (enhancer) {
        const newCreateStore = enhancer(createStore)
        return newCreateStore(reducer, initState)
    }

    let state = initState;
    let listeners = [];

    const subscribe = (fn) => {
        listeners.push(fn)
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach(fn => fn())
    }

    const getState = () => {
        return state
    }

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
            const chain = middlewares.map(middleware => middleware(store))
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

