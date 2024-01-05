const db = require('../db/index')




exports.getUserInfo = (req,res)=>{
    const sql = 'select id,username,nickname,email,user_pic from ev_users where id=?'
    console.log(req);
    db.query(sql,req.auth.id,(err,result)=>{
        if(err) return res.cc(err)
        if(result.length!==1) return res.cc('失败用户信息')
        res.send({
            status:'1',
            message:'获取用户信息成功',
            date:result[0]
        })
    })
}