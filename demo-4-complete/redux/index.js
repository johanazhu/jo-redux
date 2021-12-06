export const createStore = (reducer, initState, enhancer) => {

    if (typeof initState === 'function') {
        enhancer = initState;
        initState = undefined
    }

    if (enhancer) {
        return enhancer(createStore)(reducer, initState)
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

    const replaceReducer = (nextReducer) => {
        reducer = nextReducer
        // 刷新一次，广播 reducer 已经替换，也同样把默认值换成新的 reducer
        dispatch({ type: Symbol() })
    }

    dispatch({ type: Symbol() })

    return {
        getState,
        dispatch,
        subscribe,
        replaceReducer
    }
}

export const applyMiddleware = (...middlewares) => {
    return (oldCreateStore) => {
        return (reducer, initState) => {
            const store = oldCreateStore(reducer, initState)
            const chain = middlewares.map(middleware => middleware(store))
            // 获取老 dispatch
            let dispatch = store.dispatch
            // chain.reverse().map(middleware => {
            //     dispatch = middleware(dispatch)
            // })
            compose(chain)

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


const compose = (...funcs) => {
    if (funcs.length === 0) {
        return args => args
    }
    if (funcs.length === 1) {
        return funcs[0]
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

const bindActionCreator = (actionCreator, dispatch) => {
    return function () {
        return dispatch(actionCreator.apply(this, arguments))
    }
}

export const bindActionCreators = (actionCreators, dispatch) => {
    if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch)
    }

    if (typeof actionCreators !== 'object' || actionCreators === null) {
        throw new Error()
    }

    const keys = Object.keys(actionCreators)
    const boundActionCreators = {}
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const actionCreator = actionCreators[key]
        if (typeof actionCreator === 'function') {
            boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
        }
    }
    return boundActionCreators
}
