const express = require('express')
const UserInfo = require('../router_handel/getuser')
const router = express.Router()

router.get('/userinfo',UserInfo.getUserInfo)

router.post('/update/avtar',UserInfo.updateAvatar)


module.exports = router

