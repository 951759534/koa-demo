const Cart = require('../model/carts.model.js');
const { Op } = require('sequelize');
const Goods = require('../model/goods.model.js');

class CartService {
    async addCart(user_id, goods_id) {
        // const cart = await Cart.create({
        //     user_id,
        //     goods_id
        // });
        const res = await Cart.findOne({
            [Op.and]: {
                user_id,
                goods_id
            }
        })
        if (res) {
            // 已存在
            await Cart.update({
                number: res.number + 1
            }, {
                where: {
                    id: res.id
                }
            })
            return res.reload();
        } else {
            const res = await Cart.create({
                goods_id,
                user_id,
            })
            return res;
        }
        return {

        };
    }
    async findAllCarts(pageNum, pageSize) {
        console.log(pageNum, pageSize);
        const { count, rows } = await Cart.findAndCountAll({
            attributes: ['id', 'selected', 'number'],
            offset: (pageNum - 1) * pageSize,
            limit: parseInt(pageSize),
            include: {
                model: Goods,
                as: 'goods_info',
                attributes: ['id', 'goods_name', 'goods_price', 'goods_img']
            },
        })
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        };
    }
    async upadateCart(params) {
        const { id, number, selected } = params;
        console.log(id, number, selected);
        const res = await Cart.findByPk(id);
        if (!res) {
            return ''
        }
        number !== undefined && (res.number = number);
        if (selected !== undefined) {
            res.selected = selected;
        }
        return await res.save();
    }
    async removeCart(ids) {
        const res = await Cart.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        })
        return res;
    }
    async selectAll(user_id) {
        const res = Cart.update({
            selected: true
        }, {
            where: {
                user_id
            }
        })
        return res;
    }
    async unselectAll(user_id) {
        const res = Cart.update({
            selected: false
        }, {
            where: {
                user_id
            }
        })
        return res;
    }
}

module.exports = new CartService();