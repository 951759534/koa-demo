const jwt = require('jsonwebtoken');
const { unAuthorization, TokenExpiredError, JsonWebTokenError, hasNotAdminPermission } = require('../constant/err.type.js');
const { JWT_SECRET } = require('../config/config.default.js');

const auth = async (ctx, next) => {
    const { authorization } = ctx.request.header;
    if (!authorization) {
        console.error('请求头中无token信息', ctx.request.header);
        ctx.app.emit('error', unAuthorization, ctx);
        return;
    }
    const token = authorization.replace('Bearer ', '');
    try {
        const user = jwt.verify(token, JWT_SECRET);
        ctx.state.user = user;
    } catch (err) {
        console.log(err)    
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token已过期', err);
                ctx.app.emit('error', TokenExpiredError, ctx);
                return;
            case 'JsonWebTokenError':
                console.error('无效的token', err);
                ctx.app.emit('error', JsonWebTokenError, ctx);
                return;
        }
        return;
    }
    await next();
}

const hadAdminPermission = async (ctx, next) => {
    const { is_admin } = ctx.state.user;    
    if (!is_admin) {
        console.error('该用户无管理员权限', ctx.state.user);
        ctx.app.emit('error', hasNotAdminPermission, ctx);
        return;
    }   
    await next();
}

module.exports = { 
    auth,
    hadAdminPermission,
}