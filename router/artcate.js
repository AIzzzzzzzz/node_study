const express = require('express')
const handel = require('../router_handel/artcate')
const router = express.Router()
const expressjoi = require('@escook/express-joi')
const {add_cate_schema,deletecate,getcate,updatecate} = require('../schema/artcate')

router.get('/cates', handel.getartcate)

router.post('/addcates',expressjoi(add_cate_schema),handel.addarcate)

router.get('/deletecate/:id', expressjoi(deletecate), handel.deleteCateById)
//获取文章接口
router.get('/catess/:id', expressjoi(getcate), handel.cates)

//文章更新接口
router.post('/updatecate',expressjoi(updatecate),handel.sqlupdate)
module.exports = router