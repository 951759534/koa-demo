const Koa = require('koa')
const static = require('koa-static')
const path = require('path')
const mount = require('koa-mount')
const { koaBody } = require('koa-body');
const parameter = require('koa-parameter');


const app = new Koa();


const errHandler = require('./errHandler.js');


app.use(koaBody({
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
}))

app.use(mount('/public', static(path.join(__dirname, '../../public'))))

app.use(parameter(app));

const router = require('../router/index.js')

app.use(router.routes()).use(router.allowedMethods())




app.on('error', errHandler)



module.exports = app;
