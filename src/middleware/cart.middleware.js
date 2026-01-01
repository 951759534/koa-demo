
const { cartFormattError } = require('../constant/err.type')


const validator = (rules) => {
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules)
        } catch (error) {
            console.error(error);
            ctx.app.emit('error', cartFormattError, ctx)
        }
        await next();
    }
}

module.exports = { validator }