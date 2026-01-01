const { DataTypes } = require('sequelize')
const seq = require('../db/seq.js');
const Goods = seq.define('sc_goods', {
    goods_img: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品图片'
    },
    goods_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        comment: '商品价格'
    },
    goods_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品库存'
    },
    goods_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品重量'
    }
}, 
{
    paranoid: true,
}); 

// Goods.sync({ force: true });
module.exports = Goods;