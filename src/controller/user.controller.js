
const jwt = require('jsonwebtoken');

const { createUser, getUserInfo, updateById } = require('../service/user.service.js');
const { userRegisterError, changePasswordError } = require('../constant/err.type.js');

const { JWT_SECRET } = require('../config/config.default.js');

class UserController {
    async register(ctx, next) {
        //操作数据库
        try {
            const res = await createUser(ctx.request.body.user_name, ctx.request.body.password);

            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name
                }
            };
        } catch (err) {
            console.error('用户注册失败', JSON.stringify(err.errors));
            ctx.app.emit('error', userRegisterError, ctx);
        }   
    }  

    async login(ctx, next) {
        const { user_name, password } = ctx.request.body;
        ctx.body = '欢迎回来，' + user_name;

        // 1. 获取用户信息（在token的payload中记录id、user_name、is_admin字段）
        try{
            const res = await getUserInfo({ user_name });

            // 从返回对象剔除password字段
            const { password, ...resUser } = res;

            ctx.body = {
                code: 0, 
                message: '用户登录成功',
                result: {
                    token: jwt.sign(resUser,    
                        JWT_SECRET,
                        { expiresIn: '1d' }
                    )
                }
            }
        }catch(e){
            console.error('用户登录失败', e);
        }
    }

    async changePassword(ctx, next) {
        ctx.body = '修改密码成功';
        // 1.获取数据
        const id = ctx.state.user.id;
        const { password } = ctx.request.body;
        // 2.操作数据库
        try {
            const res = await updateById({ id, newPassword: password });
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '修改密码成功',
                    result: ''
                }
            } else {
                console.error('修改密码失败', err);
                ctx.app.emit('error', changePasswordError, ctx);
            }
        } catch (err) {
                console.error('修改密码失败', err);
                ctx.app.emit('error', changePasswordError, ctx);
         }
    }
}

module.exports = new UserController(); 