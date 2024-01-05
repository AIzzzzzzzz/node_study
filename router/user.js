const express = require('express')
const expressjoi = require('@escook/express-joi')
const {reg_login_schema}=require('../schema/user')
const router = express.Router()
const Handel = require('../router_handel/user')


router.post('/login',expressjoi(reg_login_schema),Handel.login)

router.post('/reguser',expressjoi(reg_login_schema),Handel.regUser)


module.exports = router