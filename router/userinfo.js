const express = require('express')
const UserInfo = require('../router_handel/getuser')
const router = express.Router()

router.get('/userinfo',UserInfo.getUserInfo)



module.exports = router

