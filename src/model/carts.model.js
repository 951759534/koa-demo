const { DataTypes } = require('sequelize')
const seq = require('../db/seq.js');
const Goods = require('./goods.model.js')

const Carts = seq.define('sc_carts', {
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品id'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: '商品数量'
    },
    selected: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: '是否选中'
    }
},
    {
        paranoid: true,
    });




Carts.belongsTo(Goods, {
    foreignKey: 'goods_id',
    as: 'goods_info'
});

// Carts.sync({ force: true });

module.exports = Carts;