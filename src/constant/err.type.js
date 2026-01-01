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
    changePasswordError: {
        code: '10009',
        message: '修改密码失败',
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
    hasNotAdminPermission: {
        code: '10103',
        message: '该用户无管理员权限',
        result: ''
    },
    fileUploadError: {
        code: '10201',
        message: '图片上传失败',
        result: ''
    },
    unSupportedImage: {
        code: '10202',
        message: '不支持的图片格式',
        result: ''
    },
    goodsFormatError: {
        code: '10203',
        message: '商品参数格式错误',
        result: ''
    },
    publishGoodsError: {
        code: '10204',
        message: '商品发布失败',
        result: ''
    },
    invalidGoodsID: {
        code: '10205',
        message: '无效的商品ID',
        result: ''
    },
    cartFormattError: {
        code: '10301',
        message: '购物车参数格式错误',
        result: ''
    },
    cartUpdateError: {
        code: '10302',
        message: '购物车更新失败',
        result: ''
    },
};  