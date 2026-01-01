const Router = require('@koa/router')
const router = new Router({
    prefix: '/users'
});
const { register, login, changePassword } = require('../controller/user.controller.js');

router.get('/', ctx => {
    ctx.body = 'router'
})

const { userValidate, verifyUser, cryptPassword, verifyLogin, verifyPassword } = require('../middleware/user.middleware.js');    

const { auth } = require('../middleware/auth.middleware.js');

//注册
router.post('/register', userValidate, verifyUser, cryptPassword, register);
//登录
router.post('/login', userValidate, verifyLogin, login);

//修改密码
router.patch('/changePassword', auth, verifyPassword, cryptPassword, changePassword);




module.exports = router;