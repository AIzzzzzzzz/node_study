
    const db = require('../db/index')
    const bcrypt = require('bcryptjs')
    const config = require('../config')
    const {reg_login_schema} = require('../schema/user')
    const select = "select * from users where username=?"
   /*  const insert = "insert into ev_users (username,password) values(?,?)" */
    const insert = "insert into users set ?"
    //导入token包
    const jwt = require('jsonwebtoken')
    exports.regUser=(req,res)=>{
       
        let userinfo = req.body
        /* if(!userinfo.username||!userinfo.password){
            return res.cc("不合法",1)
        } */

        //判断用户名
        db.query(select,userinfo.username,(err,result)=>{
            if(err){
                return res.cc(err)
                /* console.log(err.message+'错误');
                return err.message */
            }
            else if(result.length>0){
                return res.cc('用户重复')
                /* return res.send({
                    status:1,
                    message:'用户重复'
                }) */
            }
            //调用 hashSync 加密
            console.log(userinfo);
            userinfo.password = bcrypt.hashSync(userinfo.password,10)
            console.log(userinfo);
            //插入数据库
            db.query(insert,{username:userinfo.username,password:userinfo.password},(err,result)=>{
                    if(err){
                        return res.cc(err)
                    }
                    if(result.affectedRows!==1){
                       
                        return res.cc('插入失败')
                    }
                    else{
                        res.cc('插入成功',0)
                    }
                })
            
        })
       /*  res.send('ok')
        db.query('select 1',(err,result)=>{
            if(err){
                console.log(err.message);
            }else{
                res.send('sda')
                console.log(123);
            }
        }) */
        
    }

    exports.login=(req,res)=>{
        const userinfo = req.body
        const sql = "select * from users where username=?"
        db.query(sql,userinfo.username,(err,result)=>{
            console.log(result);
            if(err) return res.cc(err)
            if(result.length!==1)return res.cc('登录失败')
           
            //判断密码是否一样
            const pas = bcrypt.compareSync(userinfo.password,result[0].password)

            if(pas){
                res.cc('失败')
                
            }
            /* res.cc('成功',0) */
            //生成token
            const user = {...result[0],password:'',user_pic:''}
            const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:'10h'})
            res.send({
                status:0,
                massage:'登陆成功',
                token:'Bearer'+tokenStr
            })
            
            
        })
        
    }
    



