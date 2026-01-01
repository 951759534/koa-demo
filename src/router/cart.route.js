// 导入koa router
const Router = require('@koa/router');
const { auth } = require('../middleware/auth.middleware');

const { validator } = require('../middleware/cart.middleware.js');

const { addCart, findAll, updateCart, removeCart, selectAll, unselectAll } = require('../controller/cart.controller.js');

//控制器


//实例化router对象
const router = new Router({ prefix: '/carts' })

// 编写路由规则

router.post('/', auth, validator({ goods_id: 'number' }), addCart)


router.get('/', auth, findAll);

router.patch('/:id', auth, validator({
    number: { type: 'number', required: true },
    selected: { type: 'bool', required: true }
}), updateCart)

// 删除购物车
router.delete('/', auth, validator({ ids: 'array' }), removeCart)
// 全选

router.post('/selectAll', auth, selectAll)

// 全不选
router.post('/unselectAll', auth, unselectAll)


//导出router对象

module.exports = router;