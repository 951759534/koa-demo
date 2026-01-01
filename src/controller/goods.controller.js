const path = require('path');


const { fileUploadError, unSupportedImage, publishGoodsError, invalidGoodsID } = require('../constant/err.type.js');

const { createGoods, updateGoods, removeGoods,restoreGoods, findAllGoods } = require('../service/goods.service.js');
const { updateById } = require('../service/user.service.js');

class GoodsController {
    async upload(ctx, next) {
        const { file } = ctx.request.files;
        const fileTypes = ['image/jpeg', 'image/png'];
        if(file) {
            if(!fileTypes.includes(file.mimetype)) {
                ctx.app.emit('error',unSupportedImage, ctx);
                return;
            }
            ctx.body = {
                code: 0,
                message: '商品图片上传成功',
                goods_img: path.basename(file.filepath),
            }
        } else {
            ctx.app.emit('error', fileUploadError, ctx);
        }
    }
    async publishGoods(ctx, next) {
        // 调用 service 层发布商品 createGoods 方法
        try{
            const res = await createGoods(ctx.request.body);
            ctx.body = {
                code: 0,
                message: '商品发布成功',
                result: res,
            };
        } catch(err) {
            console.error('商品发布失败', err);
            ctx.app.emit('error', publishGoodsError, ctx);
            return;
        }
    }
    async changeGoods(ctx, next) {
        try {
            const res = await updateGoods(ctx.request.id, ctx.request.body);
            if(res) {
                ctx.body = {
                    code: 0,
                    message: '修改商品成功',
                    result: '', 
                }
            } else {
                console.error('修改商品失败');
            }
        } catch (err) {
            console.error('修改商品失败', err); 
            if(err.message.includes('WHERE parameter "id" has invalid "undefined" value')) {
                ctx.app.emit('error', invalidGoodsID, ctx);
            }
        }   
    }
    async removeGoods(ctx, next) {  
        try { 
            const res = await removeGoods(ctx.params.id)
            if(res) {
                ctx.body = {
                    code: 0,
                    message: '下架商品成功',
                    result: '',
                }
            } else {
                console.error('下架商品失败');
                ctx.app.emit('error', invalidGoodsID, ctx);
            }
        } catch (err) { 
            console.error('下架商品失败 catch', err);
        }
      
    }
    
    async restoreGoods(ctx) {
         try { 
            const res = await restoreGoods(ctx.params.id)
            if(res) {
                ctx.body = {
                    code: 0,
                    message: '上架商品成功',
                    result: '',
                }
            } else {
                console.error('上架商品失败');
                ctx.app.emit('error', invalidGoodsID, ctx);
            }
        } catch (err) { 
            console.error('上架商品失败 catch', err);
        }
    }
    async findAll(ctx) {
        const res = await findAllGoods(ctx.query.pageNum || 1, ctx.query.pageSize || 10)
        ctx.body = {
            code: 0,
            message: '获取商品列表成功',
            result: res,
        }
    }
}

module.exports = new GoodsController();