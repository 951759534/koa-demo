const { TokenExpiredError } = require("jsonwebtoken");
const { changePassword } = require("../controller/user.controller");

module.exports = {  
    userFormatError: {
        code: '10001',
        message: '用户名或密码不能为空',
        result: ''
    },
    userAlreadyExited: {
        code: '10002',
        message: '用户名已存在',
        result: ''
    },
    userRegisterError: {
        code: '10003',
        message: '用户注册失败',
        result: ''
    },
    userDoesnotExits: {
        code: '10004',
        message: '用户不存在',
        result: ''
    },
    userLoginError: {
        code: '10005',
        message: '用户登录失败',
        result: ''
    },
    invalidPassword: {
        code: '10006',
        message: '密码错误',
        result: ''
    },
    unAuthorization: {
        code: '10007',
        message: '未授权',
        result: ''  
    },
    nullPassword: {
        code: '10008',
        message: '密码不能为空',
        result: ''
    },
    TokenExpiredError: {
        code: '10101',
        message: 'token已过期',
        result: ''  
    },
    JsonWebTokenError: {
        code: '10102',
        message: '无效的token',
        result: ''  
    },  
    changePasswordError: {
        code: '10009',
        message: '修改密码失败',
        result: ''
    }

};  