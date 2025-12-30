const Koa = require('koa')
const static = require('koa-static')
const path = require('path')
const mount = require('koa-mount')
const userRouter = require('../router/user.route.js')
const { koaBody } = require('koa-body');

const app = new Koa();


const errHandler = require('./errHandler.js');

app.use(koaBody())
app.use(userRouter.routes()).use(userRouter.allowedMethods())

app.use(mount('/public', static(path.join(__dirname, './public'))))


app.on('error', errHandler) 



module.exports = app;
