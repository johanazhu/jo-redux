export const createStore = (reducer, initState) => {
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
