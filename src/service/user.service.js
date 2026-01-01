
const user = require('../model/user.model.js'); 
class UserService{
    async createUser(user_name, password){
        //操作数据库，创建用户
        console.log('创建用户', user_name, password);
        const res = await user.create({
            user_name,
            password
        });
        console.log('创建用户结果', res);  
        return res;
    }   
    async getUserInfo({id, user_name, password, is_admin}) {
        const whereOpt = {};
        id && Object.assign(whereOpt, { id });
        user_name && Object.assign(whereOpt, { user_name });
        password && Object.assign(whereOpt, { password });
        is_admin !== undefined && Object.assign(whereOpt, { is_admin });       
        const res = await user.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: whereOpt     
        });
        return res ? res.dataValues : null;
    }   
    async updateById({ id, user_name, newPassword }) {
        const whereOpt = { id };
        const newUser = {};
        id && Object.assign(newUser, { id });
        user_name && Object.assign(newUser, { user_name });
        newPassword && Object.assign(newUser, { password: newPassword });
        const res = await user.update(
            { ...newUser },  
            { where: whereOpt }
        );
        return res[0] == 0 ? true : false;
    }
}

module.exports = new UserService();