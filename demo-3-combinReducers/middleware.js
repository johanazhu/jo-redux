

// 记录日志
export const loggerMiddleware = (store) => (next) => (action) => {
    console.log('this.state', store.getState())
    console.log('action', action)
    next(action)
    console.log('next state', store.getState())
}

// 记录异常
export const exceptionMiddleware = (store) => (next) => (action) => {
    try {
        next(action)
    } catch (error) {
        console.log('错误报告', error)
    }
}

// 时间戳
export const timeMiddleware = (store) => (next) => (action) => {
    console.log('time', new Date().getTime())
    next(action)
}
