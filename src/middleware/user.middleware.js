const bcrypt = require('bcryptjs');

const { getUserInfo } = require("../service/user.service");
const { userFormatError, userAlreadyExited, userRegisterError, userDoesnotExits, userLoginError, invalidPassword, nullPassword  } = require("../constant/err.type");


const userValidate = async (ctx, next) => {
    const { user_name, password } = ctx.request.body;                  
    if (!user_name || !password) {
        console.error('用户名或密码为空', ctx.request.body);
        ctx.app.emit('error', userFormatError, ctx);
        return;
    }   
    await next();
}   

const verifyUser = async (ctx, next) => {
    //验证用户是否存在
    try {
        const res = await getUserInfo({ user_name: ctx.request.body.user_name });
        if(res){
            console.error('用户名已存在', ctx.request.body.user_name);
            ctx.app.emit('error', userAlreadyExited, ctx);     
            return; 
        }   
    } catch (err) {
        console.error('获取用户信息错误', err);
        ctx.app.emit('error', userRegisterError, ctx);
        return;
    }   
    await next();
}   

const cryptPassword = async (ctx, next) => {
    const { password } = ctx.request.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hash;
    await next();
}


const verifyLogin = async (ctx, next) => {  
    const { user_name, password } = ctx.request.body;
    try {

        // 判断用户是否存在
        const res = await getUserInfo({ user_name });
        if(!res){
            console.error('用户名不存在', { user_name });
            ctx.app.emit('error', userDoesnotExits, ctx);
            return;
        }
        // 密码是否匹配
        const isMatch = bcrypt.compareSync(password, res.password);
        if (!isMatch) {
            console.error('密码不匹配', { user_name });
            ctx.app.emit('error', invalidPassword, ctx);
            return;
        }
    } catch(err) {
        console.error('获取用户信息错误', err);
        ctx.app.emit('error', userLoginError, ctx);
        return;
    }
    await next();
};

const verifyPassword = async (ctx, next) => {
    const { password } = ctx.request.body;
    if(!password){
        console.error('修改密码时，密码为空', ctx.request.body);
        ctx.app.emit('error', nullPassword, ctx);
        return;
    }
    const id = ctx.state.user.id;
    await next();   
}


module.exports = {
    userValidate,
    verifyUser,
    cryptPassword,
    verifyLogin,
    verifyPassword,
};      