module.exports = () => {
    return async function handlerError(ctx, next) {
        await next()
        const error = /^4.+/.test(ctx.status)? '资源不存在': '服务器内部错误'
        if(/^4.+|^5.+/.test(ctx.status)) {
            if(ctx.acceptJSON) {
                ctx.body = {
                    code: ctx.status,
                    error
                }
            } else {
                ctx.body = `<h1>${error}</h1>`
            }
        }
        
    }
}