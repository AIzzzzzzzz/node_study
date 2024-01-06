const express = require('express')
const cors = require('cors')
let { expressjwt: expressjwt } = require('express-jwt')
const config = require('./config')
const userinfoRouter = require('./router/userinfo')
const app = express()
//封装res.cc
app.use((req,res,next)=>{
    res.cc = function(err,status=1){
        res.send({
            status,
            message:err instanceof Error?err.message:err
        })
    }
    next()
})
app.use( expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({path:[/^\/api\//]})),
app.use(cors())
app.use(express.urlencoded({extended:false}))
const router = require('./router/user')
const Joi = require('joi')

app.use('/api',router)
app.use('/my', userinfoRouter)
const artcate = require('./router/artcate')
app.use('/my/artcate',artcate)
//错误级别中间
app.use((err,req,res,next)=>{
    if(err instanceof Joi.ValidationError)res.cc(err.message)
    if(err.name ==='UnauthorizedReeor') return res.cc('身份认证失败')
    res.cc(err.message)
})


app.listen(80,()=>{
    console.log('http://127.0.0.1');
})

