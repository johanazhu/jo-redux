

let initState = {
    info: {
        name: 'johan',
        description: '前端之虎'
    }
}

export default (state, action) => {
    if (!state) {
        state = initState
    }
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            }
        case 'SET_DESCRIPTION':
            return {
                ...state,
                description: action.description
            }
        default:
            return state;
    }
}