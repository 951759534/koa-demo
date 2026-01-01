
const { addCart, findAllCarts, upadateCart, removeCart, selectAll, unselectAll } = require('../service/cart.service.js');

const { cartFormattError, cartUpdateError } = require('../constant/err.type.js');

class CartController {
    async addCart(ctx, next) {
        const { id: user_id } = ctx.state.user;
        const { goods_id } = ctx.request.body;
        const res = await addCart(user_id, goods_id);
        ctx.body = {
            code: 200,
            message: '添加购物车成功',
            result: res
        }
    }
    async findAll(ctx) {
        try {
            const { pageSize = 10, pageNum = 1 } = ctx.request.query;
            const res = await findAllCarts(pageNum, pageSize);
            ctx.body = {
                code: 0,
                message: '获取购物车列表成功',
                result: res
            }
        } catch (error) {
            console.log(error);
            ctx.body = {
                code: 500,
                message: '获取购物车列表失败',
                result: ''
            }
        }
    }
    async updateCart(ctx) {
        const { id } = ctx.request.params;
        const { number, selected } = ctx.request.body;
        if (number === undefined && selected === undefined) {
            cartFormattError.message('number 和 selected 参数不能同时为空')
            ctx.app.emit('error', cartFormattError, ctx)
            return
        }
        try {
            const res = await upadateCart({ id, number, selected })
            ctx.body = {
                code: 0,
                message: '更新购物车成功',
                result: res
            }
        } catch (error) {
            console.error(error);
            ctx.app.emit('error', cartUpdateError, ctx);
        }
    }
    async removeCart(ctx) {
        const { ids } = ctx.request.body;

        const res = await removeCart(ids);

        ctx.body = {
            code: 0,
            message: '删除购物车成功',
            result: res
        }
    }
    async selectAll(ctx) {
        const user_id = ctx.state.user.id;
        try {
            const res = await selectAll(user_id);
            ctx.body = {
                code: 0,
                message: '全选成功',
                result: res
            }
        } catch (error) {

        }
    }
    async unselectAll(ctx) {
        const user_id = ctx.state.user.id;
        try {
            const res = await unselectAll(user_id);
            ctx.body = {
                code: 0,
                message: '全不选成功',
                result: res
            }
        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = new CartController()