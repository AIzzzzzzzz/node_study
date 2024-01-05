//校验规则
const joi = require('joi')
// .alphanum()必须是字母和数字 .min(3).max(12)最小长度，最大长度，
//.required() 必填项
const username = joi.string().alphanum().min(3).max(12).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

//定义验证注册和登录表单数据的规则对象

exports.reg_login_schema = {
    body:{
        username,
        password
    }
}



