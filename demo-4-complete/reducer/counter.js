let initState = {
    counter: {
        count: 0
    }
}

export default (state, action) => {
    if (!state) {
        state = initState
    }
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1
            }
        case 'DECREMENT': {
            return {
                count: state.count - 1
            }
        }
        default:
            return state;
    }
}