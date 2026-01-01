const Router = require('@koa/router');
const router = new Router({
    prefix: '/goods'
});
const { auth, hadAdminPermission } = require('../middleware/auth.middleware.js')
const { upload, publishGoods, changeGoods, removeGoods, restoreGoods, findAll } = require('../controller/goods.controller.js');
const { koaBody } = require('koa-body');
const path = require('path');

const { validator, } = require('../middleware/goods.middleware.js');

//商品图片上传
router.post('/upload', 
    // auth,
    // hadAdminPermission, 
    koaBody({
            multipart: true,
            encoding: "gzip",
            formidable: {
                uploadDir: path.join(__dirname, '../../public/uploads'), // 设置文件上传目录
                keepExtensions: true, // 保持文件的后缀名   
            }
    }
    ),
    upload
);

// 发布商品接口



router.put('/:id', auth, hadAdminPermission,
    validator,
    changeGoods,
)  

// router.delete('/:id', auth, hadAdminPermission, removeGoods);


router.post('/', 
    auth,
    hadAdminPermission,
    validator,
    publishGoods,
)


router.post('/:id/off', auth, hadAdminPermission, removeGoods)

router.post('/:id/on', auth, hadAdminPermission, restoreGoods)

router.get('/', findAll)

module.exports = router;