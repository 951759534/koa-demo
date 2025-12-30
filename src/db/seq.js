const { Sequelize } = require('sequelize');

const { MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST } = require('../config/config.default.js');

const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    dialect: 'mysql',
    timezone: "+08:00"
});

(() => {
    sequelize.authenticate().then(() => {
        console.log('数据库连接成功');
    }).catch(err => {
        console.log('数据库连接失败', err);
    });   
 })();

module.exports = sequelize;