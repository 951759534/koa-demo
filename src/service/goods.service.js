const Goods = require('../model/goods.model');

class GoodsService {
    async createGoods(goods) {
        // 操作数据库，创建商品
        const result = await Goods.create(goods);
        console.log('创建商品', goods);
        // 模拟数据库操作

        return result.dataValues
    }
    async updateGoods(id, goods) {
        const result = await Goods.update(goods, {
            where: {
                id
            }
        });
        return result[0] > 0;
    }
    
    async removeGoods(id) {
        const res = await Goods.destroy({
            where: {
                id,
            }
        })
        return res > 0;
    }
    async restoreGoods(id) {
        const res = await Goods.restore({
            where: {
                id,
            }
        })
        return res > 0;
    }
    async findAllGoods(pageNum, pageSize) {
        const offset = (pageNum - 1) * pageSize;
        const { count, rows } = await Goods.findAndCountAll({
            offset,
            limit: parseInt(pageSize),
        })
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }
}

module.exports = new GoodsService();